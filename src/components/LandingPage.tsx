import React, { useState, useEffect } from 'react';
import {
  Shield, Home, Wallet, Wrench, Calendar, Bell, Users, BarChart3, HeartHandshake,
  ArrowRight, Building2, TreePine, CheckCircle, Phone, Mail, MapPin, ChevronDown,
  Leaf, Star, Sun
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

  const lifestyleFeatures = [
    { icon: '🏊', title: 'Swimming Pool', desc: '25-metre lap pool with kids wading section and changing rooms' },
    { icon: '🏸', title: 'Badminton Courts', desc: 'Indoor wooden floor courts with LED spotlighting — available morning to night' },
    { icon: '🏋️', title: 'Fully Equipped Gym', desc: 'Treadmills, ellipticals, free weights & multi-gym for daily fitness' },
    { icon: '🎉', title: 'Party Hall', desc: 'Air-conditioned hall for 120 guests with audio system and pantry' },
    { icon: '🌳', title: 'Landscaped Gardens', desc: 'Lush greens, walking paths and sylvan surroundings throughout the layout' },
    { icon: '🛡️', title: '24/7 Gated Security', desc: 'Round-the-clock security guards and digital visitor management at the gate' },
  ];

  const communityValues = [
    { icon: <Leaf size={22} style={{ color: '#31532C' }} />, title: 'Sylvan Living', desc: 'Nestled in the natural greens of Varthur, Bangalore — a tranquil escape from city chaos' },
    { icon: <Shield size={22} style={{ color: '#0B4769' }} />, title: 'Safe & Secure', desc: 'Gated entry with digital visitor passes, delivery tracking, and resident-only access' },
    { icon: <Star size={22} style={{ color: '#E9BB76' }} />, title: 'Vibrant Community', desc: 'An active neighbourhood with events, carpooling groups, interest clubs and a resident marketplace' },
    { icon: <Sun size={22} style={{ color: '#1E6B85' }} />, title: 'Modern Infrastructure', desc: 'Underground utilities, BESCOM power, Cauvery water, and well-maintained common areas' },
  ];

  const modules = [
    { icon: Home, num: '01', name: 'Flats & Residents', desc: 'Lane-wise villa directory, resident profiles, domestic help logs' },
    { icon: Shield, num: '02', name: 'Gate & Security', desc: 'Digital visitor log, delivery tracking, pre-approved gate passes' },
    { icon: Wallet, num: '03', name: 'Maintenance & Finance', desc: 'Quarterly dues tracking, payment receipts, expense ledger transparency' },
    { icon: Wrench, num: '04', name: 'Complaints Helpdesk', desc: 'SLA-based ticket system, staff assignment, resident ratings' },
    { icon: Calendar, num: '05', name: 'Amenities Booking', desc: 'Reserve party hall, pool, gym & courts with real-time conflict detection' },
    { icon: Bell, num: '06', name: 'Notice Board & Polls', desc: 'MC circulars, emergency broadcasts, community voting polls' },
    { icon: Users, num: '07', name: 'Staff Attendance', desc: 'Guard & housekeeping clock-in/out, payroll summary reports' },
    { icon: BarChart3, num: '08', name: 'MC Dashboard', desc: 'Executive overview for the Management Committee leadership' },
    { icon: HeartHandshake, num: '09', name: 'Community & Social', desc: 'Neighbour marketplace, lost & found, carpooling, vendor recommendations' },
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <a href="#lifestyle" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.875rem' }}>Lifestyle</a>
          <a href="#amenities" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.875rem' }}>Amenities</a>
          <a href="#portal" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.875rem' }}>Portal</a>
          <a href="#contact" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.875rem' }}>Contact</a>
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
            Resident Login <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #031D34 0%, #0B4769 55%, #1E6B85 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '7rem 2rem 5rem',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 15% 85%, rgba(49,83,44,0.15) 0%, transparent 55%), radial-gradient(circle at 85% 15%, rgba(233,187,118,0.07) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <TreePine size={16} style={{ color: '#D2E0B0' }} />
            <span style={{ color: '#D2E0B0', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
              Gated Residential Community · Varthur, Bangalore
            </span>
            <TreePine size={16} style={{ color: '#D2E0B0' }} />
          </div>

          <h1 style={{
            color: '#FFFFFF', fontSize: 'clamp(2.6rem, 7vw, 4.5rem)', fontWeight: 900,
            lineHeight: 1.08, marginBottom: '1.25rem', letterSpacing: '-1px'
          }}>
            Live the Sylvan Life at<br />
            <span style={{ color: '#E9BB76' }}>Artha Grihasta</span>
          </h1>

          <p style={{ color: '#EFEED2', fontSize: '1.15rem', lineHeight: 1.75, marginBottom: '0.85rem', opacity: 0.95, maxWidth: '680px', margin: '0 auto 0.85rem auto' }}>
            A premium gated residential layout offering an enriching quality of life for your family — surrounded by natural greens, modern amenities, and a warm, connected community.
          </p>

          <p style={{ color: '#D2E0B0', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '2.75rem', opacity: 0.8, maxWidth: '580px', margin: '0 auto 2.75rem auto' }}>
            Thoughtfully planned across 15 residential lanes with Varthur's serene surroundings as your backdrop.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#amenities"
              style={{
                background: '#E9BB76', color: '#031D34', border: 'none', borderRadius: '10px',
                padding: '0.9rem 2.2rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(233,187,118,0.35)', transition: 'all 0.25s ease'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Explore the Layout <ChevronDown size={18} />
            </a>

            <a href="#contact" style={{
              background: 'rgba(255,255,255,0.1)', color: '#FFF', border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '10px', padding: '0.9rem 2.2rem', fontWeight: 600, fontSize: '1rem',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none',
              backdropFilter: 'blur(4px)'
            }}>
              Contact MC <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY VALUES ─── */}
      <section id="lifestyle" style={{ background: '#EFEED2', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#1E6B85', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Why Artha Grihasta</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#031D34', margin: '0.5rem 0 0.75rem' }}>
              Where community meets comfort
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              More than just homes — Artha Grihasta is a thriving neighbourhood built on trust, shared values, and a love for sylvan living.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {communityValues.map((v, i) => (
              <div key={i} style={{
                background: '#FFFFFF', borderRadius: '16px', padding: '1.85rem',
                border: '1px solid rgba(11,71,105,0.07)',
                boxShadow: '0 4px 20px rgba(3,29,52,0.05)', transition: 'transform 0.2s ease'
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ marginBottom: '0.85rem' }}>{v.icon}</div>
                <h3 style={{ color: '#0B4769', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>{v.title}</h3>
                <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AMENITIES ─── */}
      <section id="amenities" style={{ background: '#031D34', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#E9BB76', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Premium Amenities</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#FFFFFF', margin: '0.5rem 0 0.75rem' }}>
              Everything you need, right here
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              World-class facilities within a gated community — designed for active, comfortable family living.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
            {lifestyleFeatures.map((f, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px', padding: '1.5rem', transition: 'all 0.2s ease'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,107,133,0.2)'; e.currentTarget.style.borderColor = 'rgba(233,187,118,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{f.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Additional amenity chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {['🌿 Jogging Track', '🚗 Covered Parking', '🔌 Power Backup', '💧 Cauvery Water', '🌱 Organic Composting Area', '🎭 Community Events'].map((a, i) => (
              <span key={i} style={{
                background: 'rgba(233,187,118,0.12)', border: '1px solid rgba(233,187,118,0.25)',
                color: '#E9BB76', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600
              }}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WELCOME LETTER QUOTE ─── */}
      <section style={{ background: '#D2E0B0', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', color: '#31532C', lineHeight: 1, marginBottom: '1rem', opacity: 0.4 }}>"</div>
          <p style={{
            color: '#031D34', fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)', lineHeight: 1.85,
            fontStyle: 'italic', fontWeight: 500, marginBottom: '1.5rem'
          }}>
            As a proud resident of Artha Grihasta community, you have the additional satisfaction of knowing that an enriching quality of life exists for you and your family in the sylvan surroundings of our layout. We trust that your stay here will be comfortable, enjoyable and memorable.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '2px', background: '#31532C', opacity: 0.5 }} />
            <span style={{ color: '#31532C', fontWeight: 700, fontSize: '0.9rem' }}>
              Management Committee, Artha Grihasta Layout
            </span>
            <div style={{ width: '40px', height: '2px', background: '#31532C', opacity: 0.5 }} />
          </div>
        </div>
      </section>

      {/* ─── RESIDENT PORTAL SECTION ─── */}
      <section id="portal" style={{ background: '#EFEED2', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#0B4769', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>For Residents</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#031D34', margin: '0.5rem 0 0.75rem' }}>
              Manage your layout, digitally
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              Residents get access to a fully digital management portal — no app download needed, works right in your browser.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.1rem', marginBottom: '2.5rem' }}>
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} style={{
                  background: '#FFFFFF', border: '1px solid rgba(11,71,105,0.08)', borderRadius: '14px',
                  padding: '1.35rem', cursor: 'pointer', transition: 'all 0.2s ease',
                  boxShadow: '0 2px 10px rgba(3,29,52,0.04)'
                }}
                  onClick={onEnterPortal}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(11,71,105,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(3,29,52,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
                    <span style={{
                      background: '#031D34', color: '#E9BB76', fontSize: '0.65rem', fontWeight: 800,
                      padding: '0.2rem 0.45rem', borderRadius: '4px', letterSpacing: '0.5px'
                    }}>M{m.num}</span>
                    <Icon size={17} style={{ color: '#0B4769' }} />
                  </div>
                  <h3 style={{ color: '#031D34', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>{m.name}</h3>
                  <p style={{ color: '#64748B', fontSize: '0.82rem', lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              id="modules-enter-portal-btn"
              onClick={onEnterPortal}
              style={{
                background: '#031D34', color: '#E9BB76', border: '2px solid #031D34', borderRadius: '10px',
                padding: '0.9rem 2.2rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0B4769'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#031D34'; }}
            >
              Enter Resident Portal <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── CONTACT / FOOTER ─── */}
      <section id="contact" style={{ background: '#031D34', padding: '4.5rem 2rem 2rem', borderTop: '4px solid #E9BB76' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Building2 size={22} style={{ color: '#E9BB76' }} />
                <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#FFF' }}>
                  Artha Grihasta
                </span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.75 }}>
                A premium gated residential layout in Varthur, Bangalore. A thriving community of homeowners enjoying a sylvan quality of life.
              </p>
              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Gated Layout', 'Varthur, Blr', '15 Lanes', 'Sylvan Community'].map((t, i) => (
                  <span key={i} style={{
                    background: 'rgba(233,187,118,0.1)', border: '1px solid rgba(233,187,118,0.2)',
                    color: '#E9BB76', fontSize: '0.72rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '4px'
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 style={{ color: '#E9BB76', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { label: '→ Lifestyle & Amenities', href: '#amenities' },
                  { label: '→ Community Values', href: '#lifestyle' },
                  { label: '→ Resident Portal', href: '#portal' },
                  { label: '→ Contact Management Committee', href: '#contact' },
                ].map((l, i) => (
                  <a key={i} href={l.href} style={{
                    color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.15s ease'
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E9BB76')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >{l.label}</a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: '#E9BB76', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Management Committee</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                  <Mail size={14} style={{ color: '#E9BB76', flexShrink: 0 }} />
                  mc@grihasta.online
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                  <Phone size={14} style={{ color: '#E9BB76', flexShrink: 0 }} />
                  +91 99000 15844
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                  <MapPin size={14} style={{ color: '#E9BB76', flexShrink: 0, marginTop: '0.1rem' }} />
                  Artha Grihasta, Varthur Road, Bangalore, Karnataka
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <button
                  onClick={onEnterPortal}
                  style={{
                    background: 'rgba(233,187,118,0.12)', border: '1px solid rgba(233,187,118,0.3)',
                    color: '#E9BB76', borderRadius: '8px', padding: '0.55rem 1.2rem',
                    fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
                  }}
                >
                  Resident Login <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem'
          }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
              © 2026 Artha Grihasta Layout · grihasta.online · All rights reserved
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={12} style={{ color: '#31532C' }} />
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>Resident portal secured & MC-managed</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
