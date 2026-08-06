import React, { useState } from 'react';
import type { StaffMember, UserRole } from '../types';
import { StorageEngine } from '../services/storage';
import { LogIn, LogOut, Download, Plus } from 'lucide-react';

interface Props {
  role: UserRole;
}

export const Module07_Staff: React.FC<Props> = ({ role }) => {
  const [staffList, setStaffList] = useState<StaffMember[]>(StorageEngine.getStaff());

  // New Staff Modal
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'Security Guard' as const,
    phone: '',
    shift: 'Morning (6 AM - 2 PM)' as const,
    monthlySalary: 16000
  });

  const handleToggleDuty = (id: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updated = staffList.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'On Duty' ? ('Off Duty' as const) : ('On Duty' as const);
        return {
          ...s,
          status: nextStatus,
          inTime: nextStatus === 'On Duty' ? timeNow : s.inTime,
          outTime: nextStatus === 'Off Duty' ? timeNow : s.outTime
        };
      }
      return s;
    });

    setStaffList(updated);
    StorageEngine.saveStaff(updated);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const stf: StaffMember = {
      id: `STF-${Date.now().toString().slice(-4)}`,
      name: newStaff.name,
      role: newStaff.role,
      phone: newStaff.phone,
      shift: newStaff.shift,
      status: 'Off Duty',
      attendancePercentThisMonth: 100,
      monthlySalary: Number(newStaff.monthlySalary)
    };

    const updated = [stf, ...staffList];
    setStaffList(updated);
    StorageEngine.saveStaff(updated);
    setIsStaffModalOpen(false);
  };

  const totalOnDuty = staffList.filter(s => s.status === 'On Duty').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Banner */}
      <div className="card card-sage" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-sage" style={{ marginBottom: '0.4rem' }}>MODULE 07</span>
          <h2>👷 Staff Attendance & Shift Roster</h2>
          <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
            Daily check-in logs for guards, housekeeping & maintenance staff with MC payroll summary reports.
          </p>
        </div>

        {['MC_ADMIN', 'MC_MEMBER'].includes(role) && (
          <button onClick={() => setIsStaffModalOpen(true)} className="btn btn-primary">
            <Plus size={16} /> Register Staff Member
          </button>
        )}
      </div>

      {/* Staff Roster Grid */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>📋 Layout Staff Shift Log & Status ({totalOnDuty} On Duty Now)</h3>
          <span className="badge badge-paid">{totalOnDuty} Staff On-Site</span>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Role</th>
                <th>Shift Roster</th>
                <th>Contact</th>
                <th>In Time</th>
                <th>Month Attendance</th>
                <th>Duty Status</th>
                <th>Clock In/Out</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.name}</strong></td>
                  <td><span className="badge badge-ocean">{s.role}</span></td>
                  <td><span className="badge badge-amber">{s.shift}</span></td>
                  <td>{s.phone}</td>
                  <td>{s.inTime || '-'}</td>
                  <td><strong style={{ color: '#31532C' }}>{s.attendancePercentThisMonth}%</strong></td>
                  <td>
                    <span className={`badge ${s.status === 'On Duty' ? 'badge-paid' : s.status === 'On Leave' ? 'badge-overdue' : 'badge-pending'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleDuty(s.id)}
                      className={`btn btn-sm ${s.status === 'On Duty' ? 'btn-outline' : 'btn-accent'}`}
                      style={{ borderColor: s.status === 'On Duty' ? '#991B1B' : undefined, color: s.status === 'On Duty' ? '#991B1B' : undefined }}
                    >
                      {s.status === 'On Duty' ? <LogOut size={12} /> : <LogIn size={12} />}
                      {s.status === 'On Duty' ? 'Clock Out' : 'Clock In'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payroll Input Report for MC */}
      {['MC_ADMIN', 'MC_MEMBER'].includes(role) && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>📊 MC Staff Payroll Input Summary (August 2026)</h3>
            <button onClick={() => alert('Payroll report CSV downloaded!')} className="btn btn-sm btn-secondary">
              <Download size={14} /> Export Payroll CSV
            </button>
          </div>

          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Monthly Salary Rate</th>
                  <th>Days Present %</th>
                  <th>Est. Payable Salary</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((s) => {
                  const estPay = Math.round((s.monthlySalary * s.attendancePercentThisMonth) / 100);
                  return (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td><strong>{s.name}</strong></td>
                      <td>{s.role}</td>
                      <td>₹{s.monthlySalary.toLocaleString()}</td>
                      <td>{s.attendancePercentThisMonth}%</td>
                      <td><strong style={{ color: '#0B4769' }}>₹{estPay.toLocaleString()}</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: ADD STAFF */}
      {isStaffModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Register Staff Member</h3>
              <button onClick={() => setIsStaffModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleAddStaff} className="modal-body">
              <div className="form-group">
                <label>Staff Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  className="form-control"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Designation / Role</label>
                  <select
                    className="form-control"
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as any })}
                  >
                    <option value="Security Guard">Security Guard</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Gardener">Gardener</option>
                    <option value="Estate Manager">Estate Manager</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 99000 00000"
                    className="form-control"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Shift</label>
                  <select
                    className="form-control"
                    value={newStaff.shift}
                    onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value as any })}
                  >
                    <option value="Morning (6 AM - 2 PM)">Morning (6 AM - 2 PM)</option>
                    <option value="Evening (2 PM - 10 PM)">Evening (2 PM - 10 PM)</option>
                    <option value="Night (10 PM - 6 AM)">Night (10 PM - 6 AM)</option>
                    <option value="General (9 AM - 6 PM)">General (9 AM - 6 PM)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Monthly Salary (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newStaff.monthlySalary}
                    onChange={(e) => setNewStaff({ ...newStaff, monthlySalary: Number(e.target.value) })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Save Staff Record
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
