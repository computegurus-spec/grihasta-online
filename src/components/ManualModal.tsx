import React from 'react';
import { X, ExternalLink, BookOpen, ShieldCheck, HeartHandshake, PhoneCall, Info } from 'lucide-react';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BookOpen size={20} style={{ color: '#E9BB76' }} />
            <h3>Grihasta Resident Manual</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: 'var(--color-sage-green)', padding: '1rem', borderRadius: '8px', border: '1px solid #31532C' }}>
            <h4 style={{ color: '#31532C', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <HeartHandshake size={18} /> Welcome to Grihasta Community
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
              We are happy to welcome you to <strong>Grihasta</strong> — a vibrant, eco-friendly residential layout community. As a resident, you enjoy a serene quality of life in our sylvan surroundings.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#0B4769', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} /> Key Layout Guidelines & Rules
            </h4>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>Quiet Hours:</strong> 10:00 PM to 06:00 AM daily (No loud music or construction noise).</li>
              <li><strong>Waste Management:</strong> Segregate dry and wet waste at source. Collection timing: 8:00 AM daily.</li>
              <li><strong>Vehicle Parking:</strong> Park vehicles strictly inside designated flat slots or visitor bays. No parking on main layout driveways.</li>
              <li><strong>Pet Policy:</strong> Leash pets inside common area gardens and cleanup after your pets.</li>
              <li><strong>Maintenance Dues:</strong> Payable by the 10th of every month via grihasta.online portal.</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#0B4769', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <PhoneCall size={16} /> Important Layout Contacts
            </h4>
            <div className="grid-2" style={{ gap: '0.75rem' }}>
              <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>MAIN SECURITY GATE</span>
                <p style={{ fontWeight: 700, color: '#031D34' }}>+91 99000 15844 / Ext 100</p>
              </div>
              <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>MC OFFICE / HELP DESK</span>
                <p style={{ fontWeight: 700, color: '#031D34' }}>mc@grihasta.online</p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Info size={14} /> Official Google Site Reference
            </span>
            <a
              href="https://sites.google.com/view/grihastamanual/home"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-secondary"
            >
              Visit Online Site Manual <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
