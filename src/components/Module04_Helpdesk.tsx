import React, { useState } from 'react';
import type { ComplaintTicket, TicketCategory, UserRole } from '../types';
import { StorageEngine } from '../services/storage';
import { Plus, Star, UserCheck } from 'lucide-react';

interface Props {
  role: UserRole;
}

export const Module04_Helpdesk: React.FC<Props> = ({ role }) => {
  const [tickets, setTickets] = useState<ComplaintTicket[]>(StorageEngine.getTickets());
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  // New Ticket Modal
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState<{
    flatId: string;
    category: TicketCategory;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  }>({
    flatId: 'A-101',
    category: 'Plumbing',
    title: '',
    description: '',
    priority: 'Medium'
  });

  // Assign & Resolve Modal
  const [selectedTicket, setSelectedTicket] = useState<ComplaintTicket | null>(null);
  const [assignStaff, setAssignStaff] = useState('Govind (Plumber)');

  // Rating Modal
  const [ratingTicket, setRatingTicket] = useState<ComplaintTicket | null>(null);
  const [starCount, setStarCount] = useState(5);
  const [feedback, setFeedback] = useState('');

  const flats = StorageEngine.getFlats();

  const filteredTickets = tickets.filter(t => {
    return filterCategory === 'ALL' || t.category === filterCategory;
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const flatObj = flats.find(f => f.id === newTicket.flatId);
    const dateNow = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

    let sla = 24;
    if (newTicket.priority === 'Emergency') sla = 4;
    else if (newTicket.priority === 'High') sla = 12;

    const tkt: ComplaintTicket = {
      id: `TKT-${Date.now().toString().slice(-4)}`,
      flatId: newTicket.flatId,
      residentName: flatObj?.ownerName || 'Resident',
      category: newTicket.category,
      title: newTicket.title,
      description: newTicket.description,
      priority: newTicket.priority,
      status: 'Open',
      createdAt: dateNow,
      updatedAt: dateNow,
      slaHours: sla
    };

    const updated = [tkt, ...tickets];
    setTickets(updated);
    StorageEngine.saveTickets(updated);
    setIsTicketModalOpen(false);
  };

  const handleAssignAndProgress = (newStatus: 'In Progress' | 'Resolved') => {
    if (!selectedTicket) return;
    const dateNow = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
    const updated = tickets.map(t => t.id === selectedTicket.id ? {
      ...t,
      status: newStatus,
      assignedStaff: assignStaff,
      updatedAt: dateNow
    } : t);

    setTickets(updated);
    StorageEngine.saveTickets(updated);
    setSelectedTicket(null);
  };

  const handleSaveRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ratingTicket) return;

    const updated = tickets.map(t => t.id === ratingTicket.id ? {
      ...t,
      rating: starCount,
      feedbackComment: feedback
    } : t);

    setTickets(updated);
    StorageEngine.saveTickets(updated);
    setRatingTicket(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Banner */}
      <div className="card card-sage" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-sage" style={{ marginBottom: '0.4rem' }}>MODULE 04</span>
          <h2>🔧 Complaints & Helpdesk Resolution</h2>
          <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
            Structured ticket assignment, SLA countdowns, status progression, and 1–5 star resident ratings.
          </p>
        </div>

        <button onClick={() => setIsTicketModalOpen(true)} className="btn btn-primary">
          <Plus size={16} /> Raise Helpdesk Ticket
        </button>
      </div>

      {/* Filter categories */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Category:</span>
        {['ALL', 'Electrical', 'Plumbing', 'Security', 'Cleanliness', 'Gardening', 'Lift/Infrastructure', 'General'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-outline'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Ticket Cards */}
      <div className="grid-2">
        {filteredTickets.map((tkt) => (
          <div key={tkt.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-ocean">{tkt.flatId}</span>
                <span className="badge badge-sage">{tkt.category}</span>
              </div>
              <span className={`badge ${tkt.status === 'Resolved' ? 'badge-paid' : tkt.status === 'In Progress' ? 'badge-amber' : 'badge-overdue'}`}>
                {tkt.status}
              </span>
            </div>

            <div>
              <h4 style={{ color: '#0B4769', marginBottom: '0.25rem' }}>{tkt.title}</h4>
              <p style={{ fontSize: '0.875rem', color: '#475569' }}>{tkt.description}</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div><strong>Raised by:</strong> {tkt.residentName} ({tkt.createdAt})</div>
              {tkt.assignedStaff && <div><strong>Assigned To:</strong> {tkt.assignedStaff}</div>}
              <div><strong>SLA Target:</strong> {tkt.slaHours} Hours Priority ({tkt.priority})</div>
            </div>

            {/* Resident Rating Review */}
            {tkt.status === 'Resolved' && (
              <div style={{ background: '#FEF9C3', padding: '0.75rem', borderRadius: '8px', border: '1px solid #FDE047' }}>
                {tkt.rating ? (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#B45309' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < tkt.rating! ? '#F59E0B' : 'none'} color="#F59E0B" />
                      ))}
                      <strong style={{ marginLeft: '0.4rem' }}>{tkt.rating}/5 Rating</strong>
                    </div>
                    {tkt.feedbackComment && <p style={{ fontSize: '0.8rem', fontStyle: 'italic', marginTop: '0.25rem' }}>"{tkt.feedbackComment}"</p>}
                  </div>
                ) : (
                  <button onClick={() => setRatingTicket(tkt)} className="btn btn-sm btn-amber" style={{ width: '100%' }}>
                    <Star size={14} /> Rate Resolution Service
                  </button>
                )}
              </div>
            )}

            {/* Action buttons */}
            {['MC_ADMIN', 'MC_MEMBER', 'MAINTENANCE_STAFF'].includes(role) && tkt.status !== 'Resolved' && (
              <button onClick={() => setSelectedTicket(tkt)} className="btn btn-sm btn-secondary">
                <UserCheck size={14} /> Assign & Update Ticket Status
              </button>
            )}
          </div>
        ))}
      </div>

      {/* MODAL: CREATE TICKET */}
      {isTicketModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Raise Complaint / Helpdesk Ticket</h3>
              <button onClick={() => setIsTicketModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleCreateTicket} className="modal-body">
              <div className="grid-2">
                <div className="form-group">
                  <label>Your Flat</label>
                  <select
                    className="form-control"
                    value={newTicket.flatId}
                    onChange={(e) => setNewTicket({ ...newTicket, flatId: e.target.value })}
                  >
                    {flats.map(f => (
                      <option key={f.id} value={f.id}>{f.id} - {f.ownerName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-control"
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value as any })}
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Security">Security</option>
                    <option value="Cleanliness">Cleanliness</option>
                    <option value="Gardening">Gardening</option>
                    <option value="Lift/Infrastructure">Lift & Infrastructure</option>
                    <option value="General">General Issue</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Issue Title</label>
                <input
                  type="text"
                  required
                  placeholder="Short description of problem..."
                  className="form-control"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Detailed Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide details for staff/vendor..."
                  className="form-control"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  className="form-control"
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as any })}
                >
                  <option value="Low">Low (48 Hours SLA)</option>
                  <option value="Medium">Medium (24 Hours SLA)</option>
                  <option value="High">High (12 Hours SLA)</option>
                  <option value="Emergency">Emergency (4 Hours SLA)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Submit Complaint Ticket
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ASSIGN & UPDATE STATUS */}
      {selectedTicket && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Manage Ticket {selectedTicket.id}</h3>
              <button onClick={() => setSelectedTicket(null)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <div className="modal-body">
              <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{selectedTicket.title}</p>
              <div className="form-group">
                <label>Assign to Staff / Vendor</label>
                <select
                  className="form-control"
                  value={assignStaff}
                  onChange={(e) => setAssignStaff(e.target.value)}
                >
                  <option value="Govind (Plumber)">Govindappa (Plumber)</option>
                  <option value="Bahadur (Security)">Bahadur Singh (Security)</option>
                  <option value="Raju (Housekeeping)">Raju (Housekeeping)</option>
                  <option value="External Electrician Vendor">External Electrician Vendor</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button onClick={() => handleAssignAndProgress('In Progress')} className="btn btn-secondary" style={{ flex: 1 }}>
                  Set In Progress
                </button>
                <button onClick={() => handleAssignAndProgress('Resolved')} className="btn btn-accent" style={{ flex: 1 }}>
                  Mark Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RESIDENT RATING */}
      {ratingTicket && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Rate Helpdesk Resolution</h3>
              <button onClick={() => setRatingTicket(null)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleSaveRating} className="modal-body">
              <p style={{ fontWeight: 700, marginBottom: '0.75rem' }}>{ratingTicket.title}</p>

              <div className="form-group" style={{ textAlign: 'center', margin: '1rem 0' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select Star Rating</label>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setStarCount(star)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <Star size={32} fill={star <= starCount ? '#F59E0B' : 'none'} color="#F59E0B" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Feedback Comment</label>
                <textarea
                  rows={2}
                  placeholder="Optional review..."
                  className="form-control"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-amber" style={{ width: '100%', marginTop: '1rem' }}>
                Submit Rating & Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
