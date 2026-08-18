import React, { useState } from 'react';
import type { VisitorLog, DeliveryLog, UserRole } from '../types';
import { StorageEngine } from '../services/storage';
import { QrCode, Truck, LogOut, Plus, Share2, ShieldCheck } from 'lucide-react';

interface Props {
  role: UserRole;
}

export const Module02_Gate: React.FC<Props> = ({ role: _role }) => {
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>(StorageEngine.getVisitorLogs());
  const [deliveries, setDeliveries] = useState<DeliveryLog[]>(StorageEngine.getDeliveries());
  const [activeTab, setActiveTab] = useState<'visitors' | 'deliveries'>('visitors');

  const [gateFilter, setGateFilter] = useState<'ALL' | 'Main Gate (Front)' | 'Back Gate (Water Tank)'>('ALL');

  // New Visitor Check-In Form
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [newVisitor, setNewVisitor] = useState({
    visitorName: '',
    phone: '',
    flatId: 'L01-P12',
    purpose: 'Guest' as const,
    vehicleNo: '',
    gateLocation: 'Main Gate (Front)' as 'Main Gate (Front)' | 'Back Gate (Water Tank)'
  });

  // Pre-approved Pass Modal (Resident feature)
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [generatedPass, setGeneratedPass] = useState<{ passCode: string; visitorName: string; flatId: string; gateLocation: string } | null>(null);

  // Delivery Modal
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [newDelivery, setNewDelivery] = useState({
    provider: 'Amazon' as const,
    flatId: 'L01-P12',
    executiveName: '',
    phone: '',
    status: 'Delivered to Door' as const,
    packageCount: 1,
    gateLocation: 'Main Gate (Front)' as 'Main Gate (Front)' | 'Back Gate (Water Tank)'
  });

  const filteredVisitorLogs = visitorLogs.filter(v => 
    gateFilter === 'ALL' || (v.gateLocation || 'Main Gate (Front)') === gateFilter
  );

  const filteredDeliveries = deliveries.filter(d => 
    gateFilter === 'ALL' || (d.gateLocation || 'Main Gate (Front)') === gateFilter
  );

  const handleCheckInVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const log: VisitorLog = {
      id: `VIS-${Date.now().toString().slice(-4)}`,
      visitorName: newVisitor.visitorName,
      phone: newVisitor.phone,
      flatId: newVisitor.flatId,
      purpose: newVisitor.purpose,
      passCode: `VP-${Math.floor(1000 + Math.random() * 9000)}`,
      entryTime: timeNow,
      status: 'Checked-In',
      vehicleNo: newVisitor.vehicleNo,
      gateLocation: newVisitor.gateLocation
    };

    const updated = [log, ...visitorLogs];
    setVisitorLogs(updated);
    StorageEngine.saveVisitorLogs(updated);
    setIsVisitorModalOpen(false);
  };

  const handleCheckOut = (id: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updated = visitorLogs.map(v => v.id === id ? { ...v, status: 'Checked-Out' as const, exitTime: timeNow } : v);
    setVisitorLogs(updated);
    StorageEngine.saveVisitorLogs(updated);
  };

  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `VP-${Math.floor(1000 + Math.random() * 9000)}`;
    const passObj = {
      passCode: code,
      visitorName: newVisitor.visitorName || 'Expected Guest',
      flatId: newVisitor.flatId,
      gateLocation: newVisitor.gateLocation
    };
    setGeneratedPass(passObj);

    // Also add to pre-approved logs
    const log: VisitorLog = {
      id: `VIS-${Date.now().toString().slice(-4)}`,
      visitorName: newVisitor.visitorName || 'Expected Guest',
      phone: newVisitor.phone || '-',
      flatId: newVisitor.flatId,
      purpose: 'Guest',
      passCode: code,
      entryTime: 'Pending Entry',
      status: 'Pre-Approved',
      approvedBy: 'Resident',
      gateLocation: newVisitor.gateLocation
    };
    const updated = [log, ...visitorLogs];
    setVisitorLogs(updated);
    StorageEngine.saveVisitorLogs(updated);
  };

  const handleAddDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const del: DeliveryLog = {
      id: `DEL-${Date.now().toString().slice(-4)}`,
      provider: newDelivery.provider,
      flatId: newDelivery.flatId,
      executiveName: newDelivery.executiveName,
      phone: newDelivery.phone,
      entryTime: timeNow,
      status: newDelivery.status,
      packageCount: Number(newDelivery.packageCount),
      gateLocation: newDelivery.gateLocation
    };
    const updated = [del, ...deliveries];
    setDeliveries(updated);
    StorageEngine.saveDeliveries(updated);
    setIsDeliveryModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Module Banner Header */}
      <div className="card card-sage module-header-banner">
        <div className="module-header-title-group">
          <span className="badge badge-sage">MODULE 02</span>
          <h2>🛡️ Security & Gate Management</h2>
          <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
            Digital gate entry log, pre-approved visitor passes with QR codes, and delivery tracking.
          </p>
        </div>

        <div className="module-header-actions">
          <button onClick={() => setIsVisitorModalOpen(true)} className="btn btn-primary">
            <Plus size={16} /> Log Gate Entry
          </button>
          <button onClick={() => setIsPassModalOpen(true)} className="btn btn-amber">
            <QrCode size={16} /> Pre-Approve Visitor Pass
          </button>
          <button onClick={() => setIsDeliveryModalOpen(true)} className="btn btn-secondary">
            <Truck size={16} /> Log Delivery
          </button>
        </div>
      </div>

      {/* Gate Filter Pills & Operational Status Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', background: '#F8FAFC', padding: '0.85rem 1.25rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0B4769' }}>Filter Gate Location:</span>
          <button
            onClick={() => setGateFilter('ALL')}
            className={`btn btn-sm ${gateFilter === 'ALL' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '20px' }}
          >
            All Gates ({visitorLogs.length + deliveries.length})
          </button>
          <button
            onClick={() => setGateFilter('Main Gate (Front)')}
            className={`btn btn-sm ${gateFilter === 'Main Gate (Front)' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '20px' }}
          >
            Main Gate (Front)
          </button>
          <button
            onClick={() => setGateFilter('Back Gate (Water Tank)')}
            className={`btn btn-sm ${gateFilter === 'Back Gate (Water Tank)' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '20px' }}
          >
            Back Gate (Water Tank)
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge badge-paid" style={{ fontSize: '0.75rem' }}>
            <ShieldCheck size={13} /> Main Gate (Front) Active
          </span>
          <span className="badge badge-sage" style={{ fontSize: '0.75rem' }}>
            <ShieldCheck size={13} /> Back Gate (Water Tank) Active
          </span>
        </div>
      </div>

      {/* Pill Navigation Tabs */}
      <div className="subnav-tabs">
        <button
          onClick={() => setActiveTab('visitors')}
          className={`subnav-tab-btn ${activeTab === 'visitors' ? 'active' : ''}`}
        >
          Gate Visitor Logs ({filteredVisitorLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('deliveries')}
          className={`subnav-tab-btn ${activeTab === 'deliveries' ? 'active' : ''}`}
        >
          Delivery Tracker ({filteredDeliveries.length})
        </button>
      </div>

      {/* VISITORS TAB */}
      {activeTab === 'visitors' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3>📋 Active & Recent Gate Visitor Entries</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Showing {filteredVisitorLogs.length} logs for {gateFilter}</span>
          </div>

          {filteredVisitorLogs.length === 0 ? (
            <div className="text-center" style={{ padding: '2.5rem 1rem' }}>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1rem' }}>No active visitor logs recorded for this gate selection today.</p>
              <button onClick={() => setIsVisitorModalOpen(true)} className="btn btn-primary">
                <Plus size={16} /> Record Visitor Check-In
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Pass Code</th>
                    <th>Visitor Name</th>
                    <th>Gate Location</th>
                    <th>Plot Address</th>
                    <th>Purpose</th>
                    <th>Vehicle No</th>
                    <th>Check-In Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisitorLogs.map((v) => (
                    <tr key={v.id}>
                      <td><strong style={{ color: '#0B4769' }}>{v.passCode || '-'}</strong></td>
                      <td>
                        <strong>{v.visitorName}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{v.phone}</div>
                      </td>
                      <td>
                        <span className={`badge ${v.gateLocation === 'Back Gate (Water Tank)' ? 'badge-amber' : 'badge-ocean'}`}>
                          {v.gateLocation || 'Main Gate (Front)'}
                        </span>
                      </td>
                      <td><span className="badge badge-sage">{v.flatId}</span></td>
                      <td>{v.purpose}</td>
                      <td>{v.vehicleNo || 'Walk-in'}</td>
                      <td>{v.entryTime}</td>
                      <td>
                        <span className={`badge ${v.status === 'Checked-In' ? 'badge-paid' : v.status === 'Pre-Approved' ? 'badge-amber' : 'badge-pending'}`}>
                          {v.status} {v.exitTime ? `(Out: ${v.exitTime})` : ''}
                        </span>
                      </td>
                      <td>
                        {v.status === 'Checked-In' && (
                          <button onClick={() => handleCheckOut(v.id)} className="btn btn-sm btn-outline" style={{ borderColor: '#991B1B', color: '#991B1B' }}>
                            <LogOut size={12} /> Mark Exit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* DELIVERIES TAB */}
      {activeTab === 'deliveries' && (
        <div className="card">
          <h3>🚚 Package & Delivery Logs</h3>
          {filteredDeliveries.length === 0 ? (
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.5rem' }}>No package deliveries recorded for this gate selection today.</p>
          ) : (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Gate Location</th>
                    <th>Plot Address</th>
                    <th>Executive Name</th>
                    <th>Phone</th>
                    <th>Time</th>
                    <th>Packages</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeliveries.map((d) => (
                    <tr key={d.id}>
                      <td><strong style={{ color: '#1E6B85' }}>{d.provider}</strong></td>
                      <td>
                        <span className={`badge ${d.gateLocation === 'Back Gate (Water Tank)' ? 'badge-amber' : 'badge-ocean'}`}>
                          {d.gateLocation || 'Main Gate (Front)'}
                        </span>
                      </td>
                      <td><span className="badge badge-sage">{d.flatId}</span></td>
                      <td>{d.executiveName}</td>
                      <td>{d.phone}</td>
                      <td>{d.entryTime}</td>
                      <td>{d.packageCount} PKG</td>
                      <td>
                        <span className={`badge ${d.status === 'Delivered to Door' ? 'badge-paid' : 'badge-amber'}`}>
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODAL: CHECK-IN VISITOR */}
      {isVisitorModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Log New Visitor Check-In</h3>
              <button onClick={() => setIsVisitorModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleCheckInVisitor} className="modal-body">
              <div className="form-group">
                <label>Entry Gate Location</label>
                <select
                  className="form-control"
                  value={newVisitor.gateLocation}
                  onChange={(e) => setNewVisitor({ ...newVisitor, gateLocation: e.target.value as any })}
                >
                  <option value="Main Gate (Front)">Main Gate (Front)</option>
                  <option value="Back Gate (Water Tank)">Back Gate (Near Water Tank)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Visitor Name</label>
                <input
                  type="text"
                  required
                  placeholder="Visitor full name"
                  className="form-control"
                  value={newVisitor.visitorName}
                  onChange={(e) => setNewVisitor({ ...newVisitor, visitorName: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 99000 00000"
                    className="form-control"
                    value={newVisitor.phone}
                    onChange={(e) => setNewVisitor({ ...newVisitor, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Destination Plot / Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. L01-P12 or Lane 1 Plot 12"
                    className="form-control"
                    value={newVisitor.flatId}
                    onChange={(e) => setNewVisitor({ ...newVisitor, flatId: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Purpose</label>
                  <select
                    className="form-control"
                    value={newVisitor.purpose}
                    onChange={(e) => setNewVisitor({ ...newVisitor, purpose: e.target.value as any })}
                  >
                    <option value="Guest">Guest</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Service Technician">Service Technician</option>
                    <option value="Cab">Cab / Uber / Ola</option>
                    <option value="Official">Official</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Vehicle Reg No (If any)</label>
                  <input
                    type="text"
                    placeholder="e.g. KA-03-AB-1234"
                    className="form-control"
                    value={newVisitor.vehicleNo}
                    onChange={(e) => setNewVisitor({ ...newVisitor, vehicleNo: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Verify & Approve Gate Entry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RESIDENT PRE-APPROVED PASS GENERATOR */}
      {isPassModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Generate Resident Pre-Approved Visitor Pass</h3>
              <button onClick={() => setIsPassModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <div className="modal-body">
              {!generatedPass ? (
                <form onSubmit={handleGeneratePass}>
                  <div className="form-group">
                    <label>Preferred Entry Gate</label>
                    <select
                      className="form-control"
                      value={newVisitor.gateLocation}
                      onChange={(e) => setNewVisitor({ ...newVisitor, gateLocation: e.target.value as any })}
                    >
                      <option value="Main Gate (Front)">Main Gate (Front)</option>
                      <option value="Back Gate (Water Tank)">Back Gate (Near Water Tank)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Guest Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      className="form-control"
                      value={newVisitor.visitorName}
                      onChange={(e) => setNewVisitor({ ...newVisitor, visitorName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Your Plot Address</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. L01-P12"
                      className="form-control"
                      value={newVisitor.flatId}
                      onChange={(e) => setNewVisitor({ ...newVisitor, flatId: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-amber" style={{ width: '100%', marginTop: '1rem' }}>
                    Generate Pass & QR Code
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', border: '2px dashed #0B4769', display: 'inline-block', width: '100%', maxWidth: '320px' }}>
                    <h4 style={{ color: '#0B4769' }}>GRIHASTA GATE PASS</h4>
                    <span className="badge badge-amber" style={{ margin: '0.5rem 0' }}>VALID AT: {generatedPass.gateLocation}</span>
                    <div style={{ background: '#031D34', color: '#E9BB76', padding: '0.75rem', borderRadius: '8px', fontSize: '1.5rem', fontWeight: 800, margin: '1rem 0', letterSpacing: '2px' }}>
                      {generatedPass.passCode}
                    </div>
                    <p style={{ fontWeight: 700 }}>Guest: {generatedPass.visitorName}</p>
                    <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Destination: Plot {generatedPass.flatId}</p>

                    <div style={{ background: '#FFF', padding: '0.75rem', border: '1px solid #CBD5E1', borderRadius: '8px', marginTop: '1rem', display: 'inline-block' }}>
                      <QrCode size={120} style={{ color: '#031D34' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.25rem' }}>
                    <button
                      onClick={() => alert(`Pass code ${generatedPass.passCode} for ${generatedPass.gateLocation} copied to clipboard!`)}
                      className="btn btn-accent"
                    >
                      <Share2 size={16} /> Share via WhatsApp
                    </button>
                    <button onClick={() => setGeneratedPass(null)} className="btn btn-outline">
                      Create Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD DELIVERY */}
      {isDeliveryModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Log Delivery Arrival</h3>
              <button onClick={() => setIsDeliveryModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleAddDelivery} className="modal-body">
              <div className="form-group">
                <label>Entry Gate Location</label>
                <select
                  className="form-control"
                  value={newDelivery.gateLocation}
                  onChange={(e) => setNewDelivery({ ...newDelivery, gateLocation: e.target.value as any })}
                >
                  <option value="Main Gate (Front)">Main Gate (Front)</option>
                  <option value="Back Gate (Water Tank)">Back Gate (Near Water Tank)</option>
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Provider</label>
                  <select
                    className="form-control"
                    value={newDelivery.provider}
                    onChange={(e) => setNewDelivery({ ...newDelivery, provider: e.target.value as any })}
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="Swiggy">Swiggy</option>
                    <option value="Zomato">Zomato</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Blinkit">Blinkit</option>
                    <option value="Courier">Courier</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Target Plot Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. L01-P12"
                    className="form-control"
                    value={newDelivery.flatId}
                    onChange={(e) => setNewDelivery({ ...newDelivery, flatId: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Executive Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    className="form-control"
                    value={newDelivery.executiveName}
                    onChange={(e) => setNewDelivery({ ...newDelivery, executiveName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Executive Phone</label>
                  <input
                    type="text"
                    placeholder="+91 99000 00000"
                    className="form-control"
                    value={newDelivery.phone}
                    onChange={(e) => setNewDelivery({ ...newDelivery, phone: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>
                Record Delivery
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
