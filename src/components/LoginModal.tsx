import React, { useState } from 'react';
import { X, Lock, Mail, KeyRound, CheckCircle2, Zap } from 'lucide-react';
import type { UserRole } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginModal: React.FC<Props> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Temporary MC login rule: test@test.com / test
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if ((cleanEmail === 'test@test.com' || cleanEmail === 'test') && cleanPass === 'test') {
      setSuccessMsg('✅ MC Temporary Credentials Accepted! Logging into Management Committee Admin Portal...');
      setTimeout(() => {
        onLoginSuccess('MC_ADMIN');
        handleClose();
      }, 600);
      return;
    }

    if (cleanEmail && cleanPass) {
      setSuccessMsg('✅ Authenticated cleanly. Logging into Grihasta Resident Portal...');
      setTimeout(() => {
        onLoginSuccess('RESIDENT_OWNER');
        handleClose();
      }, 600);
      return;
    }

    setErrorMsg('Please enter valid email and password (or use MC Test Credentials: test@test.com / test).');
  };

  const handleAutoTestMcLogin = () => {
    setEmail('test@test.com');
    setPassword('test');
    setErrorMsg('');
    setSuccessMsg('⚡ Auto-filling MC test credentials (test@test.com / test)...');
    setTimeout(() => {
      onLoginSuccess('MC_ADMIN');
      handleClose();
    }, 500);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setErrorMsg('');
    setSuccessMsg('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ background: '#031D34', borderBottom: '2px solid #E9BB76' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Lock size={20} style={{ color: '#E9BB76' }} />
            <h3 style={{ color: '#FFF' }}>Grihasta Member Login</h3>
          </div>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '1.5rem' }}>
          {/* Temporary MC Test Notice Pill */}
          <div style={{ background: '#FEF9C3', border: '1px solid #FDE047', borderRadius: '8px', padding: '0.75rem 0.9rem', marginBottom: '1.1rem', fontSize: '0.82rem', color: '#854D0E' }}>
            <div style={{ fontWeight: 800, color: '#713F12', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Zap size={15} style={{ color: '#D97706' }} /> Temporary MC Test Credentials:
            </div>
            <div>
              Email: <code style={{ background: '#FFF', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>test@test.com</code><br />
              Password: <code style={{ background: '#FFF', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>test</code>
            </div>
          </div>

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

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontSize: '0.82rem', color: '#031D34', fontWeight: 700 }}>
                <Mail size={14} style={{ display: 'inline', marginRight: '4px' }} /> Email Address / Username
              </label>
              <input
                type="text"
                required
                placeholder="test@test.com"
                className="form-control"
                style={{ fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontSize: '0.82rem', color: '#031D34', fontWeight: 700 }}>
                <KeyRound size={14} style={{ display: 'inline', marginRight: '4px' }} /> Password
              </label>
              <input
                type="password"
                required
                placeholder="test"
                className="form-control"
                style={{ fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', fontWeight: 800, padding: '0.65rem', marginTop: '0.2rem' }}
            >
              Sign In to Portal
            </button>
          </form>

          {/* Quick 1-click Auto Test Login Button */}
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
            <button
              type="button"
              onClick={handleAutoTestMcLogin}
              className="btn btn-amber"
              style={{ width: '100%', fontWeight: 800, fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <Zap size={15} /> 1-Click MC Test Login (test@test.com)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
