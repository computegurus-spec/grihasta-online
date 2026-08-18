import React, { useState } from 'react';
import { X, ExternalLink, BookOpen, ShieldCheck, HeartHandshake, PhoneCall, Info, Trash2, Recycle, AlertTriangle, MessageSquarePlus } from 'lucide-react';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose }) => {
  const [showWasteGuide, setShowWasteGuide] = useState(false);
  const [mcTimeStart, setMcTimeStart] = useState('7:30 AM');
  const [mcTimeEnd, setMcTimeEnd] = useState('9:00 AM');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BookOpen size={20} style={{ color: '#E9BB76' }} />
            <h3>Grihasta Resident Manual & Community Bylaws</h3>
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

          {/* Key Guidelines */}
          <div>
            <h4 style={{ color: '#0B4769', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} /> Key Layout Guidelines & Rules
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              {/* Vehicle Parking */}
              <div style={{ background: '#FFF5F5', borderLeft: '4px solid #E53E3E', padding: '0.75rem 1rem', borderRadius: '4px' }}>
                <strong style={{ color: '#9B2C2C' }}>🚗 Vehicle Parking:</strong>
                <p style={{ color: '#2D3748', marginTop: '0.2rem', fontSize: '0.85rem' }}>
                  Park vehicles strictly inside designated villa/flat slots or designated visitor bays. <strong>No parking on main layout driveways or main entrance road</strong> (main road parking is strictly prohibited as vehicle density is increasing).
                </p>
              </div>

              {/* Waste Management */}
              <div style={{ background: '#F0FDF4', borderLeft: '4px solid #16A34A', padding: '0.75rem 1rem', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <strong style={{ color: '#15803D' }}>♻️ Waste Management & Segregation:</strong>
                  <button
                    type="button"
                    onClick={() => setShowWasteGuide(!showWasteGuide)}
                    className="btn btn-sm btn-outline"
                    style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
                  >
                    {showWasteGuide ? 'Hide Waste Guide ▲' : 'View Segregation List & Govt Site ▼'}
                  </button>
                </div>
                <p style={{ color: '#2D3748', marginTop: '0.25rem', fontSize: '0.85rem' }}>
                  Segregate dry and wet waste at source. Collection timing: <strong>between {mcTimeStart} and {mcTimeEnd} daily</strong>.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem', fontSize: '0.75rem', color: '#64748B' }}>
                  <span>Adjust Collection Slot Display:</span>
                  <input
                    type="text"
                    value={mcTimeStart}
                    onChange={(e) => setMcTimeStart(e.target.value)}
                    style={{ width: '70px', padding: '0.1rem 0.3rem', fontSize: '0.75rem' }}
                  />
                  <span>to</span>
                  <input
                    type="text"
                    value={mcTimeEnd}
                    onChange={(e) => setMcTimeEnd(e.target.value)}
                    style={{ width: '70px', padding: '0.1rem 0.3rem', fontSize: '0.75rem' }}
                  />
                </div>

                {/* Collapsible Waste Segregation Guide */}
                {showWasteGuide && (
                  <div style={{ marginTop: '0.75rem', background: '#FFFFFF', padding: '0.85rem', borderRadius: '6px', border: '1px solid #BBF7D0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <h5 style={{ color: '#166534', margin: 0, fontSize: '0.85rem' }}>📋 Mandatory Waste Segregation Categories</h5>
                    <div className="grid-3" style={{ gap: '0.5rem', fontSize: '0.78rem' }}>
                      <div style={{ background: '#DCFCE7', padding: '0.5rem', borderRadius: '4px', border: '1px solid #86EFAC' }}>
                        <strong style={{ color: '#166534', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Trash2 size={12} /> Green Bin (Wet Waste)</strong>
                        <ul style={{ paddingLeft: '1rem', marginTop: '0.25rem', color: '#14532D' }}>
                          <li>Kitchen waste & food scraps</li>
                          <li>Vegetable & fruit peels</li>
                          <li>Tea leaves & coffee grounds</li>
                          <li>Garden leaves & flowers</li>
                        </ul>
                      </div>

                      <div style={{ background: '#E0F2FE', padding: '0.5rem', borderRadius: '4px', border: '1px solid #7DD3FC' }}>
                        <strong style={{ color: '#075985', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Recycle size={12} /> Blue Bin (Dry Waste)</strong>
                        <ul style={{ paddingLeft: '1rem', marginTop: '0.25rem', color: '#0C4A6E' }}>
                          <li>Paper, boxes & cardboard</li>
                          <li>Clean plastic wrappers & bottles</li>
                          <li>Milk covers (rinsed & dried)</li>
                          <li>Glass bottles & metal tins</li>
                        </ul>
                      </div>

                      <div style={{ background: '#FEE2E2', padding: '0.5rem', borderRadius: '4px', border: '1px solid #FCA5A5' }}>
                        <strong style={{ color: '#991B1B', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><AlertTriangle size={12} /> Red Bin (E-Waste & Domestic Hazardous)</strong>
                        <ul style={{ paddingLeft: '1rem', marginTop: '0.25rem', color: '#7F1D1D' }}>
                          <li>Batteries & CFL bulbs</li>
                          <li>Expired medicines & band-aids</li>
                          <li>Electronic cables & components</li>
                          <li>Sanitary waste (wrapped securely)</li>
                        </ul>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#475569' }}>Official Government Solid Waste Management Portal:</span>
                      <a
                        href="https://swachhbharatmission.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                      >
                        Govt Waste Guidelines <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Standard Rules */}
              <div style={{ background: '#F8FAFC', padding: '0.65rem 1rem', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                <strong>🔇 Quiet Hours:</strong> 10:00 PM to 06:00 AM daily (No loud music or construction noise).
              </div>
              <div style={{ background: '#F8FAFC', padding: '0.65rem 1rem', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                <strong>🐕 Pet Policy:</strong> Leash pets inside common area gardens and cleanup after your pets.
              </div>
              <div style={{ background: '#F8FAFC', padding: '0.65rem 1rem', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                <strong>💳 Maintenance Dues:</strong> Payable quarterly via grihasta.online portal.
              </div>
            </div>
          </div>

          {/* MC Members Guideline Discussion Note Callout */}
          <div style={{ background: '#FEF3C7', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #F59E0B', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <MessageSquarePlus size={20} style={{ color: '#D97706', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h5 style={{ color: '#92400E', margin: 0, fontSize: '0.88rem' }}>MC Member Guidelines Discussion Note</h5>
              <p style={{ fontSize: '0.82rem', color: '#78350F', marginTop: '0.2rem' }}>
                We can add more items to this post after discussing with other MC members during monthly meetings. If you have rule suggestions or policy queries, submit them to the MC helpdesk.
              </p>
            </div>
          </div>

          {/* Important Contacts */}
          <div>
            <h4 style={{ color: '#0B4769', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <PhoneCall size={16} /> Layout Security & MC Contacts
            </h4>
            <div className="grid-2" style={{ gap: '0.75rem' }}>
              <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>MAIN SECURITY GATE (FRONT)</span>
                <p style={{ fontWeight: 700, color: '#031D34' }}>+91 99000 15844 / Ext 100</p>
              </div>
              <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>BACK GATE (NEAR WATER TANK)</span>
                <p style={{ fontWeight: 700, color: '#031D34' }}>+91 99000 15845 / Ext 101</p>
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

