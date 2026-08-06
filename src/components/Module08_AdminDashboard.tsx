import React from 'react';
import { StorageEngine } from '../services/storage';
import { BarChart3, TrendingUp, AlertTriangle, Users } from 'lucide-react';

export const Module08_AdminDashboard: React.FC = () => {
  const flats = StorageEngine.getFlats();
  const dues = StorageEngine.getDues();
  const tickets = StorageEngine.getTickets();
  const staff = StorageEngine.getStaff();
  const bookings = StorageEngine.getBookings();

  const totalCollected = dues.filter(d => d.status === 'Paid').reduce((acc, d) => acc + d.amount, 0);
  const totalPending = dues.filter(d => d.status !== 'Paid').reduce((acc, d) => acc + d.amount, 0);
  const collectionPct = Math.round((totalCollected / (totalCollected + totalPending)) * 100) || 0;

  const openTickets = tickets.filter(t => t.status !== 'Resolved').length;
  const staffOnSite = staff.filter(s => s.status === 'On Duty').length;
  const occupiedFlats = flats.filter(f => f.occupancyType !== 'Vacant').length;
  const occupancyPct = Math.round((occupiedFlats / flats.length) * 100) || 0;

  const phases = [
    { phase: 'Phase 1: Foundation', weeks: 'Weeks 1 – 2', items: ['Flat directory', 'Owner & tenant profiles', 'Vehicle registration', 'Domestic help log'], status: 'Completed', color: '#31532C' },
    { phase: 'Phase 2: Finance', weeks: 'Weeks 3 – 4', items: ['Maintenance dues', 'Payment marking', 'Defaulter reminders', 'Expense ledger'], status: 'In Progress', color: '#0B4769' },
    { phase: 'Phase 3: Security', weeks: 'Weeks 5 – 6', items: ['Digital visitor log', 'Pre-approved passes', 'Delivery tracking', 'Guard roster'], status: 'Scheduled', color: '#1E6B85' },
    { phase: 'Phase 4: Community', weeks: 'Weeks 7 – 8', items: ['Notice board', 'Complaint tickets', 'Feedback channel', 'MC dashboard live'], status: 'Scheduled', color: '#E9BB76' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Banner */}
      <div className="card card-sage" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-sage" style={{ marginBottom: '0.4rem' }}>MODULE 08</span>
          <h2>📊 MC Executive Admin Dashboard</h2>
          <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
            High-level metrics for Management Committee leadership — collection rates, pending complaints, occupancy snapshot, and implementation roadmap.
          </p>
        </div>

        <div style={{ background: '#031D34', color: '#E9BB76', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: 800, textAlign: 'right' }}>
          <div>ANNUAL RUN COST: ~₹14,300/yr</div>
          <div style={{ fontSize: '0.75rem', color: '#FFF', fontWeight: 400 }}>₹0 Dev Cost · Complete MC Ownership</div>
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

      {/* Implementation Timeline Card */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>🚀 8-Week Implementation Roadmap (Phases 1 – 4)</h3>
          <span className="badge badge-sage">ON TRACK TO MVP</span>
        </div>

        <div className="grid-2">
          {phases.map((p, idx) => (
            <div key={idx} style={{ background: '#F8FAFC', border: `1.5px solid ${p.color}`, borderRadius: '10px', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ color: p.color }}>{p.phase}</h4>
                <span className="badge" style={{ background: p.color, color: '#FFF' }}>{p.weeks}</span>
              </div>

              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569' }}>
                {p.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
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
    </div>
  );
};
