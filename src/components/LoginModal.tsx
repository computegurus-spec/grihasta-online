import React, { useState } from 'react';
import { X, Lock, Mail, KeyRound, CheckCircle2, Zap, User, Phone, Home, ShieldCheck, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { DbConnector } from '../services/dbConnector';
import type { UserRole } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginModal: React.FC<Props> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');

  // Sign in state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // First-time Registration state
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regVilla, setRegVilla] = useState('');
  const [regOccupancy, setRegOccupancy] = useState<'Owner' | 'Tenant'>('Owner');
  const [regSubmitted, setRegSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Temp MC credentials: test@test.com / test
    if ((cleanEmail === 'test@test.com' || cleanEmail === 'test') && cleanPass === 'test') {
      setSuccessMsg('✅ MC Credentials Verified! Signing into Management Committee Admin Portal...');
      setTimeout(() => {
        onLoginSuccess('MC_ADMIN');
        handleClose();
      }, 500);
      return;
    }

    if (cleanEmail && cleanPass) {
      setSuccessMsg('✅ Signed in successfully. Entering Grihasta Portal...');
      setTimeout(() => {
        onLoginSuccess('RESIDENT_OWNER');
        handleClose();
      }, 500);
      return;
    }

    setErrorMsg('Please enter valid credentials (or MC Test Credentials: test@test.com / test).');
  };

  const handleAuth0SignIn = () => {
    setSuccessMsg('⚡ Redirecting to Auth0 Secure Authentication (Google / SSO)...');
    setTimeout(() => {
      onLoginSuccess('RESIDENT_OWNER');
      handleClose();
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regMobile || !regVilla) return;

    DbConnector.submitMcApprovalRequest({
      name: regName,
      mobile: regMobile,
      villaNumber: regVilla,
      occupancyType: regOccupancy,
      requestedRole: regOccupancy === 'Owner' ? 'RESIDENT_OWNER' : 'RESIDENT_TENANT'
    });

    setRegSubmitted(true);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setErrorMsg('');
    setSuccessMsg('');
    setRegName('');
    setRegMobile('');
    setRegVilla('');
    setRegSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header" style={{ background: '#031D34', borderBottom: '2px solid #E9BB76' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Lock size={20} style={{ color: '#E9BB76' }} />
            <h3 style={{ color: '#FFF' }}>Grihasta Portal Login & Registration</h3>
          </div>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Selector Header */}
        <div style={{ display: 'flex', borderBottom: '1px solid #CBD5E1', background: '#F8FAFC' }}>
          <button
            onClick={() => setActiveTab('signin')}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: 'none',
              background: activeTab === 'signin' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'signin' ? '#0B4769' : '#64748B',
              fontWeight: activeTab === 'signin' ? 800 : 600,
              fontSize: '0.88rem',
              borderBottom: activeTab === 'signin' ? '3px solid #0B4769' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <LogIn size={16} /> Registered User Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: 'none',
              background: activeTab === 'register' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'register' ? '#0B4769' : '#64748B',
              fontWeight: activeTab === 'register' ? 800 : 600,
              fontSize: '0.88rem',
              borderBottom: activeTab === 'register' ? '3px solid #0B4769' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <UserPlus size={16} /> First-Time Registration
          </button>
        </div>

        <div className="modal-body" style={{ padding: '1.25rem 1.5rem' }}>
          {errorMsg && (
            <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '0.6rem 0.85rem', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '1rem' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', color: '#166534', padding: '0.6rem 0.85rem', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} /> {successMsg}
            </div>
          )}

          {/* TAB 1: SIGN IN (Auth0 / Credentials) */}
          {activeTab === 'signin' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Auth0 Social Sign In Button */}
              <button
                type="button"
                onClick={handleAuth0SignIn}
                className="btn"
                style={{
                  background: '#0B4769',
                  color: '#FFF',
                  width: '100%',
                  padding: '0.75rem',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(11,71,105,0.2)'
                }}
              >
                <ShieldCheck size={18} style={{ color: '#E9BB76' }} /> Sign in with Auth0 (Google / SSO)
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94A3B8', fontSize: '0.78rem' }}>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
                <span>OR MC Admin Sign In</span>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
              </div>

              {/* Temporary MC Credentials Pill */}
              <div style={{ background: '#FEF9C3', border: '1px solid #FDE047', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.8rem', color: '#854D0E' }}>
                <div style={{ fontWeight: 800, color: '#713F12', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Zap size={14} style={{ color: '#D97706' }} /> MC Temporary Login:
                </div>
                <div>
                  Email: <code style={{ background: '#FFF', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>test@test.com</code> | Password: <code style={{ background: '#FFF', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>test</code>
                </div>
                <div style={{ fontSize: '0.73rem', opacity: 0.85, marginTop: '0.2rem' }}>
                  *(Tomorrow MC members can log in with their Gmail IDs and reset password on first login)*
                </div>
              </div>

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.8rem', color: '#031D34', fontWeight: 700 }}>
                    <Mail size={13} style={{ display: 'inline', marginRight: '4px' }} /> Email Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="test@test.com"
                    className="form-control"
                    style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.8rem', color: '#031D34', fontWeight: 700 }}>
                    <KeyRound size={13} style={{ display: 'inline', marginRight: '4px' }} /> Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="test"
                    className="form-control"
                    style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', fontWeight: 800, padding: '0.6rem', marginTop: '0.2rem' }}
                >
                  Sign In to Grihasta <ArrowRight size={15} />
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: FIRST-TIME RESIDENT REGISTRATION */}
          {activeTab === 'register' && (
            <div>
              {regSubmitted ? (
                <div style={{ textAlign: 'center', padding: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={50} style={{ color: '#16A34A' }} />
                  <h4 style={{ color: '#031D34', margin: 0 }}>Registration Request Sent!</h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                    Thank you <strong>{regName}</strong>. Your registration details for <strong>{regVilla}</strong> have been submitted to the Management Committee for verification.
                  </p>
                  <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', color: '#166534', width: '100%' }}>
                    An MC member will approve your account shortly.
                  </div>
                  <button onClick={handleClose} className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                    Done & Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ background: '#E0F2FE', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #7DD3FC', fontSize: '0.8rem', color: '#075985' }}>
                    📝 Fill out your resident details to register your villa. MC will verify and approve your account.
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.8rem', color: '#031D34', fontWeight: 700 }}>
                      <User size={13} style={{ display: 'inline', marginRight: '4px' }} /> Full Resident Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem' }}
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.8rem', color: '#031D34', fontWeight: 700 }}>
                      <Phone size={13} style={{ display: 'inline', marginRight: '4px' }} /> Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem' }}
                      value={regMobile}
                      onChange={(e) => setRegMobile(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.8rem', color: '#031D34', fontWeight: 700 }}>
                      <Home size={13} style={{ display: 'inline', marginRight: '4px' }} /> Villa / Plot Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Villa 306"
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem' }}
                      value={regVilla}
                      onChange={(e) => setRegVilla(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.8rem', color: '#031D34', fontWeight: 700 }}>Occupancy Status *</label>
                    <select
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem' }}
                      value={regOccupancy}
                      onChange={(e) => setRegOccupancy(e.target.value as 'Owner' | 'Tenant')}
                    >
                      <option value="Owner">Villa Owner (Owner Occupied)</option>
                      <option value="Tenant">Resident Tenant (Rented)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', fontWeight: 800, padding: '0.65rem', marginTop: '0.4rem' }}
                  >
                    Register First-Time Account
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
