import React, { useState, useRef, useEffect } from 'react';
import type { UserRole } from '../types';
import { Shield, Home, Building2, Wallet, Wrench, Calendar, Bell, Users, BarChart3, BookOpen, Globe, Lock, ChevronRight, Menu, X, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeModule: number;
  setActiveModule: (moduleIndex: number) => void;
  onOpenManual: () => void;
  onGoHome: () => void;
  onOpenRequestAccess: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  setActiveRole,
  activeModule,
  setActiveModule,
  onOpenManual,
  onGoHome,
  onOpenRequestAccess
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const roleGroups = [
    {
      groupLabel: '👑 Management & Committee',
      roles: [
        { role: 'MC_ADMIN' as UserRole, label: 'MC Administrator (Full Admin)' },
        { role: 'MC_MEMBER' as UserRole, label: 'MC Member (Elevated View)' },
      ]
    },
    {
      groupLabel: '🏡 Resident Portal',
      roles: [
        { role: 'RESIDENT_OWNER' as UserRole, label: 'Resident (Villa Owner)' },
        { role: 'RESIDENT_TENANT' as UserRole, label: 'Resident (Tenant)' },
      ]
    },
    {
      groupLabel: '🛡️ Operations & Staff',
      roles: [
        { role: 'SECURITY_GUARD' as UserRole, label: 'Security Guard (Gate Access)' },
        { role: 'MAINTENANCE_STAFF' as UserRole, label: 'Maintenance Staff' },
      ]
    }
  ];

  const modules = [
    { id: 1, num: '01', name: 'Flats & Residents', icon: Home, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER', 'RESIDENT_TENANT'] },
    { id: 2, num: '02', name: 'Gate & Security', icon: Shield, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER', 'RESIDENT_TENANT', 'SECURITY_GUARD'] },
    { id: 3, num: '03', name: 'Maintenance & Finance', icon: Wallet, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER'] },
    { id: 4, num: '04', name: 'Complaints Helpdesk', icon: Wrench, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER', 'RESIDENT_TENANT', 'MAINTENANCE_STAFF'] },
    { id: 5, num: '05', name: 'Amenities Booking', icon: Calendar, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER', 'RESIDENT_TENANT'] },
    { id: 6, num: '06', name: 'Notice Board & Polls', icon: Bell, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER', 'RESIDENT_TENANT'] },
    { id: 7, num: '07', name: 'Staff Attendance', icon: Users, roles: ['MC_ADMIN', 'MC_MEMBER', 'MAINTENANCE_STAFF', 'SECURITY_GUARD'] },
    { id: 8, num: '08', name: 'MC Dashboard', icon: BarChart3, roles: ['MC_ADMIN', 'MC_MEMBER'] },
    { id: 9, num: '09', name: 'Community & Social', icon: HeartHandshake, roles: ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER', 'RESIDENT_TENANT'] },
  ];

  const activeModuleData = modules.find(m => m.id === activeModule);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [menuOpen]);

  const handleModuleSelect = (id: number) => {
    setActiveModule(id);
    setMenuOpen(false);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="role-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button
              id="hamburger-menu-btn"
              onClick={() => setMenuOpen(prev => !prev)}
              style={{
                background: menuOpen ? '#1E6B85' : 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: '#FFF',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              aria-label="Open navigation menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {menuOpen && (
              <div
                id="sandwich-menu-drawer"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  width: '290px',
                  background: '#031D34',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 60px rgba(3,29,52,0.6)',
                  overflow: 'hidden',
                  animation: 'slideDown 0.2s ease',
                  zIndex: 200
                }}
              >
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onGoHome();
                  }}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.15rem',
                    borderBottom: '1px solid rgba(233,187,118,0.3)',
                    background: 'linear-gradient(135deg, rgba(233,187,118,0.2), rgba(11,71,105,0.4))',
                    color: '#E9BB76',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    textAlign: 'left'
                  }}
                >
                  <Globe size={18} />
                  <span>🌐 Return to Landing Home Page</span>
                </button>

                <div style={{
                  padding: '0.75rem 1.15rem',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(30, 107, 133, 0.2)'
                }}>
                  <Building2 size={16} style={{ color: '#E9BB76' }} />
                  <span style={{ fontSize: '0.8rem', color: '#D2E0B0', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    Layout Portal Modules
                  </span>
                </div>

                <div style={{ padding: '0.5rem 0', maxHeight: '60vh', overflowY: 'auto' }}>
                  {modules.map((m) => {
                    const Icon = m.icon;
                    const isActive = activeModule === m.id;
                    const isAuthorized = m.roles.includes(activeRole);

                    return (
                      <button
                        key={m.id}
                        id={`menu-module-${m.num}`}
                        onClick={() => isAuthorized && handleModuleSelect(m.id)}
                        disabled={!isAuthorized}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.65rem 1.15rem',
                          background: isActive ? 'rgba(233,187,118,0.15)' : 'transparent',
                          color: isActive ? '#E9BB76' : isAuthorized ? '#FFFFFF' : 'rgba(255,255,255,0.35)',
                          border: 'none',
                          borderLeft: isActive ? '3px solid #E9BB76' : '3px solid transparent',
                          cursor: isAuthorized ? 'pointer' : 'not-allowed',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          color: isActive ? '#E9BB76' : 'rgba(255,255,255,0.4)',
                          width: '20px'
                        }}>
                          {m.num}
                        </span>

                        <Icon size={16} style={{ color: isActive ? '#E9BB76' : 'rgba(255,255,255,0.65)', flexShrink: 0 }} />

                        <span style={{ fontSize: '0.875rem', fontWeight: isActive ? 700 : 400, flex: 1 }}>
                          {m.name}
                        </span>

                        {isActive ? (
                          <ChevronRight size={14} style={{ color: '#E9BB76', flexShrink: 0 }} />
                        ) : !isAuthorized ? (
                          <Lock size={12} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div
            onClick={onGoHome}
            title="Click to return to Grihasta Home Page"
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
          >
            <Building2 size={22} style={{ color: '#E9BB76' }} />
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.5px', color: '#FFF' }}>
              grihasta<span style={{ color: '#E9BB76' }}>.online</span>
            </span>
            <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>Grihasta Layout</span>
          </div>

          {activeModuleData && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '20px',
              padding: '0.25rem 0.75rem',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.85)'
            }}>
              <span style={{ color: '#E9BB76', fontWeight: 800, fontSize: '0.7rem' }}>M{activeModuleData.num}</span>
              <span>{activeModuleData.name}</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={onGoHome}
            className="btn btn-sm btn-amber"
            style={{ fontWeight: 800, fontSize: '0.78rem' }}
            title="Return to Public Landing Page"
          >
            <Globe size={14} /> Home Page
          </button>

          <button onClick={onOpenRequestAccess} className="btn btn-sm btn-outline" style={{ borderColor: '#86EFAC', color: '#D2E0B0', fontSize: '0.78rem' }} title="Submit Access Request to MC">
            <Shield size={14} /> Request Access
          </button>

          <button onClick={onOpenManual} className="btn btn-sm btn-outline" style={{ borderColor: '#E9BB76', color: '#E9BB76', fontSize: '0.78rem' }}>
            <BookOpen size={14} /> Manual
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', opacity: 0.8, whiteSpace: 'nowrap' }}>Access Portal:</span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as UserRole)}
              className="role-bar-select"
              style={{ paddingRight: '1rem', background: '#0B4769', color: '#FFF', fontWeight: 700 }}
            >
              {roleGroups.map((group) => (
                <optgroup key={group.groupLabel} label={group.groupLabel}>
                  {group.roles.map((r) => (
                    <option key={r.role} value={r.role}>
                      {r.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};
