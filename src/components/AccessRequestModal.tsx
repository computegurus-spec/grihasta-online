import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCircle2, User, Phone, Home, FileText, MapPin } from 'lucide-react';
import { DbConnector } from '../services/dbConnector';
import { getLaneForVillaNumber } from '../utils/laneMapping';
import type { UserRole } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessRequestModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [laneNumber, setLaneNumber] = useState('Lane 1');
  const [villaNumber, setVillaNumber] = useState('');
  const [occupancyType, setOccupancyType] = useState<'Owner' | 'Tenant'>('Owner');
  const [requestedRole, setRequestedRole] = useState<UserRole>('RESIDENT_OWNER');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || !villaNumber || !laneNumber) return;

    DbConnector.submitMcApprovalRequest({
      name,
      mobile,
      laneNumber,
      villaNumber,
      occupancyType,
      requestedRole
    });

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setMobile('');
    setLaneNumber('Lane 1');
    setVillaNumber('');
    setNotes('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleResetAndClose}>
      <div className="modal-content" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldCheck size={22} style={{ color: '#E9BB76' }} />
            <h3>Request Grihasta Portal Access</h3>
          </div>
          <button onClick={handleResetAndClose} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <CheckCircle2 size={54} style={{ color: '#16A34A' }} />
              <h3 style={{ color: '#031D34' }}>Access Request Submitted!</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', maxWidth: '420px', lineHeight: 1.5 }}>
                Thank you, <strong>{name}</strong>. Your verification request for <strong>{laneNumber} — Villa #{villaNumber}</strong> has been routed to the Grihasta Management Committee (MC).
              </p>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '0.85rem 1rem', fontSize: '0.85rem', color: '#166534', width: '100%' }}>
                ⚡ An MC Member will review your details and approve your portal role shortly. You will receive an SMS notification upon approval.
              </div>
              <button onClick={handleResetAndClose} className="btn btn-primary" style={{ marginTop: '0.5rem', minWidth: '160px' }}>
                Done & Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ background: '#E0F2FE', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #7DD3FC', fontSize: '0.85rem', color: '#075985' }}>
                📝 <strong>MC Verification Flow:</strong> Submit your resident details below including your explicit Lane Number. Existing Management Committee (MC) members will verify your details and approve your account.
              </div>

              {/* Name & Mobile */}
              <div className="grid-2" style={{ gap: '0.85rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label><User size={14} style={{ display: 'inline', marginRight: '4px' }} /> Full Resident Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label><Phone size={14} style={{ display: 'inline', marginRight: '4px' }} /> Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    className="form-control"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </div>

              {/* Lane Number & Villa Number */}
              <div className="grid-2" style={{ gap: '0.85rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} /> Select Lane Number *</label>
                  <select
                    className="form-control"
                    value={laneNumber}
                    onChange={(e) => setLaneNumber(e.target.value)}
                    required
                  >
                    {Array.from({ length: 15 }, (_, i) => `Lane ${i + 1}`).map((lane, i) => (
                      <option key={lane} value={lane}>
                        {lane} {lane === 'Lane 15' ? '(Plots 351–400)' : `(Plots ${i * 25 + 1}–${(i + 1) * 25})`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label><Home size={14} style={{ display: 'inline', marginRight: '4px' }} /> Villa / Plot Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Plot 42 or Villa 306"
                    className="form-control"
                    value={villaNumber}
                    onChange={(e) => {
                      const val = e.target.value;
                      setVillaNumber(val);
                      if (val) {
                        const autoLane = getLaneForVillaNumber(val);
                        setLaneNumber(autoLane);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Occupancy & Requested Role */}
              <div className="grid-2" style={{ gap: '0.85rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Occupancy Status *</label>
                  <select
                    className="form-control"
                    value={occupancyType}
                    onChange={(e) => {
                      const val = e.target.value as 'Owner' | 'Tenant';
                      setOccupancyType(val);
                      if (val === 'Owner') setRequestedRole('RESIDENT_OWNER');
                      else setRequestedRole('RESIDENT_TENANT');
                    }}
                  >
                    <option value="Owner">Villa Owner (Owner Occupied)</option>
                    <option value="Tenant">Resident Tenant (Rented)</option>
                  </select>
                </div>

                {/* Requested Role */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Requested Portal Role Access</label>
                  <select
                    className="form-control"
                    value={requestedRole}
                    onChange={(e) => setRequestedRole(e.target.value as UserRole)}
                  >
                    <option value="RESIDENT_OWNER">🏡 Resident Owner (Standard Owner Access)</option>
                    <option value="RESIDENT_TENANT">🔑 Resident Tenant (Standard Tenant Access)</option>
                    <option value="MC_MEMBER">👑 MC Committee Member (Requires MC Super Admin Approval)</option>
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label><FileText size={14} style={{ display: 'inline', marginRight: '4px' }} /> Additional Notes / Verification Details (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Moved into Plot 42 in Jan 2026, registered with MC office"
                  className="form-control"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={handleResetAndClose} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: 800 }}>
                  <Send size={15} /> Submit Request to MC
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
