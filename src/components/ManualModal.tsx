import React, { useState, useEffect } from 'react';
import type { UserRole } from '../types';
import { X, ExternalLink, BookOpen, ShieldCheck, HeartHandshake, PhoneCall, Trash2, Recycle, AlertTriangle, Plus, Check } from 'lucide-react';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  role?: UserRole;
}

interface GuidelineItem {
  id: string;
  title: string;
  detail: string;
  type: 'danger' | 'info' | 'standard';
}

const DEFAULT_GUIDELINES: GuidelineItem[] = [
  { id: 'g-1', title: '🔇 Quiet Hours', detail: '10:00 PM to 06:00 AM daily (No loud music or construction noise).', type: 'standard' },
  { id: 'g-2', title: '🐕 Pet Policy', detail: 'Leash pets inside common area gardens and cleanup after your pets.', type: 'standard' },
  { id: 'g-3', title: '💳 Maintenance Dues', detail: 'Payable quarterly via grihasta.online portal.', type: 'standard' }
];

export const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose, role = 'RESIDENT_OWNER' }) => {
  const [showWasteGuide, setShowWasteGuide] = useState(false);
  const [mcTimeStart, setMcTimeStart] = useState(() => localStorage.getItem('grihasta_waste_start') || '7:30 AM');
  const [mcTimeEnd, setMcTimeEnd] = useState(() => localStorage.getItem('grihasta_waste_end') || '9:00 AM');

  // Custom Guidelines State
  const [guidelines, setGuidelines] = useState<GuidelineItem[]>(() => {
    try {
      const saved = localStorage.getItem('grihasta_guidelines_v1');
      return saved ? JSON.parse(saved) : DEFAULT_GUIDELINES;
    } catch (e) {
      return DEFAULT_GUIDELINES;
    }
  });

  const [isAddingRule, setIsAddingRule] = useState(false);
  const [newRuleTitle, setNewRuleTitle] = useState('');
  const [newRuleDetail, setNewRuleDetail] = useState('');

  const isMcUser = role === 'MC_ADMIN' || role === 'MC_MEMBER';

  useEffect(() => {
    localStorage.setItem('grihasta_waste_start', mcTimeStart);
    localStorage.setItem('grihasta_waste_end', mcTimeEnd);
  }, [mcTimeStart, mcTimeEnd]);

  useEffect(() => {
    localStorage.setItem('grihasta_guidelines_v1', JSON.stringify(guidelines));
  }, [guidelines]);

  if (!isOpen) return null;

  const handleAddGuideline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleTitle || !newRuleDetail) return;
    const newItem: GuidelineItem = {
      id: `g-${Date.now()}`,
      title: newRuleTitle,
      detail: newRuleDetail,
      type: 'standard'
    };
    setGuidelines([...guidelines, newItem]);
    setNewRuleTitle('');
    setNewRuleDetail('');
    setIsAddingRule(false);
  };

  const handleDeleteGuideline = (id: string) => {
    setGuidelines(guidelines.filter(g => g.id !== id));
  };

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

          {/* Key Guidelines Header with MC Controls */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h4 style={{ color: '#0B4769', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={18} /> Key Layout Guidelines & Rules
              </h4>
              {isMcUser && (
                <button
                  type="button"
                  onClick={() => setIsAddingRule(!isAddingRule)}
                  className="btn btn-sm btn-primary"
                  style={{ fontSize: '0.78rem' }}
                >
                  <Plus size={14} /> {isAddingRule ? 'Cancel Form' : 'Add New Guideline Rule'}
                </button>
              )}
            </div>

            {/* MC Add Guideline Form */}
            {isMcUser && isAddingRule && (
              <form onSubmit={handleAddGuideline} style={{ background: '#F0F9FF', border: '1.5px solid #0B4769', padding: '0.85rem', borderRadius: '8px', marginBottom: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <h5 style={{ color: '#0B4769', margin: 0, fontSize: '0.85rem' }}>➕ MC Rule Generator (Add New Guideline)</h5>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.78rem', color: '#031D34' }}>Rule Header / Title (with Emoji)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 🏊 Pool Etiquette / 🛝 Children Playground"
                    className="form-control"
                    style={{ fontSize: '0.82rem', padding: '0.35rem 0.6rem' }}
                    value={newRuleTitle}
                    onChange={(e) => setNewRuleTitle(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.78rem', color: '#031D34' }}>Rule Detail & Description</label>
                  <input
                    type="text"
                    required
                    placeholder="Describe the layout rule clearly..."
                    className="form-control"
                    style={{ fontSize: '0.82rem', padding: '0.35rem 0.6rem' }}
                    value={newRuleDetail}
                    onChange={(e) => setNewRuleDetail(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-sm btn-primary" style={{ marginTop: '0.2rem' }}>
                  <Check size={14} /> Publish Guideline to Manual
                </button>
              </form>
            )}

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

                {/* MC Only Time Range Editor */}
                {isMcUser && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem', padding: '0.35rem 0.6rem', background: '#DCFCE7', borderRadius: '6px', fontSize: '0.75rem', color: '#166534', border: '1px solid #86EFAC' }}>
                    <strong>👑 MC Team Timing Controls:</strong>
                    <input
                      type="text"
                      value={mcTimeStart}
                      onChange={(e) => setMcTimeStart(e.target.value)}
                      style={{ width: '70px', padding: '0.1rem 0.3rem', fontSize: '0.75rem', border: '1px solid #16A34A', borderRadius: '4px' }}
                    />
                    <span>to</span>
                    <input
                      type="text"
                      value={mcTimeEnd}
                      onChange={(e) => setMcTimeEnd(e.target.value)}
                      style={{ width: '70px', padding: '0.1rem 0.3rem', fontSize: '0.75rem', border: '1px solid #16A34A', borderRadius: '4px' }}
                    />
                  </div>
                )}

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

              {/* Dynamic Guidelines List */}
              {guidelines.map((g) => (
                <div key={g.id} style={{ background: '#F8FAFC', padding: '0.65rem 1rem', borderRadius: '4px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{g.title}:</strong> {g.detail}
                  </div>
                  {isMcUser && (
                    <button
                      onClick={() => handleDeleteGuideline(g.id)}
                      title="Remove Guideline (MC Admin)"
                      style={{ background: 'none', border: 'none', color: '#991B1B', cursor: 'pointer', padding: '0.2rem', marginLeft: '0.5rem' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
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
        </div>
      </div>
    </div>
  );
};


