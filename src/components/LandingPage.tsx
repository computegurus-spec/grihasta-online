import React, { useState, useEffect } from 'react';
import {
  Shield, Home, Wallet, Wrench, Calendar, Bell, Users, BarChart3, HeartHandshake,
  ArrowRight, Building2, TreePine, CheckCircle, Phone, Mail, MapPin, ChevronDown,
  Leaf, Star, Sun, Expand
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

  const projectFacts = [
    { label: 'Developer', value: 'Artha Group' },
    { label: 'Total Area', value: '40 Acres' },
    { label: 'Total Units', value: '400 Villas' },
    { label: 'Status', value: 'Ready to Move' },
    { label: 'Launched', value: 'April 2011' },
    { label: 'Possession', value: 'August 2016' },
    { label: 'Rating', value: '3.9 / 5 ⭐ (MagicBricks)' },
  ];

  const villaConfigs = [
    { type: '1 BHK Villa', size: '1,446 Sq.Ft.', desc: 'Compact, cosy single-bedroom villa ideal for individuals or young couples' },
    { type: '2 BHK Villa', size: '1,044 – 1,147 Sq.Ft.', desc: 'Well-designed two-bedroom homes with spacious balconies' },
    { type: '3 BHK Villa', size: '2,000+ Sq.Ft.', desc: 'Spacious family homes with open living and dining areas' },
    { type: '4 BHK Villa', size: '2,540 Sq.Ft.', desc: 'Large luxury villas with ample space for extended families' },
  ];

  const amenities = [
    { icon: '🏊', title: 'Swimming Pool', desc: '25-metre lap pool with kids wading section and changing rooms' },
    { icon: '🏸', title: 'Badminton Courts', desc: 'Indoor wooden floor courts with LED spotlighting' },
    { icon: '🏋️', title: 'Fully Equipped Gym', desc: 'Treadmills, ellipticals, free weights & multi-gym' },
    { icon: '🎉', title: 'Party Hall', desc: 'Air-conditioned hall for 120 guests with audio system & pantry' },
    { icon: '🌳', title: 'Landscaped Gardens', desc: 'Lush greens, walking paths and sylvan surroundings' },
    { icon: '🛡️', title: '24/7 Gated Security', desc: 'Round-the-clock security guards and digital visitor management' },
  ];

  const communityValues = [
    { icon: <Leaf size={22} style={{ color: '#31532C' }} />, title: 'Sylvan & Green', desc: 'Nestled in Malur's natural greens — a tranquil escape, yet connected to Bangalore' },
    { icon: <Shield size={22} style={{ color: '#0B4769' }} />, title: 'Gated & Secure', desc: 'Digital gate management with visitor passes, delivery tracking and resident-only access' },
    { icon: <Star size={22} style={{ color: '#E9BB76' }} />, title: 'Vibrant Community', desc: 'Events, carpooling groups, interest clubs, resident marketplace — all within the layout' },
    { icon: <Sun size={22} style={{ color: '#1E6B85' }} />, title: 'Modern Infrastructure', desc: 'Underground utilities, BESCOM power, Cauvery water and well-maintained common areas' },
    { icon: <Expand size={22} style={{ color: '#31532C' }} />, title: '40 Acres of Space', desc: '400 villas spread across 40 acres of planned residential development' },
    { icon: <Home size={22} style={{ color: '#E9BB76' }} />, title: 'Ready to Move', desc: 'Fully completed project — possession handed over August 2016. Move in anytime.' },
  ];

  const modules = [
    { icon: Home, num: '01', name: 'Flats & Residents', desc: 'Lane-wise villa directory, resident profiles, domestic help logs' },
    { icon: Shield, num: '02', name: 'Gate & Security', desc: 'Digital visitor log, delivery tracking, pre-approved gate passes' },
    { icon: Wallet, num: '03', name: 'Maintenance & Finance', desc: 'Quarterly dues tracking, payment receipts, expense ledger' },
    { icon: Wrench, num: '04', name: 'Complaints Helpdesk', desc: 'SLA-based ticket system, staff assignment, resident ratings' },
    { icon: Calendar, num: '05', name: 'Amenities Booking', desc: 'Book party hall, pool, gym & courts with real-time availability' },
    { icon: Bell, num: '06', name: 'Notice Board & Polls', desc: 'MC circulars, emergency broadcasts, community voting' },
    { icon: Users, num: '07', name: 'Staff Attendance', desc: 'Guard & housekeeping clock-in/out, payroll summary' },
    { icon: BarChart3, num: '08', name: 'MC Dashboard', desc: 'Executive overview for the Management Committee' },
    { icon: HeartHandshake, num: '09', name: 'Community & Social', desc: 'Neighbour marketplace, lost & found, carpooling, vendor reviews' },
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
        padding: '0.85rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Building2 size={22} style={{ color: '#E9BB76' }} />
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#FFF', letterSpacing: '0.5px' }}>
            Artha Grihasta
          </span>
          <span style={{
            background: 'rgba(233,187,118,0.18)', border: '1px solid rgba(233,187,118,0.35)',
            color: '#E9BB76', fontSize: '0.65rem', fontWeight: 700,
            padding: '0.15rem 0.5rem', borderRadius: '4px', letterSpacing: '0.5px'
          }}>MALUR · KOLAR</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <a href="#about" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>About</a>
          <a href="#villas" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>Villas</a>
          <a href="#amenities" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>Amenities</a>
          <a href="#portal" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>Portal</a>
          <a href="#contact" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>Contact</a>
          <button
            id="landing-resident-login-btn"
            onClick={onEnterPortal}
            style={{
              background: '#E9BB76', color: '#031D34', border: 'none', borderRadius: '8px',
              padding: '0.5rem 1.1rem', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            Resident Login <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #031D34 0%, #0B4769 50%, #1E6B85 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '7rem 2rem 4rem',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Real project photo as background overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url('https://img.staticmb.com/mbimages/project/Photo_h470_w1080/Photo_h310_w462/Project-Photo-31-Artha-Grihasta-Bangalore-5007713_488_1366_310_462_470_1080.jpg')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.18, pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 15% 80%, rgba(49,83,44,0.18) 0%, transparent 55%), radial-gradient(circle at 85% 20%, rgba(233,187,118,0.08) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <TreePine size={15} style={{ color: '#D2E0B0' }} />
            <span style={{ color: '#D2E0B0', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              Gated Villa Community · Malur, Kolar, Karnataka
            </span>
            <TreePine size={15} style={{ color: '#D2E0B0' }} />
          </div>

          <h1 style={{
            color: '#FFFFFF', fontSize: 'clamp(2.8rem, 7vw, 4.5rem)', fontWeight: 900,
            lineHeight: 1.05, marginBottom: '1.1rem', letterSpacing: '-1px'
          }}>
            Artha Grihasta<br />
            <span style={{ color: '#E9BB76', fontSize: '0.55em', fontWeight: 600, letterSpacing: '0px' }}>
              Premium Gated Villa Layout · 40 Acres · 400 Homes
            </span>
          </h1>

          <p style={{ color: '#EFEED2', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '0.85rem', opacity: 0.95, maxWidth: '680px', margin: '0 auto 0.85rem auto' }}>
            A premium gated residential layout by <strong>Artha Group</strong> offering an enriching quality of life for your family — surrounded by natural greens, world-class amenities, and a warm, connected community in the serene surroundings of Malur, Kolar.
          </p>

          <p style={{ color: '#D2E0B0', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '2.5rem', opacity: 0.85, maxWidth: '580px', margin: '0 auto 2.5rem auto' }}>
            Ready to Move · Rated <strong style={{ color: '#E9BB76' }}>3.9★</strong> on MagicBricks
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#villas"
              style={{
                background: '#E9BB76', color: '#031D34', borderRadius: '10px',
                padding: '0.875rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(233,187,118,0.35)', transition: 'all 0.25s ease'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Explore Villas <ChevronDown size={18} />
            </a>

            <a href="#contact" style={{
              background: 'rgba(255,255,255,0.08)', color: '#FFF', border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '10px', padding: '0.875rem 2rem', fontWeight: 600, fontSize: '1rem',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none',
              backdropFilter: 'blur(4px)'
            }}>
              Contact Us <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── PROJECT FACTS STRIP ─── */}
      <section id="about" style={{ background: '#031D34', borderTop: '2px solid rgba(233,187,118,0.3)', padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '0', justifyContent: 'center' }}>
          {projectFacts.map((f, i) => (
            <div key={i} style={{
              padding: '1rem 1.5rem', textAlign: 'center', borderRight: i < projectFacts.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              minWidth: '140px'
            }}>
              <div style={{ color: '#E9BB76', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{f.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHY ARTHA GRIHASTA ─── */}
      <section style={{ background: '#EFEED2', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#1E6B85', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' }}>Why Choose Artha Grihasta</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#031D34', margin: '0.5rem 0 0.75rem' }}>
              Where community meets comfort
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              More than just homes — Artha Grihasta is a thriving neighbourhood on 40 acres of planned green space in Malur, built on trust, shared values and sylvan living.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {communityValues.map((v, i) => (
              <div key={i} style={{
                background: '#FFFFFF', borderRadius: '14px', padding: '1.75rem',
                border: '1px solid rgba(11,71,105,0.07)',
                boxShadow: '0 4px 16px rgba(3,29,52,0.05)', transition: 'transform 0.2s ease'
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ marginBottom: '0.85rem' }}>{v.icon}</div>
                <h3 style={{ color: '#0B4769', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{v.title}</h3>
                <p style={{ color: '#64748B', fontSize: '0.85rem', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VILLA CONFIGURATIONS ─── */}
      <section id="villas" style={{ background: '#031D34', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#E9BB76', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' }}>Villa Configurations</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#FFFFFF', margin: '0.5rem 0 0.75rem' }}>
              Find your perfect home
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              7 villa configurations across 6 layout designs — starting ₹65 Lakhs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {villaConfigs.map((v, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(233,187,118,0.2)',
                borderRadius: '14px', padding: '1.75rem', transition: 'all 0.2s ease'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,107,133,0.25)'; e.currentTarget.style.borderColor = 'rgba(233,187,118,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(233,187,118,0.2)'; }}
              >
                <div style={{ color: '#E9BB76', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{v.type}</div>
                <div style={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem' }}>{v.size}</div>
                {v.price && (
                  <div style={{ color: '#E9BB76', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.6rem' }}>{v.price}</div>
                )}
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.83rem', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(233,187,118,0.08)', border: '1px solid rgba(233,187,118,0.2)',
            borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
          }}>
            <div>
              <div style={{ color: '#E9BB76', fontWeight: 700, fontSize: '0.9rem' }}>📋 Full project brochure & floor plans available</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', marginTop: '0.2rem' }}>Visit MagicBricks for detailed floor plan downloads and payment plans</div>
            </div>
            <a href="https://www.magicbricks.com/artha-grihasta-malur-kolar-pdpid-4d4235303037373133" target="_blank" rel="noopener noreferrer" style={{
              background: '#E9BB76', color: '#031D34', borderRadius: '8px', padding: '0.55rem 1.25rem',
              fontWeight: 800, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem'
            }}>
              View on MagicBricks <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── AMENITIES ─── */}
      <section id="amenities" style={{ background: '#D2E0B0', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#31532C', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' }}>Premium Amenities</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#031D34', margin: '0.5rem 0 0.75rem' }}>
              Everything you need, right here
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.1rem', marginBottom: '2rem' }}>
            {amenities.map((f, i) => (
              <div key={i} style={{
                background: '#FFFFFF', borderRadius: '14px', padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(3,29,52,0.06)', transition: 'transform 0.2s ease',
                display: 'flex', gap: '1rem', alignItems: 'flex-start'
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ fontSize: '2rem', flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <h3 style={{ color: '#031D34', fontWeight: 700, fontSize: '0.975rem', marginBottom: '0.3rem' }}>{f.title}</h3>
                  <p style={{ color: '#64748B', fontSize: '0.83rem', lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {['🌿 Jogging Track', '🚗 Covered Parking', '🔌 Power Backup', '💧 Cauvery Water Supply', '🌱 Composting Area', '🎭 Community Events', '📶 Underground Utilities'].map((a, i) => (
              <span key={i} style={{
                background: '#031D34', color: '#E9BB76', padding: '0.4rem 1rem',
                borderRadius: '20px', fontSize: '0.83rem', fontWeight: 600
              }}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WELCOME QUOTE ─── */}
      <section style={{ background: '#031D34', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', color: '#E9BB76', lineHeight: 1, marginBottom: '1rem', opacity: 0.4 }}>"</div>
          <p style={{
            color: '#EFEED2', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', lineHeight: 1.85,
            fontStyle: 'italic', fontWeight: 400, marginBottom: '1.5rem'
          }}>
            As a proud resident of Artha Grihasta community, you have the additional satisfaction of knowing that an enriching quality of life exists for you and your family in the sylvan surroundings of our layout. We trust that your stay here will be comfortable, enjoyable and memorable.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '2px', background: '#E9BB76', opacity: 0.4 }} />
            <span style={{ color: '#E9BB76', fontWeight: 700, fontSize: '0.875rem' }}>
              Management Committee, Artha Grihasta Layout
            </span>
            <div style={{ width: '40px', height: '2px', background: '#E9BB76', opacity: 0.4 }} />
          </div>
        </div>
      </section>

      {/* ─── RESIDENT PORTAL ─── */}
      <section id="portal" style={{ background: '#EFEED2', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#0B4769', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' }}>For Residents</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#031D34', margin: '0.5rem 0 0.75rem' }}>
              Manage your layout, digitally
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              Artha Grihasta residents enjoy a fully digital management portal — gate, maintenance, amenities, complaints and community — all in one place. No app download needed.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.1rem', marginBottom: '2.5rem' }}>
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} style={{
                  background: '#FFFFFF', border: '1px solid rgba(11,71,105,0.08)', borderRadius: '12px',
                  padding: '1.25rem', cursor: 'pointer', transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(3,29,52,0.04)'
                }}
                  onClick={onEnterPortal}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(11,71,105,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(3,29,52,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <span style={{
                      background: '#031D34', color: '#E9BB76', fontSize: '0.62rem', fontWeight: 800,
                      padding: '0.18rem 0.42rem', borderRadius: '4px', letterSpacing: '0.5px'
                    }}>M{m.num}</span>
                    <Icon size={16} style={{ color: '#0B4769' }} />
                  </div>
                  <h3 style={{ color: '#031D34', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.3rem' }}>{m.name}</h3>
                  <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              id="portal-enter-btn"
              onClick={onEnterPortal}
              style={{
                background: '#031D34', color: '#E9BB76', border: 'none', borderRadius: '10px',
                padding: '0.875rem 2.2rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
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
                <Building2 size={20} style={{ color: '#E9BB76' }} />
                <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#FFF' }}>Artha Grihasta</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                A premium gated villa community by Artha Group in Malur, Kolar, Karnataka. 40 acres · 400 homes · Rated 3.9★.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {['Artha Group', '40 Acres', '400 Villas', 'Ready to Move', 'Malur, Kolar'].map((t, i) => (
                  <span key={i} style={{
                    background: 'rgba(233,187,118,0.1)', border: '1px solid rgba(233,187,118,0.18)',
                    color: '#E9BB76', fontSize: '0.68rem', fontWeight: 600, padding: '0.18rem 0.55rem', borderRadius: '4px'
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 style={{ color: '#E9BB76', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { label: '→ About the Layout', href: '#about' },
                  { label: '→ Villa Configurations', href: '#villas' },
                  { label: '→ Amenities', href: '#amenities' },
                  { label: '→ Resident Portal', href: '#portal' },
                  { label: '→ View on MagicBricks', href: 'https://www.magicbricks.com/artha-grihasta-malur-kolar-pdpid-4d4235303037373133' },
                ].map((l, i) => (
                  <a key={i} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{
                    color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.15s ease'
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E9BB76')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >{l.label}</a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: '#E9BB76', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Management Committee</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem' }}>
                  <Mail size={13} style={{ color: '#E9BB76', flexShrink: 0 }} />
                  mc@grihasta.online
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem' }}>
                  <Phone size={13} style={{ color: '#E9BB76', flexShrink: 0 }} />
                  +91 99000 15844
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem' }}>
                  <MapPin size={13} style={{ color: '#E9BB76', flexShrink: 0, marginTop: '0.1rem' }} />
                  Sonnur, Alamabdi PO, Malur Taluk, Kolar, Karnataka 563160
                </div>
              </div>
              <button onClick={onEnterPortal} style={{
                background: 'rgba(233,187,118,0.12)', border: '1px solid rgba(233,187,118,0.3)',
                color: '#E9BB76', borderRadius: '8px', padding: '0.5rem 1.1rem',
                fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem'
              }}>
                Resident Login <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.5rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem'
          }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>
              © 2026 Artha Grihasta · grihasta.online · Malur, Kolar, Karnataka
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={11} style={{ color: '#31532C' }} />
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>Portal managed by resident Management Committee</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
