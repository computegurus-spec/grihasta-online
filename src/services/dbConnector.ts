import { StorageEngine } from './storage';
import { getLaneForVillaNumber } from '../utils/laneMapping';
import { supabase } from './supabaseClient';
import type { UserRole } from '../types';

export interface PendingUserApproval {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  password?: string;
  laneNumber: string;
  villaNumber: string;
  requestedRole: UserRole;
  occupancyType: 'Owner' | 'Tenant';
  requestType: 'Registration' | 'PasswordReset';
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const PENDING_APPROVALS_KEY = 'grihasta_pending_user_approvals_v1';
const USER_PASSWORDS_KEY = 'grihasta_user_passwords_v1';

export const DbConnector = {
  /**
   * Store or update user password
   */
  setUserPassword: (identifier: string, pass: string) => {
    try {
      const stored = JSON.parse(localStorage.getItem(USER_PASSWORDS_KEY) || '{}');
      stored[identifier.trim().toLowerCase()] = pass;
      localStorage.setItem(USER_PASSWORDS_KEY, JSON.stringify(stored));
    } catch (e) {}
  },

  /**
   * Retrieve stored password for email or mobile
   */
  getUserPassword: (identifier: string): string | null => {
    try {
      const stored = JSON.parse(localStorage.getItem(USER_PASSWORDS_KEY) || '{}');
      return stored[identifier.trim().toLowerCase()] || null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Check if user is eligible to register or log in with strict role enforcement.
   * - MC roles (MC_ADMIN / MC_MEMBER) MUST be manually approved by existing MC Super Admin
   */
  verifyAndAuthenticateResident: (
    identifier: string,
    passwordInput: string,
    requestedRole: UserRole
  ): { success: boolean; roleAssigned: UserRole; message: string } => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    // 1. Primary MC Super Admin Credentials: sadish.sugumaran@gmail.com / Sadish@1208
    if ((cleanId === 'sadish.sugumaran@gmail.com' || cleanId === 'sadish') && cleanPass === 'Sadish@1208') {
      const session = { loggedIn: true, role: 'MC_ADMIN' as UserRole, email: 'sadish.sugumaran@gmail.com' };
      localStorage.setItem('grihasta_logged_in_session_v1', JSON.stringify(session));
      return {
        success: true,
        roleAssigned: 'MC_ADMIN',
        message: '✅ Authenticated as Primary MC Super Admin (Sadish Sugumaran).'
      };
    }

    // 2. Check registered user password
    const savedPass = DbConnector.getUserPassword(cleanId);
    if (savedPass && savedPass !== cleanPass) {
      return {
        success: false,
        roleAssigned: 'RESIDENT_OWNER',
        message: '❌ Invalid Password. If you forgot your password, please submit a Password Reset Request.'
      };
    }

    // 3. Strict Rule: MC Admin and MC Member roles CANNOT be self-assigned
    if (requestedRole === 'MC_ADMIN' || requestedRole === 'MC_MEMBER') {
      const approvedMCUsers = JSON.parse(localStorage.getItem('grihasta_approved_mc_users') || '[]');
      const isApproved = approvedMCUsers.some((u: any) => 
        (u.email && u.email.toLowerCase() === cleanId) || 
        (u.mobile && u.mobile === cleanId) || 
        (u.villaNumber && u.villaNumber.toLowerCase() === cleanId)
      );

      if (!isApproved) {
        return {
          success: false,
          roleAssigned: 'RESIDENT_OWNER',
          message: '⛔ Security Restriction: MC Member privileges require approval from Primary MC Admin (sadish.sugumaran@gmail.com).'
        };
      }

      const session = { loggedIn: true, role: requestedRole, email: cleanId };
      localStorage.setItem('grihasta_logged_in_session_v1', JSON.stringify(session));
      return {
        success: true,
        roleAssigned: requestedRole,
        message: '✅ Authenticated as verified Management Committee Member.'
      };
    }

    const assignedRole = requestedRole === 'RESIDENT_TENANT' ? 'RESIDENT_TENANT' : 'RESIDENT_OWNER';
    const session = { loggedIn: true, role: assignedRole, email: cleanId };
    localStorage.setItem('grihasta_logged_in_session_v1', JSON.stringify(session));

    return {
      success: true,
      roleAssigned: assignedRole,
      message: '✅ Signed in successfully.'
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
      localStorage.removeItem(USER_PASSWORDS_KEY);
      console.log('All existing registrations purged.');
    } catch (e) {
      console.error('Failed to purge registrations', e);
    }
  },

  submitMcApprovalRequest: (req: {
    name: string;
    mobile: string;
    email?: string;
    password?: string;
    laneNumber?: string;
    villaNumber: string;
    occupancyType: 'Owner' | 'Tenant';
    requestedRole: UserRole;
    requestType?: 'Registration' | 'PasswordReset';
  }) => {
    const list = DbConnector.getPendingApprovals();
    const laneNumber = req.laneNumber || getLaneForVillaNumber(req.villaNumber);

    const newItem: PendingUserApproval = {
      id: `appr-${Date.now()}`,
      name: req.name,
      mobile: req.mobile,
      email: req.email,
      password: req.password,
      laneNumber,
      villaNumber: req.villaNumber,
      occupancyType: req.occupancyType,
      requestedRole: req.requestedRole,
      requestType: req.requestType || 'Registration',
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    if (req.password && req.email) {
      DbConnector.setUserPassword(req.email, req.password);
    }
    if (req.password && req.mobile) {
      DbConnector.setUserPassword(req.mobile, req.password);
    }

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
            email: newItem.email,
            lane_number: newItem.laneNumber,
            villa_number: newItem.villaNumber,
            occupancy_type: newItem.occupancyType,
            requested_role: newItem.requestedRole,
            request_type: newItem.requestType,
            status: newItem.status,
            submitted_at: newItem.submittedAt
          });
        if (error) {
          console.warn('Supabase cloud insert notice:', error.message);
        }
      } catch (err: any) {
        console.warn('Supabase sync catch:', err);
      }
    })();

    return newItem;
  },

  /**
   * Reset user password by MC Admin
   */
  resetUserPassword: (approvalId: string, customNewPass?: string): string => {
    const newPass = customNewPass || 'Grihasta@123';
    const list = DbConnector.getPendingApprovals();
    const item = list.find(a => a.id === approvalId);
    if (item) {
      item.password = newPass;
      item.status = 'Approved';
      if (item.email) DbConnector.setUserPassword(item.email, newPass);
      if (item.mobile) DbConnector.setUserPassword(item.mobile, newPass);
      if (item.villaNumber) DbConnector.setUserPassword(item.villaNumber, newPass);
      localStorage.setItem(PENDING_APPROVALS_KEY, JSON.stringify(list));
    }
    return newPass;
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

