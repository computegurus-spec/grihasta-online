import React, { useState, useRef, useEffect } from 'react';
import type { UserRole } from '../types';
import { Shield, Home, Building2, Wallet, Wrench, Calendar, Bell, Users, BarChart3, BookOpen, HeartHandshake, Menu, X, ChevronRight } from 'lucide-react';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const rolesList: { role: UserRole; label: string }[] = [
    { role: 'MC_ADMIN', label: 'MC Administrator (Full Admin)' },
    { role: 'MC_MEMBER', label: 'MC Member (Elevated)' },
    { role: 'RESIDENT_OWNER', label: 'Resident (Owner)' },
    { role: 'RESIDENT_TENANT', label: 'Resident (Tenant)' },
    { role: 'SECURITY_GUARD', label: 'Security Guard (Gate Access)' },
    { role: 'MAINTENANCE_STAFF', label: 'Maintenance Staff' },
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

  // Close on outside click
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
      {/* Top Bar */}
      <div className="role-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left: Logo + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Hamburger button */}
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

            {/* Slide-down Menu Drawer */}
            {menuOpen && (
              <div
                id="sandwich-menu-drawer"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  width: '280px',
                  background: '#031D34',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 60px rgba(3,29,52,0.6)',
                  overflow: 'hidden',
                  animation: 'slideDown 0.2s ease',
                  zIndex: 200
                }}
              >
                {/* Drawer Header */}
                <div style={{
                  padding: '0.85rem 1.15rem',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(30, 107, 133, 0.2)'
                }}>
                  <Building2 size={16} style={{ color: '#E9BB76' }} />
                  <span style={{ fontSize: '0.8rem', color: '#D2E0B0', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    Module Navigation
                  </span>
                </div>

                {/* Module List */}
                <div style={{ padding: '0.5rem 0' }}>
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
                          padding: '0.7rem 1.1rem',
                          background: isActive ? 'rgba(30, 107, 133, 0.35)' : 'transparent',
                          border: 'none',
                          borderLeft: isActive ? '3px solid #E9BB76' : '3px solid transparent',
                          cursor: isAuthorized ? 'pointer' : 'not-allowed',
                          opacity: isAuthorized ? 1 : 0.35,
                          transition: 'all 0.15s ease',
                          textAlign: 'left',
                          color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.8)',
                        }}
                        onMouseEnter={e => {
                          if (isAuthorized && !isActive) {
                            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                          }
                        }}
                      >
                        {/* Badge */}
                        <span style={{
                          background: isActive ? '#E9BB76' : 'rgba(255,255,255,0.12)',
                          color: isActive ? '#031D34' : 'rgba(255,255,255,0.7)',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                          letterSpacing: '0.5px',
                          minWidth: '32px',
                          textAlign: 'center',
                          flexShrink: 0
                        }}>
                          M{m.num}
                        </span>

                        {/* Icon */}
                        <Icon size={16} style={{ color: isActive ? '#E9BB76' : 'rgba(255,255,255,0.65)', flexShrink: 0 }} />

                        {/* Name */}
                        <span style={{ fontSize: '0.875rem', fontWeight: isActive ? 700 : 400, flex: 1 }}>
                          {m.name}
                        </span>

                        {isActive && <ChevronRight size={14} style={{ color: '#E9BB76', flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Building2 size={22} style={{ color: '#E9BB76' }} />
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.5px' }}>
              grihasta<span style={{ color: '#E9BB76' }}>.online</span>
            </span>
            <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>Artha Layout</span>
          </div>

          {/* Active Module Breadcrumb Pill */}
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

        {/* Right: Manual button + Role switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={onOpenManual} className="btn btn-sm btn-outline" style={{ borderColor: '#E9BB76', color: '#E9BB76' }}>
            <BookOpen size={14} /> Manual
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', opacity: 0.8, whiteSpace: 'nowrap' }}>Role:</span>
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

      {/* Inline animation style */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};
