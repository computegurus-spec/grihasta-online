import React, { useState } from 'react';
import { StorageEngine } from '../services/storage';
import { DbConnector } from '../services/dbConnector';
import { BarChart3, TrendingUp, AlertTriangle, Users, CheckCircle, XCircle, UserCheck, Trash2, MapPin } from 'lucide-react';

export const Module08_AdminDashboard: React.FC = () => {
  const flats = StorageEngine.getFlats();
  const dues = StorageEngine.getDues();
  const tickets = StorageEngine.getTickets();
  const staff = StorageEngine.getStaff();
  const bookings = StorageEngine.getBookings();

  // Pending Access Requests state
  const [approvals, setApprovals] = useState(() => {
    return DbConnector.getPendingApprovals();
  });

  const handleApprove = (id: string) => {
    DbConnector.approveMcUser(id);
    setApprovals(DbConnector.getPendingApprovals());
  };

  const handleReject = (id: string) => {
    DbConnector.rejectMcUser(id);
    setApprovals(DbConnector.getPendingApprovals());
  };

  const handlePurgeAll = () => {
    if (window.confirm('Are you sure you want to delete all existing registration requests? This action cannot be undone.')) {
      DbConnector.clearAllRegistrations();
      setApprovals([]);
    }
  };

  const totalCollected = dues.filter(d => d.status === 'Paid').reduce((acc, d) => acc + d.amount, 0);
  const totalPending = dues.filter(d => d.status !== 'Paid').reduce((acc, d) => acc + d.amount, 0);
  const collectionPct = Math.round((totalCollected / (totalCollected + totalPending)) * 100) || 0;

  const openTickets = tickets.filter(t => t.status !== 'Resolved').length;
  const staffOnSite = staff.filter(s => s.status === 'On Duty').length;
  const occupiedFlats = flats.filter(f => f.occupancyType !== 'Vacant').length;
  const occupancyPct = Math.round((occupiedFlats / flats.length) * 100) || 0;

  const pendingCount = approvals.filter(a => a.status === 'Pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* MC One-Click Access Request Approval Queue */}
      <div className="card" style={{ background: '#FFF', border: '2px solid #0B4769', boxShadow: '0 10px 30px rgba(11,71,105,0.12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span className="badge badge-amber" style={{ fontWeight: 800, marginBottom: '0.3rem' }}>APPROVAL QUEUE</span>
            <h3 style={{ color: '#0B4769', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCheck size={22} style={{ color: '#E9BB76' }} /> ⚡ Pending Resident & MC Access Requests
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={handlePurgeAll}
              className="btn btn-sm btn-secondary"
              style={{ background: '#991B1B', color: '#FFF', border: 'none', padding: '0.35rem 0.75rem', fontSize: '0.78rem', fontWeight: 700 }}
              title="Delete all existing registration records"
            >
              <Trash2 size={13} /> Purge All Registrations
            </button>
            <span className="badge badge-ocean" style={{ fontSize: '0.85rem', fontWeight: 800 }}>
              {pendingCount} Pending Approvals
            </span>
          </div>
        </div>

        {approvals.length === 0 ? (
          <div style={{ padding: '2rem 1rem', textAlign: 'center', background: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
            <UserCheck size={40} style={{ color: '#94A3B8', marginBottom: '0.5rem' }} />
            <h4 style={{ color: '#475569', margin: '0 0 0.25rem 0' }}>No Pending Access Requests</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>
              All registrations have been cleared. New resident registration requests will appear here with their explicit Lane Number.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Mobile</th>
                  <th>Lane Number</th>
                  <th>Villa / Plot</th>
                  <th>Occupancy & Requested Role</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>MC Action</th>
                </tr>
              </thead>
              <tbody>
                {approvals.map((a) => (
                  <tr key={a.id}>
                    <td><strong>{a.name}</strong></td>
                    <td><span style={{ fontSize: '0.8rem', color: '#475569' }}>{a.mobile}</span></td>
                    <td>
                      <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <MapPin size={11} /> {a.laneNumber || 'Lane 1'}
                      </span>
                    </td>
                    <td><span className="badge badge-amber">{a.villaNumber}</span></td>
                    <td>
                      <div style={{ fontSize: '0.8rem' }}>
                        <strong>{a.occupancyType}</strong> ({a.requestedRole})
                      </div>
                    </td>
                    <td><span style={{ fontSize: '0.78rem', color: '#64748B' }}>{a.submittedAt}</span></td>
                    <td>
                      <span className={`badge ${a.status === 'Approved' ? 'badge-paid' : a.status === 'Rejected' ? 'badge-overdue' : 'badge-pending'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td>
                      {a.status === 'Pending' ? (
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => handleApprove(a.id)}
                            className="btn btn-sm btn-primary"
                            style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', background: '#16A34A', border: 'none' }}
                          >
                            <CheckCircle size={13} /> Approve
                          </button>
                          <button
                            onClick={() => handleReject(a.id)}
                            className="btn btn-sm btn-secondary"
                            style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', background: '#991B1B', color: '#FFF', border: 'none' }}
                          >
                            <XCircle size={13} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#64748B', fontStyle: 'italic' }}>
                          {a.status === 'Approved' ? '✅ Verified & Granted' : '❌ Access Declined'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Banner */}
      <div className="card card-sage" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-sage" style={{ marginBottom: '0.4rem' }}>MODULE 08</span>
          <h2>📊 Management Committee Executive Dashboard</h2>
          <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
            High-level operational metrics for layout leadership — maintenance dues collection rates, open helpdesk requests, staff attendance, and occupancy overview.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid-4">
        <div className="stat-card stat-card-teal">
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Collection Rate</span>
            <div className="stat-value" style={{ color: '#0B4769' }}>{collectionPct}%</div>
            <span style={{ fontSize: '0.75rem', color: '#31532C' }}>₹{totalCollected.toLocaleString()} Paid</span>
          </div>
          <TrendingUp size={32} style={{ color: '#0B4769' }} />
        </div>

        <div className="stat-card stat-card-amber">
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Open Complaints</span>
            <div className="stat-value" style={{ color: openTickets > 0 ? '#991B1B' : '#31532C' }}>{openTickets}</div>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{tickets.length - openTickets} Resolved</span>
          </div>
          <AlertTriangle size={32} style={{ color: '#E9BB76' }} />
        </div>

        <div className="stat-card stat-card-forest">
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Staff On-Site</span>
            <div className="stat-value" style={{ color: '#31532C' }}>{staffOnSite} / {staff.length}</div>
            <span style={{ fontSize: '0.75rem', color: '#475569' }}>Active Duty Roster</span>
          </div>
          <Users size={32} style={{ color: '#31532C' }} />
        </div>

        <div className="stat-card stat-card-teal">
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Layout Occupancy</span>
            <div className="stat-value" style={{ color: '#0B4769' }}>{occupancyPct}%</div>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{occupiedFlats} of {flats.length} Flats</span>
          </div>
          <BarChart3 size={32} style={{ color: '#1E6B85' }} />
        </div>
      </div>

      {/* Snapshot breakdown tables */}
      <div className="grid-2">
        {/* Pending Defaulters Snapshot */}
        <div className="card">
          <h4 style={{ color: '#991B1B', marginBottom: '0.75rem' }}>⚠️ Outstanding Maintenance Defaulters Snapshot</h4>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Flat ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dues.filter(d => d.status !== 'Paid').map((d) => (
                  <tr key={d.id}>
                    <td><span className="badge badge-ocean">{d.flatId}</span></td>
                    <td><strong style={{ color: '#991B1B' }}>₹{d.amount.toLocaleString()}</strong></td>
                    <td>
                      <span className={`badge ${d.status === 'Overdue' ? 'badge-overdue' : 'badge-pending'}`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Bookings Snapshot */}
        <div className="card">
          <h4 style={{ color: '#0B4769', marginBottom: '0.75rem' }}>📅 Upcoming Amenity Reservations Snapshot</h4>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Amenity</th>
                  <th>Date</th>
                  <th>Flat ID</th>
                </tr>
              </thead>
              <tbody>
                {bookings.filter(b => b.status === 'Confirmed').map((b) => (
                  <tr key={b.id}>
                    <td><strong>{b.amenityName}</strong></td>
                    <td>{b.bookingDate}</td>
                    <td><span className="badge badge-ocean">{b.flatId}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MC Security & Access Governance Control Box */}
      <div className="card" style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div>
            <span className="badge badge-ocean" style={{ marginBottom: '0.3rem' }}>SECURITY & ACCESS GOVERNANCE</span>
            <h3 style={{ color: '#0B4769', margin: 0 }}>👑 Resident Verification & Role Management</h3>
          </div>
          <span className="badge badge-amber" style={{ fontWeight: 800 }}>STRICT ROLE CONTROLS ENFORCED</span>
        </div>

        <div style={{ background: '#FFF', padding: '1rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
          <h4 style={{ color: '#031D34', marginBottom: '0.5rem' }}>🔒 Layout Access Protocols:</h4>
          <ul style={{ paddingLeft: '1.25rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>Resident Tenants:</strong> Verified & restricted to Tenant Resident Portal.</li>
            <li><strong>Resident Owners:</strong> Verified & granted Owner Resident Portal features.</li>
            <li><strong>MC Committee Members:</strong> Require manual authorization by Management Committee Super Admin.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
