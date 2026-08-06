import React, { useState } from 'react';
import type { Flat, Vehicle, DomesticHelp, UserRole } from '../types';
import { StorageEngine } from '../services/storage';
import { Car, Plus, Search, Filter, Phone, Mail, UserPlus } from 'lucide-react';

interface Props {
  role: UserRole;
}

export const Module01_Flats: React.FC<Props> = ({ role }) => {
  const [flats, setFlats] = useState<Flat[]>(StorageEngine.getFlats());
  const [vehicles, setVehicles] = useState<Vehicle[]>(StorageEngine.getVehicles());
  const [domesticHelp, setDomesticHelp] = useState<DomesticHelp[]>(StorageEngine.getDomesticHelp());
  
  const [selectedBlock, setSelectedBlock] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'flats' | 'vehicles' | 'domestic_help'>('flats');

  // Modals
  const [isFlatModalOpen, setIsFlatModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // New Flat Form State
  const [newFlat, setNewFlat] = useState({
    block: 'Block A' as const,
    floor: 1,
    flatNumber: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    occupancyType: 'Owner Occupied' as const,
    sqft: 1800,
    monthlyDuesRate: 3500
  });

  // New Vehicle Form State
  const [newVehicle, setNewVehicle] = useState({
    flatId: 'A-101',
    type: 'Car' as const,
    registrationNumber: '',
    parkingSlot: '',
    ownerName: ''
  });

  // New Domestic Help Form State
  const [newHelp, setNewHelp] = useState({
    flatId: 'A-101',
    name: '',
    role: 'Maid' as const,
    phone: '',
    passCode: `GH-${Math.floor(100 + Math.random() * 900)}`
  });

  const canEdit = ['MC_ADMIN', 'MC_MEMBER'].includes(role);

  const filteredFlats = flats.filter(f => {
    const matchesBlock = selectedBlock === 'ALL' || f.block === selectedBlock;
    const matchesSearch = f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (f.tenantName && f.tenantName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesBlock && matchesSearch;
  });

  const handleAddFlat = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `${newFlat.block.split(' ')[1]}-${newFlat.flatNumber}`;
    const flatObj: Flat = {
      id,
      block: newFlat.block,
      floor: Number(newFlat.floor),
      flatNumber: newFlat.flatNumber,
      ownerName: newFlat.ownerName,
      ownerPhone: newFlat.ownerPhone,
      ownerEmail: newFlat.ownerEmail,
      occupancyType: newFlat.occupancyType,
      sqft: Number(newFlat.sqft),
      monthlyDuesRate: Number(newFlat.monthlyDuesRate),
      vehiclesCount: 0,
      registeredHelpCount: 0
    };
    const updated = [flatObj, ...flats];
    setFlats(updated);
    StorageEngine.saveFlats(updated);
    setIsFlatModalOpen(false);
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const vObj: Vehicle = {
      id: `V-${Date.now().toString().slice(-4)}`,
      flatId: newVehicle.flatId,
      type: newVehicle.type,
      registrationNumber: newVehicle.registrationNumber.toUpperCase(),
      parkingSlot: newVehicle.parkingSlot || `P-${newVehicle.flatId}`,
      ownerName: newVehicle.ownerName || 'Resident'
    };
    const updated = [vObj, ...vehicles];
    setVehicles(updated);
    StorageEngine.saveVehicles(updated);

    // Update vehicle count in flat
    const updatedFlats = flats.map(f => f.id === newVehicle.flatId ? { ...f, vehiclesCount: f.vehiclesCount + 1 } : f);
    setFlats(updatedFlats);
    StorageEngine.saveFlats(updatedFlats);

    setIsVehicleModalOpen(false);
  };

  const handleAddHelp = (e: React.FormEvent) => {
    e.preventDefault();
    const hObj: DomesticHelp = {
      id: `DH-${Date.now().toString().slice(-4)}`,
      flatId: newHelp.flatId,
      name: newHelp.name,
      role: newHelp.role,
      phone: newHelp.phone,
      passCode: newHelp.passCode,
      status: 'Out'
    };
    const updated = [hObj, ...domesticHelp];
    setDomesticHelp(updated);
    StorageEngine.saveDomesticHelp(updated);

    // Update help count in flat
    const updatedFlats = flats.map(f => f.id === newHelp.flatId ? { ...f, registeredHelpCount: f.registeredHelpCount + 1 } : f);
    setFlats(updatedFlats);
    StorageEngine.saveFlats(updatedFlats);

    setIsHelpModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Module Banner */}
      <div className="card card-sage" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-sage" style={{ marginBottom: '0.4rem' }}>MODULE 01</span>
          <h2>🏘️ Resident & Flat Management</h2>
          <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
            Complete directory of Blocks A–D, owner & tenant profiles, vehicle parking registrations, and domestic staff.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {canEdit && (
            <button onClick={() => setIsFlatModalOpen(true)} className="btn btn-primary">
              <Plus size={16} /> Add Flat Profile
            </button>
          )}
          <button onClick={() => setIsVehicleModalOpen(true)} className="btn btn-secondary">
            <Car size={16} /> Register Vehicle
          </button>
          <button onClick={() => setIsHelpModalOpen(true)} className="btn btn-accent">
            <UserPlus size={16} /> Add Domestic Staff
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', borderBottom: '2px solid #CBD5E1', gap: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('flats')}
          style={{
            background: 'none', border: 'none', padding: '0.6rem 0.2rem', fontWeight: 700, fontSize: '0.95rem',
            borderBottom: activeTab === 'flats' ? '3px solid #0B4769' : 'none',
            color: activeTab === 'flats' ? '#0B4769' : '#64748B', cursor: 'pointer'
          }}
        >
          Flats Directory ({flats.length})
        </button>
        <button
          onClick={() => setActiveTab('vehicles')}
          style={{
            background: 'none', border: 'none', padding: '0.6rem 0.2rem', fontWeight: 700, fontSize: '0.95rem',
            borderBottom: activeTab === 'vehicles' ? '3px solid #0B4769' : 'none',
            color: activeTab === 'vehicles' ? '#0B4769' : '#64748B', cursor: 'pointer'
          }}
        >
          Vehicles & Parking ({vehicles.length})
        </button>
        <button
          onClick={() => setActiveTab('domestic_help')}
          style={{
            background: 'none', border: 'none', padding: '0.6rem 0.2rem', fontWeight: 700, fontSize: '0.95rem',
            borderBottom: activeTab === 'domestic_help' ? '3px solid #0B4769' : 'none',
            color: activeTab === 'domestic_help' ? '#0B4769' : '#64748B', cursor: 'pointer'
          }}
        >
          Registered Staff & Domestic Help ({domesticHelp.length})
        </button>
      </div>

      {/* FLATS TAB CONTENT */}
      {activeTab === 'flats' && (
        <>
          {/* Controls bar */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Filter size={16} style={{ color: '#0B4769' }} />
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Block Filter:</span>
              {['ALL', 'Block A', 'Block B', 'Block C', 'Block D'].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBlock(b)}
                  className={`btn btn-sm ${selectedBlock === b ? 'btn-primary' : 'btn-outline'}`}
                >
                  {b}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search Flat / Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '32px' }}
              />
            </div>
          </div>

          {/* Grid of Flat Cards */}
          <div className="grid-3">
            {filteredFlats.map((flat) => (
              <div key={flat.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ background: '#0B4769', color: '#FFF', padding: '0.4rem 0.75rem', borderRadius: '6px', fontWeight: 800, fontSize: '1.1rem' }}>
                      {flat.id}
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'block' }}>{flat.block} · Floor {flat.floor}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{flat.sqft} sq.ft</span>
                    </div>
                  </div>
                  
                  <span className={`badge ${flat.occupancyType === 'Owner Occupied' ? 'badge-sage' : flat.occupancyType === 'Rented' ? 'badge-ocean' : 'badge-pending'}`}>
                    {flat.occupancyType}
                  </span>
                </div>

                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ fontSize: '0.85rem' }}>
                    <strong>Owner:</strong> {flat.ownerName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', gap: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Phone size={12} /> {flat.ownerPhone}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Mail size={12} /> {flat.ownerEmail.split('@')[0]}</span>
                  </div>

                  {flat.tenantName && (
                    <div style={{ borderTop: '1px dashed #CBD5E1', paddingTop: '0.35rem', marginTop: '0.35rem', fontSize: '0.85rem' }}>
                      <strong>Tenant:</strong> {flat.tenantName} ({flat.tenantPhone})
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', paddingTop: '0.2rem' }}>
                  <span>🚗 Vehicles: <strong>{flat.vehiclesCount}</strong></span>
                  <span>🧹 Domestic Help: <strong>{flat.registeredHelpCount}</strong></span>
                  <span>💰 Maintenance: <strong>₹{flat.monthlyDuesRate}/mo</strong></span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* VEHICLES TAB CONTENT */}
      {activeTab === 'vehicles' && (
        <div className="card">
          <h3>🚗 Registered Layout Vehicles & Parking Slots</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Reg Number</th>
                  <th>Flat ID</th>
                  <th>Vehicle Type</th>
                  <th>Parking Slot</th>
                  <th>Owner / Resident</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id}>
                    <td><strong style={{ color: '#0B4769' }}>{v.registrationNumber}</strong></td>
                    <td><span className="badge badge-ocean">{v.flatId}</span></td>
                    <td>{v.type}</td>
                    <td><span className="badge badge-sage">{v.parkingSlot}</span></td>
                    <td>{v.ownerName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DOMESTIC HELP TAB CONTENT */}
      {activeTab === 'domestic_help' && (
        <div className="card">
          <h3>🧹 Registered Domestic Help & Daily Staff</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Pass Code</th>
                  <th>Name</th>
                  <th>Flat ID</th>
                  <th>Role</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {domesticHelp.map((h) => (
                  <tr key={h.id}>
                    <td><strong style={{ color: '#31532C' }}>{h.passCode}</strong></td>
                    <td><strong>{h.name}</strong></td>
                    <td><span className="badge badge-ocean">{h.flatId}</span></td>
                    <td>{h.role}</td>
                    <td>{h.phone}</td>
                    <td>
                      <span className={`badge ${h.status === 'In Layout' ? 'badge-paid' : 'badge-pending'}`}>
                        {h.status} {h.entryTime ? `(${h.entryTime})` : ''}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: ADD FLAT */}
      {isFlatModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Flat Directory Record</h3>
              <button onClick={() => setIsFlatModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleAddFlat} className="modal-body">
              <div className="grid-2">
                <div className="form-group">
                  <label>Block</label>
                  <select
                    className="form-control"
                    value={newFlat.block}
                    onChange={(e) => setNewFlat({ ...newFlat, block: e.target.value as any })}
                  >
                    <option value="Block A">Block A</option>
                    <option value="Block B">Block B</option>
                    <option value="Block C">Block C</option>
                    <option value="Block D">Block D</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Flat Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 301"
                    className="form-control"
                    value={newFlat.flatNumber}
                    onChange={(e) => setNewFlat({ ...newFlat, flatNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Owner Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  className="form-control"
                  value={newFlat.ownerName}
                  onChange={(e) => setNewFlat({ ...newFlat, ownerName: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Owner Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 99000 00000"
                    className="form-control"
                    value={newFlat.ownerPhone}
                    onChange={(e) => setNewFlat({ ...newFlat, ownerPhone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Owner Email</label>
                  <input
                    type="email"
                    required
                    placeholder="owner@example.com"
                    className="form-control"
                    value={newFlat.ownerEmail}
                    onChange={(e) => setNewFlat({ ...newFlat, ownerEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Occupancy Type</label>
                  <select
                    className="form-control"
                    value={newFlat.occupancyType}
                    onChange={(e) => setNewFlat({ ...newFlat, occupancyType: e.target.value as any })}
                  >
                    <option value="Owner Occupied">Owner Occupied</option>
                    <option value="Rented">Rented</option>
                    <option value="Vacant">Vacant</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Monthly Dues (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newFlat.monthlyDuesRate}
                    onChange={(e) => setNewFlat({ ...newFlat, monthlyDuesRate: Number(e.target.value) })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Save Flat Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD VEHICLE */}
      {isVehicleModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Register Layout Vehicle & Parking Slot</h3>
              <button onClick={() => setIsVehicleModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleAddVehicle} className="modal-body">
              <div className="form-group">
                <label>Target Flat</label>
                <select
                  className="form-control"
                  value={newVehicle.flatId}
                  onChange={(e) => setNewVehicle({ ...newVehicle, flatId: e.target.value })}
                >
                  {flats.map(f => (
                    <option key={f.id} value={f.id}>{f.id} - {f.ownerName}</option>
                  ))}
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Vehicle Type</label>
                  <select
                    className="form-control"
                    value={newVehicle.type}
                    onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value as any })}
                  >
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                    <option value="EV Car">EV Car</option>
                    <option value="EV Bike">EV Bike</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Registration Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KA-01-MJ-1234"
                    className="form-control"
                    value={newVehicle.registrationNumber}
                    onChange={(e) => setNewVehicle({ ...newVehicle, registrationNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Parking Slot</label>
                  <input
                    type="text"
                    placeholder="e.g. P-A101"
                    className="form-control"
                    value={newVehicle.parkingSlot}
                    onChange={(e) => setNewVehicle({ ...newVehicle, parkingSlot: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Resident Owner Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    value={newVehicle.ownerName}
                    onChange={(e) => setNewVehicle({ ...newVehicle, ownerName: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>
                Register Vehicle
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD DOMESTIC HELP */}
      {isHelpModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Register Domestic Help / Staff</h3>
              <button onClick={() => setIsHelpModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleAddHelp} className="modal-body">
              <div className="form-group">
                <label>Assigned Flat</label>
                <select
                  className="form-control"
                  value={newHelp.flatId}
                  onChange={(e) => setNewHelp({ ...newHelp, flatId: e.target.value })}
                >
                  {flats.map(f => (
                    <option key={f.id} value={f.id}>{f.id} - {f.ownerName}</option>
                  ))}
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Staff Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    className="form-control"
                    value={newHelp.name}
                    onChange={(e) => setNewHelp({ ...newHelp, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    className="form-control"
                    value={newHelp.role}
                    onChange={(e) => setNewHelp({ ...newHelp, role: e.target.value as any })}
                  >
                    <option value="Maid">Maid</option>
                    <option value="Cook">Cook</option>
                    <option value="Driver">Driver</option>
                    <option value="Nanny">Nanny</option>
                    <option value="Gardener">Gardener</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 99000 00000"
                  className="form-control"
                  value={newHelp.phone}
                  onChange={(e) => setNewHelp({ ...newHelp, phone: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-accent" style={{ width: '100%', marginTop: '1rem' }}>
                Register Staff Member
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
