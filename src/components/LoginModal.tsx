import React, { useState } from 'react';
import { X, Lock, Mail, KeyRound, CheckCircle2, Zap, User, Phone, Home, ArrowRight, UserPlus, LogIn, MapPin } from 'lucide-react';
import { DbConnector } from '../services/dbConnector';
import { getLaneForVillaNumber } from '../utils/laneMapping';
import type { UserRole } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginModal: React.FC<Props> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'register' | 'forgot'>('signin');

  // Sign in state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // First-time Registration state
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regLane, setRegLane] = useState('Lane 1');
  const [regVilla, setRegVilla] = useState('');
  const [regOccupancy, setRegOccupancy] = useState<'Owner' | 'Tenant'>('Owner');
  const [regSubmitted, setRegSubmitted] = useState(false);

  // Forgot password request state
  const [resetVilla, setResetVilla] = useState('');
  const [resetMobile, setResetMobile] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMsg('Please enter both Email and Password.');
      return;
    }

    const authRes = DbConnector.verifyAndAuthenticateResident(cleanEmail, cleanPass, 'RESIDENT_OWNER');

    if (authRes.success) {
      setSuccessMsg(authRes.message);
      setTimeout(() => {
        onLoginSuccess(authRes.roleAssigned);
        handleClose();
      }, 400);
    } else {
      setErrorMsg(authRes.message);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regMobile || !regVilla || !regLane || !regPassword) return;

    DbConnector.submitMcApprovalRequest({
      name: regName,
      mobile: regMobile,
      email: regEmail,
      password: regPassword,
      laneNumber: regLane,
      villaNumber: regVilla,
      occupancyType: regOccupancy,
      requestedRole: regOccupancy === 'Owner' ? 'RESIDENT_OWNER' : 'RESIDENT_TENANT',
      requestType: 'Registration'
    });

    setRegSubmitted(true);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetVilla || !resetMobile) return;

    DbConnector.submitMcApprovalRequest({
      name: `Password Reset Request (${resetVilla})`,
      mobile: resetMobile,
      villaNumber: resetVilla,
      occupancyType: 'Owner',
      requestedRole: 'RESIDENT_OWNER',
      requestType: 'PasswordReset'
    });

    setResetSubmitted(true);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setErrorMsg('');
    setSuccessMsg('');
    setRegName('');
    setRegMobile('');
    setRegEmail('');
    setRegPassword('');
    setRegLane('Lane 1');
    setRegVilla('');
    setRegSubmitted(false);
    setResetVilla('');
    setResetMobile('');
    setResetSubmitted(false);
    setActiveTab('signin');
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
            <LogIn size={16} /> Sign In
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
            <UserPlus size={16} /> Register Account
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

          {/* TAB 1: SIGN IN */}
          {activeTab === 'signin' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Credentials Note */}
              <div style={{ background: '#FEF9C3', border: '1px solid #FDE047', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.8rem', color: '#854D0E' }}>
                <div style={{ fontWeight: 800, color: '#713F12', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Zap size={14} style={{ color: '#D97706' }} /> MC Admin Test Login:
                </div>
                <div>
                  Email: <strong>test@test.com</strong> | Password: <strong>test</strong>
                </div>
              </div>

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.8rem', color: '#031D34', fontWeight: 700 }}>
                    <Mail size={13} style={{ display: 'inline', marginRight: '4px' }} /> Email Address or Mobile *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="resident@grihasta.online or test@test.com"
                    className="form-control"
                    style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.8rem', color: '#031D34', fontWeight: 700 }}>
                      <KeyRound size={13} style={{ display: 'inline', marginRight: '4px' }} /> Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveTab('forgot')}
                      style={{ background: 'none', border: 'none', color: '#0B4769', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Enter password"
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
                  <h4 style={{ color: '#031D34', margin: 0 }}>Account Registration Submitted!</h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                    Thank you <strong>{regName}</strong>. Your registration for <strong>{regLane} — {regVilla}</strong> has been submitted to the Management Committee.
                  </p>
                  <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', color: '#166534', width: '100%' }}>
                    An MC member will approve your resident access shortly.
                  </div>
                  <button onClick={handleClose} className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                    Done & Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ background: '#E0F2FE', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #7DD3FC', fontSize: '0.8rem', color: '#075985' }}>
                    📝 Enter your resident details and choose a secure password to register.
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
                      <Mail size={13} style={{ display: 'inline', marginRight: '4px' }} /> Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="resident@example.com"
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem' }}
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.8rem', color: '#031D34', fontWeight: 700 }}>
                      <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} /> Select Lane Number *
                    </label>
                    <select
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem' }}
                      value={regLane}
                      onChange={(e) => setRegLane(e.target.value)}
                      required
                    >
                      {Array.from({ length: 15 }, (_, i) => `Lane ${i + 1}`).map((lane) => (
                        <option key={lane} value={lane}>
                          {lane}
                        </option>
                      ))}
                    </select>
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
                      onChange={(e) => {
                        const val = e.target.value;
                        setRegVilla(val);
                        if (val) {
                          const autoLane = getLaneForVillaNumber(val);
                          setRegLane(autoLane);
                        }
                      }}
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

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.8rem', color: '#031D34', fontWeight: 700 }}>
                      <KeyRound size={13} style={{ display: 'inline', marginRight: '4px' }} /> Choose Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Choose a password"
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem' }}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', fontWeight: 800, padding: '0.65rem', marginTop: '0.4rem' }}
                  >
                    Register Account
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: FORGOT PASSWORD REQUEST */}
          {activeTab === 'forgot' && (
            <div>
              {resetSubmitted ? (
                <div style={{ textAlign: 'center', padding: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={50} style={{ color: '#16A34A' }} />
                  <h4 style={{ color: '#031D34', margin: 0 }}>Reset Request Sent to MC!</h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                    Your password reset request for <strong>{resetVilla}</strong> has been sent to the Management Committee.
                  </p>
                  <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', color: '#166534', width: '100%' }}>
                    An MC member will reset your password to a temporary key (e.g. <code>Grihasta@123</code>).
                  </div>
                  <button onClick={handleClose} className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                    Done & Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ background: '#FEF3C7', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #FCD34D', fontSize: '0.8rem', color: '#92400E' }}>
                    🔑 <strong>Request MC Password Reset:</strong> Enter your Villa Number and Mobile Number below to send a reset request to the MC Committee.
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.8rem', color: '#031D34', fontWeight: 700 }}>
                      <Home size={13} style={{ display: 'inline', marginRight: '4px' }} /> Villa / Plot Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Plot 42 or Villa 306"
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem' }}
                      value={resetVilla}
                      onChange={(e) => setResetVilla(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.8rem', color: '#031D34', fontWeight: 700 }}>
                      <Phone size={13} style={{ display: 'inline', marginRight: '4px' }} /> Registered Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 0.65rem' }}
                      value={resetMobile}
                      onChange={(e) => setResetMobile(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.4rem' }}>
                    <button
                      type="button"
                      onClick={() => setActiveTab('signin')}
                      className="btn btn-secondary"
                      style={{ flex: 1 }}
                    >
                      Back to Sign In
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ flex: 1, fontWeight: 800 }}
                    >
                      Send Reset Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

