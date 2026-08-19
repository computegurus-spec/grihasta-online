import { StorageEngine } from './storage';
import { getLaneForVillaNumber } from '../utils/laneMapping';
import { supabase } from './supabaseClient';
import type { UserRole } from '../types';

export interface PendingUserApproval {
  id: string;
  name: string;
  mobile: string;
  laneNumber: string;
  villaNumber: string;
  requestedRole: UserRole;
  occupancyType: 'Owner' | 'Tenant';
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const PENDING_APPROVALS_KEY = 'grihasta_pending_user_approvals_v1';

export const DbConnector = {
  /**
   * Check if user is eligible to register or log in with strict role enforcement.
   * - Tenants can only log in as RESIDENT_TENANT
   * - Owners can log in as RESIDENT_OWNER
   * - MC roles (MC_ADMIN / MC_MEMBER) MUST be manually approved by existing MC Super Admin
   */
  verifyAndAuthenticateResident: (
    villaNumber: string,
    mobile: string,
    requestedRole: UserRole
  ): { success: boolean; roleAssigned: UserRole; message: string } => {
    // 1. Strict Rule: MC Admin and MC Member roles CANNOT be self-assigned
    if (requestedRole === 'MC_ADMIN' || requestedRole === 'MC_MEMBER') {
      const approvedMCUsers = JSON.parse(localStorage.getItem('grihasta_approved_mc_users') || '[]');
      const isApproved = approvedMCUsers.some((u: any) => u.mobile === mobile || u.villaNumber === villaNumber);

      if (!isApproved && mobile !== '9900015844') { // Default MC Super Admin
        return {
          success: false,
          roleAssigned: 'RESIDENT_OWNER',
          message: '⛔ Security Restriction: MC Member privileges cannot be self-assigned. Your request has been sent to MC Super Admin for manual approval.'
        };
      }
      return {
        success: true,
        roleAssigned: requestedRole,
        message: '✅ Authenticated as verified Management Committee Member.'
      };
    }

    // 2. Check Villa Directory record
    const flats = StorageEngine.getFlats();
    const cleanPlotStr = villaNumber.replace(/[^0-9]/g, '');
    const flatRecord = flats.find(f => f.flatNumber === villaNumber || f.flatNumber.includes(cleanPlotStr));

    if (!flatRecord) {
      return {
        success: false,
        roleAssigned: 'RESIDENT_OWNER',
        message: `⚠️ Villa #${villaNumber} was not found in the 400-Villa Master Directory. Please contact MC Office.`
      };
    }

    // 3. Strict Owner vs Tenant Role Enforcement
    if (flatRecord.occupancyType === 'Rented' && requestedRole === 'RESIDENT_OWNER') {
      return {
        success: false,
        roleAssigned: 'RESIDENT_TENANT',
        message: `ℹ️ Villa #${villaNumber} is registered as Tenant occupied. Authenticating you under Tenant Resident Portal.`
      };
    }

    if (flatRecord.occupancyType === 'Owner Occupied' && requestedRole === 'RESIDENT_TENANT') {
      return {
        success: false,
        roleAssigned: 'RESIDENT_OWNER',
        message: `ℹ️ Villa #${villaNumber} is registered as Owner occupied. Authenticating you under Owner Resident Portal.`
      };
    }

    return {
      success: true,
      roleAssigned: flatRecord.occupancyType === 'Rented' ? 'RESIDENT_TENANT' : 'RESIDENT_OWNER',
      message: `✅ Authenticated cleanly as ${flatRecord.occupancyType} for Villa #${flatRecord.flatNumber}.`
    };
  },

  /**
   * Pending MC User Approval Queue
   */
  getPendingApprovals: (): PendingUserApproval[] => {
    try {
      const data = localStorage.getItem(PENDING_APPROVALS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  /**
   * Completely purges all existing registration requests and approved MC lists
   */
  clearAllRegistrations: () => {
    try {
      localStorage.removeItem(PENDING_APPROVALS_KEY);
      localStorage.removeItem('grihasta_approved_mc_users');
      console.log('All existing registrations purged.');
    } catch (e) {
      console.error('Failed to purge registrations', e);
    }
  },

  submitMcApprovalRequest: (req: {
    name: string;
    mobile: string;
    laneNumber?: string;
    villaNumber: string;
    occupancyType: 'Owner' | 'Tenant';
    requestedRole: UserRole;
  }) => {
    const list = DbConnector.getPendingApprovals();
    const laneNumber = req.laneNumber || getLaneForVillaNumber(req.villaNumber);

    const newItem: PendingUserApproval = {
      id: `appr-${Date.now()}`,
      name: req.name,
      mobile: req.mobile,
      laneNumber,
      villaNumber: req.villaNumber,
      occupancyType: req.occupancyType,
      requestedRole: req.requestedRole,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    list.unshift(newItem);
    localStorage.setItem(PENDING_APPROVALS_KEY, JSON.stringify(list));

    // Async sync to Supabase database
    (async () => {
      try {
        const { error } = await supabase
          .from('access_requests')
          .insert({
            id: newItem.id,
            name: newItem.name,
            mobile: newItem.mobile,
            lane_number: newItem.laneNumber,
            villa_number: newItem.villaNumber,
            occupancy_type: newItem.occupancyType,
            requested_role: newItem.requestedRole,
            status: newItem.status,
            submitted_at: newItem.submittedAt
          });
        if (error) {
          console.warn('Supabase cloud insert notice (table access_requests may need schema init):', error.message);
        } else {
          console.log('Successfully synced registration request to Supabase cloud!');
        }
      } catch (err: any) {
        console.warn('Supabase sync catch:', err);
      }
    })();

    return newItem;
  },

  approveMcUser: (approvalId: string) => {
    const list = DbConnector.getPendingApprovals();
    const item = list.find(a => a.id === approvalId);
    if (item) {
      item.status = 'Approved';
      localStorage.setItem(PENDING_APPROVALS_KEY, JSON.stringify(list));

      // Add to approved MC registry
      const approved = JSON.parse(localStorage.getItem('grihasta_approved_mc_users') || '[]');
      approved.push({ mobile: item.mobile, villaNumber: item.villaNumber, laneNumber: item.laneNumber, role: item.requestedRole });
      localStorage.setItem('grihasta_approved_mc_users', JSON.stringify(approved));

      // Synchronize with Villa Master Directory
      const flats = StorageEngine.getFlats();
      const cleanNum = item.villaNumber.replace(/[^0-9]/g, '');
      const existing = flats.find(f => f.flatNumber === item.villaNumber || f.flatNumber.includes(cleanNum));

      const laneName = item.laneNumber || getLaneForVillaNumber(item.villaNumber);

      if (existing) {
        existing.block = laneName;
        if (item.occupancyType === 'Owner') {
          existing.ownerName = item.name;
          existing.ownerPhone = item.mobile;
          existing.occupancyType = 'Owner Occupied';
        } else {
          existing.tenantName = item.name;
          existing.tenantPhone = item.mobile;
          existing.occupancyType = 'Rented';
        }
      } else {
        flats.push({
          id: `f-${Date.now()}`,
          block: laneName,
          floor: 1,
          sqft: 1446,
          flatNumber: item.villaNumber.startsWith('Plot') || item.villaNumber.startsWith('Villa') ? item.villaNumber : `Plot ${item.villaNumber}`,
          ownerName: item.occupancyType === 'Owner' ? item.name : 'Registered Owner',
          ownerPhone: item.occupancyType === 'Owner' ? item.mobile : '+91 99000 15844',
          ownerEmail: 'resident@grihasta.online',
          tenantName: item.occupancyType === 'Tenant' ? item.name : undefined,
          tenantPhone: item.occupancyType === 'Tenant' ? item.mobile : undefined,
          occupancyType: item.occupancyType === 'Owner' ? 'Owner Occupied' : 'Rented',
          quarterlyDuesRate: 9000,
          registeredHelpCount: 0,
          adultsCount: 2,
          kidsCount: 0
        });
      }
      StorageEngine.saveFlats(flats);

      // Async update Supabase status
      (async () => {
        try {
          await supabase
            .from('access_requests')
            .update({ status: 'Approved' })
            .eq('id', approvalId);
        } catch (e) {}
      })();
    }
  },

  rejectMcUser: (approvalId: string) => {
    const list = DbConnector.getPendingApprovals();
    const item = list.find(a => a.id === approvalId);
    if (item) {
      item.status = 'Rejected';
      localStorage.setItem(PENDING_APPROVALS_KEY, JSON.stringify(list));

      // Async update Supabase status
      (async () => {
        try {
          await supabase
            .from('access_requests')
            .update({ status: 'Rejected' })
            .eq('id', approvalId);
        } catch (e) {}
      })();
    }
  }
};

