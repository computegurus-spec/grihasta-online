import React, { useState } from 'react';
import type { MaintenanceDue, LedgerExpense, UserRole } from '../types';
import { StorageEngine } from '../services/storage';
import { TrendingUp, AlertTriangle, Receipt, Send, Plus } from 'lucide-react';

interface Props {
  role: UserRole;
}

export const Module03_Finance: React.FC<Props> = ({ role }) => {
  const [dues, setDues] = useState<MaintenanceDue[]>(StorageEngine.getDues());
  const [expenses, setExpenses] = useState<LedgerExpense[]>(StorageEngine.getExpenses());
  const [activeTab, setActiveTab] = useState<'dues' | 'ledger'>('dues');

  // Payment marking modal
  const [selectedDue, setSelectedDue] = useState<MaintenanceDue | null>(null);
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'Bank Transfer' | 'Cash'>('UPI');
  const [txnId, setTxnId] = useState('');

  // Add Expense Modal
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: 'Electricity' as const,
    description: '',
    amount: 1000,
    vendorName: '',
    approvedBy: 'MC Treasurer'
  });

  const flats = StorageEngine.getFlats();

  const totalCollected = dues.filter(d => d.status === 'Paid').reduce((acc, d) => acc + d.amount, 0);
  const totalPending = dues.filter(d => d.status !== 'Paid').reduce((acc, d) => acc + d.amount, 0);
  const collectionPercentage = Math.round((totalCollected / (totalCollected + totalPending)) * 100) || 0;
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  const handleMarkPaid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDue) return;

    const dateToday = new Date().toISOString().split('T')[0];
    const updated = dues.map(d => d.id === selectedDue.id ? {
      ...d,
      status: 'Paid' as const,
      paidDate: dateToday,
      paymentMode,
      transactionId: txnId || `TXN-${Date.now().toString().slice(-6)}`
    } : d);

    setDues(updated);
    StorageEngine.saveDues(updated);
    setSelectedDue(null);
    setTxnId('');
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const expObj: LedgerExpense = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      category: newExpense.category,
      description: newExpense.description,
      amount: Number(newExpense.amount),
      vendorName: newExpense.vendorName,
      approvedBy: newExpense.approvedBy
    };
    const updated = [expObj, ...expenses];
    setExpenses(updated);
    StorageEngine.saveExpenses(updated);
    setIsExpenseModalOpen(false);
  };

  const handleSendReminder = (flatId: string) => {
    const flat = flats.find(f => f.id === flatId);
    const phone = flat?.ownerPhone || '';
    const text = `Dear ${flat?.ownerName || 'Resident'}, this is a polite reminder from Grihasta Layout MC regarding maintenance dues for ${flatId} (August 2026). Kindly clear your payment on grihasta.online. Thank you!`;
    const url = `https://api.whatsapp.com/send?phone=${phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Module Banner Header */}
      <div className="card card-sage module-header-banner">
        <div className="module-header-title-group">
          <span className="badge badge-sage">MODULE 03</span>
          <h2>💰 Maintenance & Finance Ledger</h2>
          <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
            Automated monthly maintenance dues tracking, payment marking, WhatsApp reminders, and expense transparency.
          </p>
        </div>

        {['MC_ADMIN', 'MC_MEMBER'].includes(role) && (
          <div className="module-header-actions">
            <button onClick={() => setIsExpenseModalOpen(true)} className="btn btn-primary">
              <Plus size={16} /> Record Layout Expense
            </button>
          </div>
        )}
      </div>

      {/* Overview Stat Cards */}
      <div className="grid-3">
        <div className="stat-card stat-card-teal">
          <div>
            <span style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 600 }}>August Collection Rate</span>
            <div className="stat-value" style={{ color: '#0B4769' }}>{collectionPercentage}%</div>
            <span style={{ fontSize: '0.8rem', color: '#31532C' }}>₹{totalCollected.toLocaleString()} Collected</span>
          </div>
          <TrendingUp size={36} style={{ color: '#0B4769', opacity: 0.8 }} />
        </div>

        <div className="stat-card stat-card-amber">
          <div>
            <span style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 600 }}>Pending & Overdue Dues</span>
            <div className="stat-value" style={{ color: '#991B1B' }}>₹{totalPending.toLocaleString()}</div>
            <span style={{ fontSize: '0.8rem', color: '#991B1B' }}>{dues.filter(d => d.status !== 'Paid').length} Plot Dues Pending</span>
          </div>
          <AlertTriangle size={36} style={{ color: '#E9BB76', opacity: 0.9 }} />
        </div>

        <div className="stat-card stat-card-forest">
          <div>
            <span style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 600 }}>Total Month Expenses</span>
            <div className="stat-value" style={{ color: '#31532C' }}>₹{totalExpenses.toLocaleString()}</div>
            <span style={{ fontSize: '0.8rem', color: '#475569' }}>{expenses.length} Approved Vouchers</span>
          </div>
          <Receipt size={36} style={{ color: '#31532C', opacity: 0.8 }} />
        </div>
      </div>

      {/* Pill Navigation Tabs */}
      <div className="subnav-tabs">
        <button
          onClick={() => setActiveTab('dues')}
          className={`subnav-tab-btn ${activeTab === 'dues' ? 'active' : ''}`}
        >
          Plot Dues Directory ({dues.length})
        </button>
        <button
          onClick={() => setActiveTab('ledger')}
          className={`subnav-tab-btn ${activeTab === 'ledger' ? 'active' : ''}`}
        >
          Society Expense Ledger ({expenses.length})
        </button>
      </div>

      {/* DUES TAB */}
      {activeTab === 'dues' && (
        <div className="card">
          <h3>💳 Villa Plot Maintenance Dues Status (August 2026)</h3>
          {dues.length === 0 ? (
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.5rem' }}>No maintenance dues logged for this period yet.</p>
          ) : (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Plot Address ID</th>
                    <th>Owner Name</th>
                    <th>Month</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dues.map((d) => {
                    const flatObj = flats.find(f => f.id === d.flatId);
                    return (
                      <tr key={d.id}>
                        <td><span className="badge badge-ocean">{d.flatId}</span></td>
                        <td><strong>{flatObj?.ownerName || 'Resident'}</strong></td>
                        <td>{d.month}</td>
                        <td><strong style={{ color: '#0B4769' }}>₹{d.amount.toLocaleString()}</strong></td>
                        <td>{d.dueDate}</td>
                        <td>
                          <span className={`badge ${d.status === 'Paid' ? 'badge-paid' : d.status === 'Overdue' ? 'badge-overdue' : 'badge-pending'}`}>
                            {d.status}
                          </span>
                          {d.paidDate && (
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Paid: {d.paidDate} ({d.paymentMode})</div>
                          )}
                        </td>
                        <td>
                          {d.status !== 'Paid' ? (
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              <button onClick={() => setSelectedDue(d)} className="btn btn-sm btn-primary">
                                Mark Paid
                              </button>
                              <button onClick={() => handleSendReminder(d.flatId)} className="btn btn-sm btn-amber" title="Send WhatsApp Reminder">
                                <Send size={12} /> WhatsApp
                              </button>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: '#31532C', fontWeight: 600 }}>Receipt Generated</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* LEDGER TAB */}
      {activeTab === 'ledger' && (
        <div className="card">
          <h3>📜 Society Expense Ledger Vouchers</h3>
          {expenses.length === 0 ? (
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.5rem' }}>No layout expense vouchers recorded yet.</p>
          ) : (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Vendor</th>
                    <th>Approved By</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e) => (
                    <tr key={e.id}>
                      <td>{e.date}</td>
                      <td><span className="badge badge-sage">{e.category}</span></td>
                      <td><strong>{e.description}</strong></td>
                      <td>{e.vendorName}</td>
                      <td>{e.approvedBy}</td>
                      <td><strong style={{ color: '#991B1B' }}>₹{e.amount.toLocaleString()}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODAL: MARK PAYMENT */}
      {selectedDue && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Record Maintenance Payment for {selectedDue.flatId}</h3>
              <button onClick={() => setSelectedDue(null)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleMarkPaid} className="modal-body">
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <p><strong>Plot Address:</strong> {selectedDue.flatId}</p>
                <p><strong>Dues Amount:</strong> ₹{selectedDue.amount.toLocaleString()}</p>
                <p><strong>Period:</strong> {selectedDue.month}</p>
              </div>

              <div className="form-group">
                <label>Payment Mode</label>
                <select
                  className="form-control"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value as any)}
                >
                  <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                  <option value="Bank Transfer">Bank Transfer (NEFT / IMPS)</option>
                  <option value="Cash">Cash to MC Treasurer</option>
                </select>
              </div>

              <div className="form-group">
                <label>Transaction Ref / UTR / Receipt No</label>
                <input
                  type="text"
                  placeholder="e.g. UPI/6219804412/OKAXIS"
                  className="form-control"
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Confirm & Issue Digital Receipt
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RECORD EXPENSE */}
      {isExpenseModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Record Society Expense Voucher</h3>
              <button onClick={() => setIsExpenseModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleAddExpense} className="modal-body">
              <div className="grid-2">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-control"
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as any })}
                  >
                    <option value="Security">Security Guard Services</option>
                    <option value="Gardening">Gardening & Landscaping</option>
                    <option value="Electricity">BESCOM Electricity Bill</option>
                    <option value="Water Tanker">Cauvery Water Tankers</option>
                    <option value="Repairs">Repairs & Maintenance</option>
                    <option value="Staff Salary">Staff Salary</option>
                    <option value="Event">Community Event</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Voucher Description</label>
                <input
                  type="text"
                  required
                  placeholder="Detailed expense breakdown..."
                  className="form-control"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Vendor / Supplier Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BESCOM / Cauvery Tankers"
                    className="form-control"
                    value={newExpense.vendorName}
                    onChange={(e) => setNewExpense({ ...newExpense, vendorName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Approved By</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newExpense.approvedBy}
                    onChange={(e) => setNewExpense({ ...newExpense, approvedBy: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Save Expense Voucher
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
