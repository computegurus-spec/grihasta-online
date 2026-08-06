import React, { useState, useEffect } from 'react';
import {
  Shield, Home, Wallet, Wrench, Calendar, Bell, Users, BarChart3, HeartHandshake,
  ArrowRight, Building2, TreePine, CheckCircle, Phone, Mail, MapPin, ChevronDown
} from 'lucide-react';

interface LandingPageProps {
  onEnterPortal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterPortal }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const modules = [
    { icon: Home, num: '01', name: 'Flats & Residents', desc: 'Lane-wise villa directory, resident profiles, domestic help logs' },
    { icon: Shield, num: '02', name: 'Gate & Security', desc: 'Digital visitor log, delivery tracking, pre-approved gate passes' },
    { icon: Wallet, num: '03', name: 'Maintenance & Finance', desc: 'Quarterly dues ₹9,000, payment tracking, expense ledger' },
    { icon: Wrench, num: '04', name: 'Complaints Helpdesk', desc: 'SLA-based ticket system, staff assignment, 5-star ratings' },
    { icon: Calendar, num: '05', name: 'Amenities Booking', desc: 'Party hall, pool, gym & courts with conflict detection' },
    { icon: Bell, num: '06', name: 'Notice Board & Polls', desc: 'MC circulars, emergency broadcasts, digital voting' },
    { icon: Users, num: '07', name: 'Staff Attendance', desc: 'Guard & housekeeping clock-in/out, payroll summary' },
    { icon: BarChart3, num: '08', name: 'MC Dashboard', desc: 'Executive overview for Management Committee leadership' },
    { icon: HeartHandshake, num: '09', name: 'Community & Social', desc: 'Neighbour marketplace, lost & found, carpooling, groups' },
  ];

  const amenities = [
    '🏊 Swimming Pool', '🏸 Badminton Courts', '🏋️ Gymnasium', '🎉 Party Hall (120 capacity)',
    '🌳 Landscaped Gardens', '🛡️ 24/7 Security Gate', '🚿 Shower & Change Rooms', '🌿 Jogging Track',
  ];

  const highlights = [
    { icon: '📱', title: 'No App Download', desc: 'Works on any smartphone browser — Chrome, Safari or Firefox' },
    { icon: '🔒', title: 'Resident Privacy', desc: 'Zero ads, zero tracking — only verified MC-approved residents' },
    { icon: '🏠', title: '100% MC Owned', desc: 'Complete data ownership. No third-party vendor lock-in' },
    { icon: '💸', title: '₹14,300/year Total', desc: 'Domain + hosting combined. Zero development cost' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', 'Outfit', sans-serif", color: '#031D34', overflowX: 'hidden' }}>

      {/* ─── STICKY NAV ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(3,29,52,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(233,187,118,0.2)' : 'none',
        transition: 'all 0.3s ease',
        padding: '1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Building2 size={24} style={{ color: '#E9BB76' }} />
          <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#FFF', letterSpacing: '0.5px' }}>
            grihasta<span style={{ color: '#E9BB76' }}>.online</span>
          </span>
          <span style={{
            background: '#E9BB76', color: '#031D34', fontSize: '0.65rem', fontWeight: 800,
            padding: '0.15rem 0.5rem', borderRadius: '4px', letterSpacing: '0.5px'
          }}>ARTHA LAYOUT</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#modules" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.875rem' }}>Modules</a>
          <a href="#amenities" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.875rem' }}>Amenities</a>
          <a href="#contact" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.875rem' }}>Contact MC</a>
          <button
            id="landing-enter-portal-btn"
            onClick={onEnterPortal}
            style={{
              background: '#E9BB76', color: '#031D34', border: 'none', borderRadius: '8px',
              padding: '0.5rem 1.25rem', fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            Enter Portal <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #031D34 0%, #0B4769 50%, #1E6B85 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '6rem 2rem 4rem',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(233,187,118,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(49,83,44,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <TreePine size={18} style={{ color: '#D2E0B0' }} />
            <span style={{ color: '#D2E0B0', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Sylvan Residential Community · Bangalore
            </span>
            <TreePine size={18} style={{ color: '#D2E0B0' }} />
          </div>

          <h1 style={{
            color: '#FFFFFF', fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 900,
            lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.5px'
          }}>
            Welcome to<br />
            <span style={{ color: '#E9BB76' }}>Artha Grihasta</span>
          </h1>

          <p style={{ color: '#EFEED2', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '0.75rem', opacity: 0.95 }}>
            Dear Residents, we are happy to welcome you to Artha Grihasta and to the vibrant community that has grown within it. As a proud resident, you have the additional satisfaction of knowing that an enriching quality of life exists for you and your family in this sylvan layout.
          </p>

          <p style={{ color: '#D2E0B0', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem', opacity: 0.85 }}>
            This portal is your digital home for all layout management — from gate security to maintenance dues, community events to amenity bookings.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              id="hero-enter-portal-btn"
              onClick={onEnterPortal}
              style={{
                background: '#E9BB76', color: '#031D34', border: 'none', borderRadius: '10px',
                padding: '0.9rem 2.2rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(233,187,118,0.35)', transition: 'all 0.25s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(233,187,118,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(233,187,118,0.35)'; }}
            >
              Enter Resident Portal <ArrowRight size={18} />
            </button>

            <a href="#modules" style={{
              background: 'rgba(255,255,255,0.1)', color: '#FFF', border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '10px', padding: '0.9rem 2.2rem', fontWeight: 600, fontSize: '1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none',
              backdropFilter: 'blur(4px)', transition: 'all 0.25s ease'
            }}>
              Explore Features <ChevronDown size={18} />
            </a>
          </div>

          {/* Quick stats */}
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3.5rem', flexWrap: 'wrap' }}>
            {[
              { val: '15 Lanes', label: 'Residential Lanes' },
              { val: '9 Modules', label: 'Management Modules' },
              { val: '₹9,000/Qtr', label: 'Maintenance Dues' },
              { val: '₹0', label: 'App Download Cost' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#E9BB76' }}>{s.val}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.15rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY SECTION ─── */}
      <section style={{ background: '#EFEED2', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#1E6B85', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Why This Portal</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#031D34', margin: '0.5rem 0' }}>
              Built for Artha Grihasta. Only for residents.
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              No generic app. No third-party vendors. A purpose-built portal that the MC committee fully owns and controls.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {highlights.map((h, i) => (
              <div key={i} style={{
                background: '#FFFFFF', borderRadius: '16px', padding: '1.75rem',
                border: '1px solid rgba(11,71,105,0.08)',
                boxShadow: '0 4px 20px rgba(3,29,52,0.06)', transition: 'all 0.2s ease'
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{h.icon}</div>
                <h3 style={{ color: '#0B4769', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>{h.title}</h3>
                <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.6 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MODULES GRID ─── */}
      <section id="modules" style={{ background: '#031D34', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#E9BB76', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>9 Modules</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#FFFFFF', margin: '0.5rem 0' }}>
              Everything your layout needs
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto' }}>
              From gate security to community social — all under one digital roof.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s ease'
                }}
                  onClick={onEnterPortal}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(30,107,133,0.25)';
                    e.currentTarget.style.borderColor = 'rgba(233,187,118,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{
                      background: '#E9BB76', color: '#031D34', fontSize: '0.65rem', fontWeight: 800,
                      padding: '0.2rem 0.45rem', borderRadius: '4px', letterSpacing: '0.5px'
                    }}>M{m.num}</span>
                    <Icon size={18} style={{ color: '#E9BB76' }} />
                  </div>
                  <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.975rem', marginBottom: '0.4rem' }}>{m.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.825rem', lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              id="modules-enter-portal-btn"
              onClick={onEnterPortal}
              style={{
                background: '#E9BB76', color: '#031D34', border: 'none', borderRadius: '10px',
                padding: '0.85rem 2rem', fontWeight: 800, fontSize: '0.975rem', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
              }}
            >
              Open All Modules <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── AMENITIES SECTION ─── */}
      <section id="amenities" style={{ background: '#D2E0B0', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#31532C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Layout Amenities</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#031D34', margin: '0.5rem 0' }}>
              Live the sylvan life
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '560px', margin: '0 auto' }}>
              Artha Grihasta offers premium amenities within a landscaped gated community — all bookable through this portal.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
            {amenities.map((a, i) => (
              <div key={i} style={{
                background: '#FFFFFF', borderRadius: '12px', padding: '1.1rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontWeight: 600, color: '#031D34', fontSize: '0.9rem',
                boxShadow: '0 2px 8px rgba(3,29,52,0.06)'
              }}>
                <CheckCircle size={16} style={{ color: '#31532C', flexShrink: 0 }} />
                {a}
              </div>
            ))}
          </div>

          {/* Welcome letter quote */}
          <div style={{
            background: '#031D34', borderRadius: '16px', padding: '2.5rem 2rem',
            borderLeft: '5px solid #E9BB76', position: 'relative'
          }}>
            <div style={{ fontSize: '3rem', color: '#E9BB76', lineHeight: 1, marginBottom: '0.5rem', opacity: 0.5 }}>"</div>
            <p style={{ color: '#EFEED2', fontSize: '1.05rem', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '1.25rem' }}>
              As a proud resident of Artha Grihasta community, you have the additional satisfaction of knowing that an enriching quality of life exists for you and your family in the sylvan surroundings of our layout. We trust that your stay here will be comfortable, enjoyable and memorable.
            </p>
            <div style={{ color: '#E9BB76', fontWeight: 700, fontSize: '0.9rem' }}>
              — Management Committee, Artha Grihasta Layout
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT / FOOTER ─── */}
      <section id="contact" style={{ background: '#031D34', padding: '4rem 2rem 2rem', borderTop: '3px solid #E9BB76' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Building2 size={22} style={{ color: '#E9BB76' }} />
                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#FFF' }}>
                  grihasta<span style={{ color: '#E9BB76' }}>.online</span>
                </span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                A digital management portal exclusively for Artha Grihasta residential layout, Bangalore. Built and owned by the MC Committee.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 style={{ color: '#E9BB76', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>Portal Modules</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Flats & Residents', 'Gate & Security', 'Maintenance & Finance', 'Complaints Helpdesk', 'Amenities Booking'].map(m => (
                  <button key={m} onClick={onEnterPortal} style={{
                    background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem',
                    cursor: 'pointer', textAlign: 'left', padding: 0, transition: 'color 0.15s ease'
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E9BB76')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >{m}</button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: '#E9BB76', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>Contact Management Committee</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                  <Mail size={14} style={{ color: '#E9BB76', flexShrink: 0 }} />
                  mc@grihasta.online
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                  <Phone size={14} style={{ color: '#E9BB76', flexShrink: 0 }} />
                  +91 99000 15844 (Sadish Sugumaran)
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                  <MapPin size={14} style={{ color: '#E9BB76', flexShrink: 0, marginTop: '0.1rem' }} />
                  Artha Grihasta, Varthur, Bangalore
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem'
          }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
              © 2026 grihasta.online · Artha Grihasta Layout · All rights reserved
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
              Annual cost: ~₹14,300/yr · Development: ₹0 (MC Ownership)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
