import React, { useState } from 'react';
import type { MaintenanceDue, LedgerExpense, UserRole } from '../types';
import { StorageEngine } from '../services/storage';
import { TrendingUp, AlertTriangle, Receipt, Send, Plus, RefreshCw, Lock } from 'lucide-react';

interface Props {
  role: UserRole;
}

const QUARTERLY_AMOUNT = 9000;

// Quarter definitions
const QUARTERS = [
  { label: 'Q1 2026 (Jan–Mar)', dueDate: '2026-03-31', quarter: 'Q1' },
  { label: 'Q2 2026 (Apr–Jun)', dueDate: '2026-06-30', quarter: 'Q2' },
  { label: 'Q3 2026 (Jul–Sep)', dueDate: '2026-09-30', quarter: 'Q3' },
  { label: 'Q4 2026 (Oct–Dec)', dueDate: '2026-12-31', quarter: 'Q4' },
  { label: 'Q1 2027 (Jan–Mar)', dueDate: '2027-03-31', quarter: 'Q1' },
];

// Current quarter auto-detected
function getCurrentQuarter(): { label: string; dueDate: string } {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  const year = now.getFullYear();
  if (month <= 2) return { label: `Q1 ${year} (Jan–Mar)`, dueDate: `${year}-03-31` };
  if (month <= 5) return { label: `Q2 ${year} (Apr–Jun)`, dueDate: `${year}-06-30` };
  if (month <= 8) return { label: `Q3 ${year} (Jul–Sep)`, dueDate: `${year}-09-30` };
  return { label: `Q4 ${year} (Oct–Dec)`, dueDate: `${year}-12-31` };
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

  // Admin: Generate Dues Modal
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [genQuarter, setGenQuarter] = useState(getCurrentQuarter().label);
  const [genDueDate, setGenDueDate] = useState(getCurrentQuarter().dueDate);

  const flats = StorageEngine.getFlats();
  const isAdmin = role === 'MC_ADMIN';
  const isMC = ['MC_ADMIN', 'MC_MEMBER'].includes(role);

  // Stats
  const totalCollected = dues.filter(d => d.status === 'Paid').reduce((acc, d) => acc + d.amount, 0);
  const totalPending = dues.filter(d => d.status !== 'Paid').reduce((acc, d) => acc + d.amount, 0);
  const collectionPercentage = Math.round((totalCollected / (totalCollected + totalPending)) * 100) || 0;
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  // Admin: Auto-generate dues for ALL flats for selected quarter
  const handleGenerateDues = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    // Only generate for flats that don't already have a due for this quarter
    const existingFlatIds = dues.filter(d => d.quarter === genQuarter).map(d => d.flatId);
    const newDues: MaintenanceDue[] = flats
      .filter(f => !existingFlatIds.includes(f.id))
      .map(f => ({
        id: `DUE-${f.id.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now().toString().slice(-4)}`,
        flatId: f.id,
        quarter: genQuarter,
        amount: QUARTERLY_AMOUNT,
        dueDate: genDueDate,
        status: 'Pending' as const,
        generatedBy: 'Admin' as const
      }));

    if (newDues.length === 0) {
      alert(`Dues for ${genQuarter} have already been generated for all plots.`);
      setIsGenerateModalOpen(false);
      return;
    }

    const updated = [...newDues, ...dues];
    setDues(updated);
    StorageEngine.saveDues(updated);
    setIsGenerateModalOpen(false);
  };

  // Mark payment
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

  // Add expense (MC only)
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

  // WhatsApp reminder
  const handleSendReminder = (flatId: string, quarter: string) => {
    const flat = flats.find(f => f.id === flatId);
    const phone = flat?.ownerPhone || '';
    const text = `Dear ${flat?.ownerName || 'Resident'}, this is a polite reminder from Grihasta Layout MC. Quarterly maintenance dues of ₹9,000 for ${quarter} for Plot ${flatId} are pending. Kindly clear your payment at grihasta.online. Thank you!`;
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
            Quarterly maintenance dues of <strong>₹9,000/quarter</strong> per plot. Dues are generated by Admin only.
            Residents can view their dues; only MC can mark payments and record expenses.
          </p>
        </div>

        <div className="module-header-actions">
          {isAdmin && (
            <button onClick={() => setIsGenerateModalOpen(true)} className="btn btn-secondary">
              <RefreshCw size={16} /> Generate Quarter Dues
            </button>
          )}
          {isMC && (
            <button onClick={() => setIsExpenseModalOpen(true)} className="btn btn-primary">
              <Plus size={16} /> Record Layout Expense
            </button>
          )}
        </div>
      </div>

      {/* Admin-only notice for non-admins */}
      {!isAdmin && !isMC && (
        <div className="card" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1.25rem' }}>
          <Lock size={18} style={{ color: '#1E40AF' }} />
          <p style={{ fontSize: '0.875rem', color: '#1E40AF', fontWeight: 600 }}>
            Maintenance dues are generated and managed by the MC Admin only. You can view your plot's dues status below.
          </p>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid-3">
        <div className="stat-card stat-card-teal">
          <div>
            <span style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 600 }}>Collection Rate</span>
            <div className="stat-value" style={{ color: '#0B4769' }}>{collectionPercentage}%</div>
            <span style={{ fontSize: '0.8rem', color: '#31532C' }}>₹{totalCollected.toLocaleString()} Collected</span>
          </div>
          <TrendingUp size={36} style={{ color: '#0B4769', opacity: 0.8 }} />
        </div>

        <div className="stat-card stat-card-amber">
          <div>
            <span style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 600 }}>Pending Dues</span>
            <div className="stat-value" style={{ color: '#991B1B' }}>₹{totalPending.toLocaleString()}</div>
            <span style={{ fontSize: '0.8rem', color: '#991B1B' }}>{dues.filter(d => d.status !== 'Paid').length} Plots Pending</span>
          </div>
          <AlertTriangle size={36} style={{ color: '#E9BB76', opacity: 0.9 }} />
        </div>

        <div className="stat-card stat-card-forest">
          <div>
            <span style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 600 }}>Total Expenses</span>
            <div className="stat-value" style={{ color: '#31532C' }}>₹{totalExpenses.toLocaleString()}</div>
            <span style={{ fontSize: '0.8rem', color: '#475569' }}>{expenses.length} Approved Vouchers</span>
          </div>
          <Receipt size={36} style={{ color: '#31532C', opacity: 0.8 }} />
        </div>
      </div>

      {/* Quarterly Rate Info */}
      <div className="card" style={{ background: '#031D34', color: '#E9BB76', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <strong style={{ fontSize: '1rem' }}>📅 Quarterly Maintenance Schedule</strong>
          <p style={{ fontSize: '0.8rem', color: '#D2E0B0', marginTop: '0.15rem' }}>
            Q1: Jan–Mar (due 31 Mar) &nbsp;·&nbsp; Q2: Apr–Jun (due 30 Jun) &nbsp;·&nbsp; Q3: Jul–Sep (due 30 Sep) &nbsp;·&nbsp; Q4: Oct–Dec (due 31 Dec)
          </p>
        </div>
        <div style={{ background: '#E9BB76', color: '#031D34', padding: '0.4rem 0.85rem', borderRadius: '8px', fontWeight: 800, fontSize: '1.05rem' }}>
          ₹9,000 / Quarter / Plot
        </div>
      </div>

      {/* Pill Navigation Tabs */}
      <div className="subnav-tabs">
        <button onClick={() => setActiveTab('dues')} className={`subnav-tab-btn ${activeTab === 'dues' ? 'active' : ''}`}>
          Plot Dues Directory ({dues.length})
        </button>
        <button onClick={() => setActiveTab('ledger')} className={`subnav-tab-btn ${activeTab === 'ledger' ? 'active' : ''}`}>
          Society Expense Ledger ({expenses.length})
        </button>
      </div>

      {/* DUES TAB */}
      {activeTab === 'dues' && (
        <div className="card">
          <h3>💳 Villa Plot Quarterly Dues Status</h3>
          {dues.length === 0 ? (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center' }}>
              <Receipt size={36} style={{ color: '#1E6B85', margin: '0 auto 0.75rem auto', opacity: 0.7 }} />
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '0.5rem' }}>No quarterly dues generated yet.</p>
              {isAdmin && (
                <p style={{ color: '#0B4769', fontSize: '0.85rem', fontWeight: 600 }}>
                  Click "<RefreshCw size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Generate Quarter Dues" above to create dues for all plots.
                </p>
              )}
            </div>
          ) : (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Plot Address</th>
                    <th>Owner Name</th>
                    <th>Quarter</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Generated By</th>
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
                        <td><span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#031D34' }}>{d.quarter}</span></td>
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
                          <span className={`badge ${d.generatedBy === 'Admin' ? 'badge-ocean' : 'badge-sage'}`} style={{ fontSize: '0.7rem' }}>
                            {d.generatedBy}
                          </span>
                        </td>
                        <td>
                          {d.status !== 'Paid' && isMC ? (
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              <button onClick={() => setSelectedDue(d)} className="btn btn-sm btn-primary">
                                Mark Paid
                              </button>
                              <button onClick={() => handleSendReminder(d.flatId, d.quarter)} className="btn btn-sm btn-amber" title="Send WhatsApp Reminder">
                                <Send size={12} /> WhatsApp
                              </button>
                            </div>
                          ) : d.status === 'Paid' ? (
                            <span style={{ fontSize: '0.75rem', color: '#31532C', fontWeight: 600 }}>✅ Receipt Issued</span>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Pending</span>
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

      {/* MODAL: GENERATE QUARTERLY DUES (Admin only) */}
      {isGenerateModalOpen && isAdmin && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Generate Quarterly Dues for All Plots</h3>
              <button onClick={() => setIsGenerateModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleGenerateDues} className="modal-body">
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '0.85rem', marginBottom: '1rem', fontSize: '0.875rem', color: '#1E40AF' }}>
                <strong>Admin Action:</strong> This will generate ₹9,000 quarterly due records for <strong>all {flats.length} registered plots</strong> for the selected quarter. Plots that already have dues for this quarter will be skipped.
              </div>

              <div className="form-group">
                <label>Select Quarter</label>
                <select
                  className="form-control"
                  value={genQuarter}
                  onChange={(e) => {
                    setGenQuarter(e.target.value);
                    const q = QUARTERS.find(q => q.label === e.target.value);
                    if (q) setGenDueDate(q.dueDate);
                  }}
                >
                  {QUARTERS.map(q => (
                    <option key={q.label} value={q.label}>{q.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input type="date" className="form-control" value={genDueDate} onChange={(e) => setGenDueDate(e.target.value)} />
              </div>

              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.875rem', color: '#15803D' }}>
                <strong>Amount per Plot:</strong> ₹9,000 &nbsp;|&nbsp; <strong>Total Dues to Generate:</strong> ₹{(QUARTERLY_AMOUNT * flats.length).toLocaleString()} across {flats.length} plots
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <RefreshCw size={16} /> Generate Dues for {genQuarter}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MARK PAYMENT */}
      {selectedDue && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Record Quarterly Payment for {selectedDue.flatId}</h3>
              <button onClick={() => setSelectedDue(null)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleMarkPaid} className="modal-body">
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <p><strong>Plot Address:</strong> {selectedDue.flatId}</p>
                <p><strong>Quarter:</strong> {selectedDue.quarter}</p>
                <p><strong>Amount:</strong> ₹{selectedDue.amount.toLocaleString()}</p>
                <p><strong>Due Date:</strong> {selectedDue.dueDate}</p>
              </div>

              <div className="form-group">
                <label>Payment Mode</label>
                <select className="form-control" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value as any)}>
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
                  <select className="form-control" value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as any })}>
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
                  <input type="number" required className="form-control" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })} />
                </div>
              </div>

              <div className="form-group">
                <label>Voucher Description</label>
                <input type="text" required placeholder="Detailed expense breakdown..." className="form-control" value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Vendor / Supplier Name</label>
                  <input type="text" required placeholder="e.g. BESCOM / Cauvery Tankers" className="form-control" value={newExpense.vendorName} onChange={(e) => setNewExpense({ ...newExpense, vendorName: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Approved By</label>
                  <input type="text" className="form-control" value={newExpense.approvedBy} onChange={(e) => setNewExpense({ ...newExpense, approvedBy: e.target.value })} />
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
