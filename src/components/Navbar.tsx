import React from 'react';
import type { UserRole } from '../types';
import { Shield, Home, Building2, Wallet, Wrench, Calendar, Bell, Users, BarChart3, BookOpen, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeModule: number;
  setActiveModule: (moduleIndex: number) => void;
  onOpenManual: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  setActiveRole,
  activeModule,
  setActiveModule,
  onOpenManual
}) => {
  const rolesList: { role: UserRole; label: string }[] = [
    { role: 'MC_ADMIN', label: 'MC Administrator (Full Admin)' },
    { role: 'MC_MEMBER', label: 'MC Member (Elevated)' },
    { role: 'RESIDENT_OWNER', label: 'Resident (Owner)' },
    { role: 'RESIDENT_TENANT', label: 'Resident (Tenant)' },
    { role: 'SECURITY_GUARD', label: 'Security Guard (Gate Access)' },
    { role: 'MAINTENANCE_STAFF', label: 'Maintenance Staff' },
  ];

  const modules = [
    { id: 1, name: 'Flats & Residents', icon: Home, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER', 'RESIDENT_TENANT'] },
    { id: 2, name: 'Gate & Security', icon: Shield, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER', 'RESIDENT_TENANT', 'SECURITY_GUARD'] },
    { id: 3, name: 'Maintenance & Finance', icon: Wallet, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER'] },
    { id: 4, name: 'Complaints Helpdesk', icon: Wrench, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER', 'RESIDENT_TENANT', 'MAINTENANCE_STAFF'] },
    { id: 5, name: 'Amenities Booking', icon: Calendar, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER', 'RESIDENT_TENANT'] },
    { id: 6, name: 'Notice Board & Polls', icon: Bell, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER', 'RESIDENT_TENANT'] },
    { id: 7, name: 'Staff Attendance', icon: Users, roles: ['MC_ADMIN', 'MC_MEMBER', 'MAINTENANCE_STAFF', 'SECURITY_GUARD'] },
    { id: 8, name: 'MC Dashboard', icon: BarChart3, roles: ['MC_ADMIN', 'MC_MEMBER'] },
    { id: 9, name: 'Community & Social', icon: HeartHandshake, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER', 'RESIDENT_TENANT'] },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Role Switcher Bar */}
      <div className="role-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Building2 size={22} style={{ color: '#E9BB76' }} />
          <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.5px' }}>
            grihasta<span style={{ color: '#E9BB76' }}>.online</span>
          </span>
          <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>Artha Grihasta Layout</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={onOpenManual} className="btn btn-sm btn-outline" style={{ borderColor: '#E9BB76', color: '#E9BB76' }}>
            <BookOpen size={14} /> Resident Manual
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', opacity: 0.9 }}>Active Role View:</span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as UserRole)}
              className="role-bar-select"
            >
              {rolesList.map((r) => (
                <option key={r.role} value={r.role}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Module Navigation Bar */}
      <nav style={{ background: '#0B4769', borderBottom: '1px solid #1E6B85', padding: '0.5rem 1rem', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: '0.5rem', minWidth: 'max-content', maxWidth: '1400px', margin: '0 auto' }}>
          {modules.map((m) => {
            const Icon = m.icon;
            const isActive = activeModule === m.id;
            const isAuthorized = m.roles.includes(activeRole);

            return (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                disabled={!isAuthorized}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: isAuthorized ? 'pointer' : 'not-allowed',
                  backgroundColor: isActive ? '#1E6B85' : 'transparent',
                  color: isActive ? '#FFFFFF' : isAuthorized ? '#EFEED2' : 'rgba(239, 238, 210, 0.4)',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} style={{ color: isActive ? '#E9BB76' : 'currentColor' }} />
                <span>M{m.id}: {m.name}</span>
                {!isAuthorized && (
                  <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.3)', padding: '1px 4px', borderRadius: '3px' }}>Restricted</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
