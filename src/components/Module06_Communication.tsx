import React, { useState } from 'react';
import type { Notice, CommunityPoll, UserRole } from '../types';
import { StorageEngine } from '../services/storage';
import { Bell, AlertOctagon, Vote, Pin, Plus } from 'lucide-react';

interface Props {
  role: UserRole;
}

export const Module06_Communication: React.FC<Props> = ({ role }) => {
  const [notices, setNotices] = useState<Notice[]>(StorageEngine.getNotices());
  const [polls, setPolls] = useState<CommunityPoll[]>(StorageEngine.getPolls());

  // New Notice Modal
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'Official MC' as const,
    content: '',
    isPinned: false,
    isEmergencyBanner: false
  });

  // Active Emergency Broadcast Banner
  const emergencyBanner = notices.find(n => n.isEmergencyBanner);

  const canPost = ['MC_ADMIN', 'MC_MEMBER'].includes(role);

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const dateToday = new Date().toISOString().split('T')[0];
    const nObj: Notice = {
      id: `NTC-${Date.now().toString().slice(-4)}`,
      title: newNotice.title,
      category: newNotice.category,
      content: newNotice.content,
      date: dateToday,
      postedBy: 'Management Committee',
      isPinned: newNotice.isPinned,
      isEmergencyBanner: newNotice.isEmergencyBanner
    };

    const updated = [nObj, ...notices];
    setNotices(updated);
    StorageEngine.saveNotices(updated);
    setIsNoticeModalOpen(false);
  };

  const handleVote = (pollId: string, optionId: string) => {
    const updated = polls.map(p => {
      if (p.id === pollId) {
        const updatedOptions = p.options.map(opt => opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt);
        return {
          ...p,
          options: updatedOptions,
          totalVotes: p.totalVotes + 1
        };
      }
      return p;
    });

    setPolls(updated);
    StorageEngine.savePolls(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Module Banner Header */}
      <div className="card card-sage module-header-banner">
        <div className="module-header-title-group">
          <span className="badge badge-sage">MODULE 06</span>
          <h2>📢 Communication Hub & Notice Board</h2>
          <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
            Official MC circulars, instant emergency broadcasts, layout event calendar, and digital voting polls.
          </p>
        </div>

        {canPost && (
          <div className="module-header-actions">
            <button onClick={() => setIsNoticeModalOpen(true)} className="btn btn-primary">
              <Plus size={16} /> Post Official Circular / Broadcast
            </button>
          </div>
        )}
      </div>

      {/* Emergency Broadcast Banner Alert if present */}
      {emergencyBanner && (
        <div style={{ background: '#991B1B', color: '#FFFFFF', padding: '1rem 1.25rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '2px solid #FCA5A5', boxShadow: '0 4px 12px rgba(153, 27, 27, 0.3)' }}>
          <AlertOctagon size={28} style={{ color: '#FCA5A5' }} />
          <div>
            <div style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', color: '#FCA5A5' }}>
              🚨 EMERGENCY LAYOUT BROADCAST
            </div>
            <strong style={{ fontSize: '1.05rem' }}>{emergencyBanner.title}</strong>
            <p style={{ fontSize: '0.9rem', opacity: 0.95 }}>{emergencyBanner.content}</p>
          </div>
        </div>
      )}

      {/* Two Column Layout: Notices & Polls */}
      <div className="grid-2">
        {/* Notices Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0B4769' }}>
            <Bell size={20} /> Official Notice Board
          </h3>

          {notices.length === 0 ? (
            <div className="card text-center" style={{ padding: '2.5rem 1rem' }}>
              <p style={{ color: '#64748B', fontSize: '0.9rem' }}>No official notices posted yet.</p>
            </div>
          ) : (
            notices.map((n) => (
              <div key={n.id} className="card" style={{ borderLeft: n.isPinned ? '5px solid #E9BB76' : '1px solid rgba(11, 71, 105, 0.12)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span className={`badge ${n.category === 'Official MC' ? 'badge-ocean' : 'badge-sage'}`}>
                    {n.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{n.date} · {n.postedBy}</span>
                </div>

                <h4 style={{ color: '#0B4769', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {n.isPinned && <Pin size={14} style={{ color: '#E9BB76' }} />}
                  {n.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#475569' }}>{n.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Polls & Voting Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0B4769' }}>
            <Vote size={20} /> Community Decision Polls
          </h3>

          {polls.length === 0 ? (
            <div className="card text-center" style={{ padding: '2.5rem 1rem' }}>
              <p style={{ color: '#64748B', fontSize: '0.9rem' }}>No active voting polls at the moment.</p>
            </div>
          ) : (
            polls.map((poll) => (
              <div key={poll.id} className="card">
                <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>ACTIVE LAYOUT POLL</span>
                <h4 style={{ color: '#031D34', marginBottom: '0.75rem' }}>{poll.question}</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {poll.options.map((opt) => {
                    const pct = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                    return (
                      <div key={opt.id} style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.875rem' }}>
                          <span><strong>{opt.text}</strong></span>
                          <span style={{ color: '#0B4769', fontWeight: 700 }}>{opt.votes} votes ({pct}%)</span>
                        </div>
                        
                        <div style={{ background: '#E2E8F0', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.4rem' }}>
                          <div style={{ background: '#1E6B85', width: `${pct}%`, height: '100%', transition: 'width 0.4s ease' }} />
                        </div>

                        <button onClick={() => handleVote(poll.id, opt.id)} className="btn btn-sm btn-outline" style={{ fontSize: '0.75rem', width: '100%' }}>
                          Vote For Option
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.75rem', textAlign: 'right' }}>
                  Total Votes Polled: <strong>{poll.totalVotes}</strong> · Closes {poll.expiresAt}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL: POST NOTICE */}
      {isNoticeModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Post Official Circular / Notice</h3>
              <button onClick={() => setIsNoticeModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handlePostNotice} className="modal-body">
              <div className="form-group">
                <label>Notice Title</label>
                <input
                  type="text"
                  required
                  placeholder="Title of circular"
                  className="form-control"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-control"
                  value={newNotice.category}
                  onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                >
                  <option value="Official MC">Official MC Circular</option>
                  <option value="Emergency Alert">Emergency Alert</option>
                  <option value="Maintenance Schedule">Maintenance Schedule</option>
                  <option value="Community Event">Community Event</option>
                </select>
              </div>

              <div className="form-group">
                <label>Notice Content</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write message content for residents..."
                  className="form-control"
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={newNotice.isPinned}
                    onChange={(e) => setNewNotice({ ...newNotice, isPinned: e.target.checked })}
                  /> Pin to Top of Notice Board
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#991B1B', fontWeight: 700 }}>
                  <input
                    type="checkbox"
                    checked={newNotice.isEmergencyBanner}
                    onChange={(e) => setNewNotice({ ...newNotice, isEmergencyBanner: e.target.checked })}
                  /> Trigger Red Emergency Broadcast Banner
                </label>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                Publish Circular
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
