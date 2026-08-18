import { useState } from 'react';
import type { UserRole } from './types';
import { Navbar } from './components/Navbar';
import { ManualModal } from './components/ManualModal';
import { LandingPage } from './components/LandingPage';

// Module Components
import { Module01_Flats } from './components/Module01_Flats';
import { Module02_Gate } from './components/Module02_Gate';
import { Module03_Finance } from './components/Module03_Finance';
import { Module04_Helpdesk } from './components/Module04_Helpdesk';
import { Module05_Amenities } from './components/Module05_Amenities';
import { Module06_Communication } from './components/Module06_Communication';
import { Module07_Staff } from './components/Module07_Staff';
import { Module08_AdminDashboard } from './components/Module08_AdminDashboard';
import { Module09_CommunitySocial } from './components/Module09_CommunitySocial';

import { TreePine, BookOpen, ExternalLink } from 'lucide-react';

export function App() {
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [activeRole, setActiveRole] = useState<UserRole>('MC_ADMIN');
  const [activeModule, setActiveModule] = useState<number>(1);
  const [isManualOpen, setIsManualOpen] = useState<boolean>(false);

  // Show landing page first
  if (showLanding) {
    return (
      <>
        <LandingPage onEnterPortal={() => setShowLanding(false)} />
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar & Role Bar */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        onOpenManual={() => setIsManualOpen(true)}
        onGoHome={() => setShowLanding(true)}
      />

      {/* Main Container */}
      <main style={{ flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {/* Layout Hero Visual Header */}
        <div className="hero-banner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ maxWidth: '800px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-amber" style={{ color: '#031D34' }}>
                  <TreePine size={13} /> Sylvan Residential Layout
                </span>
                <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>Community Technology Initiative · August 2026</span>
              </div>

              <h1 style={{ color: '#FFFFFF', fontSize: '2.1rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                Grihasta Residential Layout Management Portal
              </h1>

              <p style={{ fontSize: '1rem', color: '#EFEED2', opacity: 0.9, lineHeight: 1.5 }}>
                A digital portal built for <strong>Grihasta</strong> residents, MC committee, security gate guards, and maintenance staff. No app download required — works on any smartphone or browser.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
              <button
                onClick={() => setIsManualOpen(true)}
                className="btn btn-amber"
                style={{ fontWeight: 700 }}
              >
                <BookOpen size={16} /> Open Resident Manual
              </button>
              <button
                onClick={() => setShowLanding(true)}
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)', borderRadius: '6px', padding: '0.3rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                ← Back to Home Page
              </button>
              <a
                href="https://sites.google.com/view/grihastamanual/home"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#E9BB76', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}
              >
                sites.google.com/view/grihastamanual <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Module Renderer */}
        {activeModule === 1 && <Module01_Flats role={activeRole} />}
        {activeModule === 2 && <Module02_Gate role={activeRole} />}
        {activeModule === 3 && <Module03_Finance role={activeRole} />}
        {activeModule === 4 && <Module04_Helpdesk role={activeRole} />}
        {activeModule === 5 && <Module05_Amenities role={activeRole} />}
        {activeModule === 6 && <Module06_Communication role={activeRole} />}
        {activeModule === 7 && <Module07_Staff role={activeRole} />}
        {activeModule === 8 && <Module08_AdminDashboard />}
        {activeModule === 9 && <Module09_CommunitySocial role={activeRole} />}
      </main>

      {/* Footer */}
      <footer style={{ background: '#031D34', color: '#EFEED2', borderTop: '3px solid #E9BB76', padding: '2rem 1.5rem', marginTop: '2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h3 style={{ color: '#E9BB76', fontSize: '1.2rem', marginBottom: '0.25rem' }}>grihasta.online</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>
              Grihasta Residential Layout · Management Portal
            </p>
          </div>

          <div style={{ fontSize: '0.85rem', textAlign: 'center', opacity: 0.9 }}>
            <div>MC Contact: <strong style={{ color: '#E9BB76' }}>mc@grihasta.online</strong></div>
            <div>Prepared by Sadish Sugumaran (+91 99000 15844)</div>
          </div>

          <div style={{ fontSize: '0.8rem', opacity: 0.7, textAlign: 'right' }}>
            <div>Annual Hosting & Domain: ~₹14,300/yr</div>
            <div>Development Cost: ₹0 (In-house MC Ownership)</div>
          </div>
        </div>
      </footer>

      {/* Resident Manual Modal */}
      <ManualModal isOpen={isManualOpen} onClose={() => setIsManualOpen(false)} />
    </div>
  );
}

export default App;
