import React, { useState } from 'react';
import type { Flat, DomesticHelp, UserRole } from '../types';
import { StorageEngine } from '../services/storage';
import { Plus, Search, Filter, Phone, Mail, UserPlus, Camera, Upload, User } from 'lucide-react';

interface Props {
  role: UserRole;
}

export const Module01_Flats: React.FC<Props> = ({ role }) => {
  const [flats, setFlats] = useState<Flat[]>(StorageEngine.getFlats());
  const [domesticHelp, setDomesticHelp] = useState<DomesticHelp[]>(StorageEngine.getDomesticHelp());
  
  const [selectedBlock, setSelectedBlock] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'flats' | 'domestic_help'>('flats');

  // Modals
  const [isFlatModalOpen, setIsFlatModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Photo Edit Modal for existing flats
  const [editingFlatPhoto, setEditingFlatPhoto] = useState<Flat | null>(null);

  // Lanes 1 to 15 list
  const lanesList = Array.from({ length: 15 }, (_, i) => `Lane ${i + 1}`);

  // New Flat Form State
  const [newFlat, setNewFlat] = useState({
    block: 'Lane 1',
    floor: 0,
    flatNumber: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    occupancyType: 'Owner Occupied' as const,
    sqft: 2400,
    quarterlyDuesRate: 9000,
    ownerPhoto: ''
  });

  // New Domestic Help Form State
  const [newHelp, setNewHelp] = useState({
    flatId: '',
    name: '',
    role: 'Maid' as const,
    phone: '',
    passCode: `GH-${Math.floor(100 + Math.random() * 900)}`
  });

  const canEdit = ['MC_ADMIN', 'MC_MEMBER', 'RESIDENT_OWNER'].includes(role);

  const filteredFlats = flats.filter(f => {
    const matchesBlock = selectedBlock === 'ALL' || f.block === selectedBlock;
    const matchesSearch = f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (f.tenantName && f.tenantName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesBlock && matchesSearch;
  });

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>, callback: (dataUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please choose an image file under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFlat = (e: React.FormEvent) => {
    e.preventDefault();
    const laneNum = newFlat.block.split(' ')[1];
    const id = `L${laneNum.padStart(2, '0')}-${newFlat.flatNumber.replace(/\s+/g, '')}`;
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
      quarterlyDuesRate: Number(newFlat.quarterlyDuesRate),
      registeredHelpCount: 0,
      ownerPhoto: newFlat.ownerPhoto || undefined
    };
    const updated = [flatObj, ...flats];
    setFlats(updated);
    StorageEngine.saveFlats(updated);
    setIsFlatModalOpen(false);
    setNewFlat({
      block: 'Lane 1',
      floor: 0,
      flatNumber: '',
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      occupancyType: 'Owner Occupied',
      sqft: 2400,
      quarterlyDuesRate: 9000,
      ownerPhoto: ''
    });
  };

  const handleUpdateFlatPhoto = (flatId: string, photoUrl: string) => {
    const updated = flats.map(f => f.id === flatId ? { ...f, ownerPhoto: photoUrl } : f);
    setFlats(updated);
    StorageEngine.saveFlats(updated);
    setEditingFlatPhoto(null);
  };

  const handleAddHelp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHelp.flatId) return;
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
          <h2>🏡 Resident & Villa Plot Directory</h2>
          <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
            Complete directory across <strong>Lanes 1 to 15</strong>, owner & tenant profiles, and domestic staff.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {canEdit && (
            <button onClick={() => setIsFlatModalOpen(true)} className="btn btn-primary">
              <Plus size={16} /> Add Villa / Plot Profile
            </button>
          )}
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
          Layout Plot Directory ({flats.length})
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
          {/* Lane Filter Controls Bar */}
          <div className="card" style={{ padding: '0.85rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter size={18} style={{ color: '#0B4769' }} />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0B4769' }}>Filter by Lane (1 to 15):</span>
              </div>

              <div style={{ position: 'relative', minWidth: '260px' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#64748B' }} />
                <input
                  type="text"
                  placeholder="Search Plot / Resident Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '32px', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Scrollable Lane Pills Bar */}
            <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.3rem' }}>
              <button
                onClick={() => setSelectedBlock('ALL')}
                className={`btn btn-sm ${selectedBlock === 'ALL' ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: '20px', whiteSpace: 'nowrap' }}
              >
                ALL LANES
              </button>
              {lanesList.map((lane) => (
                <button
                  key={lane}
                  onClick={() => setSelectedBlock(lane)}
                  className={`btn btn-sm ${selectedBlock === lane ? 'btn-primary' : 'btn-outline'}`}
                  style={{ borderRadius: '20px', whiteSpace: 'nowrap' }}
                >
                  {lane}
                </button>
              ))}
            </div>
          </div>

          {/* Empty State vs Grid */}
          {filteredFlats.length === 0 ? (
            <div className="card text-center" style={{ padding: '3rem 1.5rem' }}>
              <h3 style={{ color: '#0B4769', marginBottom: '0.5rem' }}>No Villa Plots Registered Yet</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Start by adding residents and plot details across Lanes 1 to 15.
              </p>
              {canEdit && (
                <button onClick={() => setIsFlatModalOpen(true)} className="btn btn-primary">
                  <Plus size={16} /> Register First Villa Plot
                </button>
              )}
            </div>
          ) : (
            <div className="grid-3">
              {filteredFlats.map((flat) => (
                <div key={flat.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ background: '#0B4769', color: '#FFF', padding: '0.4rem 0.75rem', borderRadius: '6px', fontWeight: 800, fontSize: '1rem' }}>
                        {flat.id}
                      </div>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'block', fontWeight: 600 }}>{flat.block} · {flat.flatNumber}</span>
                        <span style={{ fontSize: '0.78rem', color: '#475569' }}>{flat.sqft} sq.ft</span>
                      </div>
                    </div>
                    
                    <span className={`badge ${flat.occupancyType === 'Owner Occupied' ? 'badge-sage' : flat.occupancyType === 'Rented' ? 'badge-ocean' : 'badge-pending'}`}>
                      {flat.occupancyType}
                    </span>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      {flat.ownerPhoto ? (
                        <img
                          src={flat.ownerPhoto}
                          alt={flat.ownerName}
                          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0B4769' }}
                        />
                      ) : (
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0B4769', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem' }}>
                          {flat.ownerName.charAt(0) || 'O'}
                        </div>
                      )}
                      {canEdit && (
                        <button
                          onClick={() => setEditingFlatPhoto(flat)}
                          title="Upload Owner Photo"
                          style={{
                            position: 'absolute', bottom: '-4px', right: '-4px',
                            background: '#E9BB76', color: '#031D34', border: '1px solid #FFF',
                            borderRadius: '50%', width: '22px', height: '22px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                          }}
                        >
                          <Camera size={12} />
                        </button>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1 }}>
                      <div style={{ fontSize: '0.85rem' }}>
                        <strong>Owner:</strong> {flat.ownerName}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Phone size={11} /> {flat.ownerPhone}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Mail size={11} /> {flat.ownerEmail.split('@')[0]}</span>
                      </div>

                      {flat.tenantName && (
                        <div style={{ borderTop: '1px dashed #CBD5E1', paddingTop: '0.25rem', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                          <strong>Tenant:</strong> {flat.tenantName} ({flat.tenantPhone})
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', paddingTop: '0.2rem' }}>
                    <span>🧹 Staff: <strong>{flat.registeredHelpCount}</strong></span>
                    <span>💰 Maintenance: <strong>₹{flat.quarterlyDuesRate}/quarter</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* DOMESTIC HELP TAB CONTENT */}
      {activeTab === 'domestic_help' && (
        <div className="card">
          <h3>🧹 Registered Domestic Help & Daily Staff</h3>
          {domesticHelp.length === 0 ? (
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.5rem' }}>No domestic staff registered yet.</p>
          ) : (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Pass Code</th>
                    <th>Name</th>
                    <th>Plot Address</th>
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
          )}
        </div>
      )}

      {/* MODAL: ADD FLAT */}
      {isFlatModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Villa / Plot Record</h3>
              <button onClick={() => setIsFlatModalOpen(false)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleAddFlat} className="modal-body">
              <div className="grid-2">
                <div className="form-group">
                  <label>Select Lane</label>
                  <select
                    className="form-control"
                    value={newFlat.block}
                    onChange={(e) => setNewFlat({ ...newFlat, block: e.target.value })}
                  >
                    {lanesList.map(lane => (
                      <option key={lane} value={lane}>{lane}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Plot / Villa Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Plot 42"
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
                  <label>Quarterly Dues (₹) — Standard: ₹9,000</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newFlat.quarterlyDuesRate}
                    onChange={(e) => setNewFlat({ ...newFlat, quarterlyDuesRate: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Owner Profile Photo (Optional)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {newFlat.ownerPhoto ? (
                    <img src={newFlat.ownerPhoto} alt="Owner Preview" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={20} style={{ color: '#64748B' }} />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => handlePhotoFileChange(e, (url) => setNewFlat({ ...newFlat, ownerPhoto: url }))}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Save Plot Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT OWNER PHOTO */}
      {editingFlatPhoto && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <h3>Upload Owner Photo — {editingFlatPhoto.id}</h3>
              <button onClick={() => setEditingFlatPhoto(null)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                {editingFlatPhoto.ownerPhoto ? (
                  <img
                    src={editingFlatPhoto.ownerPhoto}
                    alt={editingFlatPhoto.ownerName}
                    style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #0B4769', margin: '0 auto' }}
                  />
                ) : (
                  <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: '#0B4769', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 800, margin: '0 auto' }}>
                    {editingFlatPhoto.ownerName.charAt(0)}
                  </div>
                )}
                <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '0.5rem', color: '#031D34' }}>{editingFlatPhoto.ownerName}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{editingFlatPhoto.id}</div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Select New Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => handlePhotoFileChange(e, (url) => handleUpdateFlatPhoto(editingFlatPhoto.id, url))}
                />
                <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.4rem' }}>
                  Supported formats: JPG, PNG, WEBP (Max 5MB). Photo will be stored in resident database.
                </p>
              </div>
            </div>
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
                <label>Assigned Address / Plot</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. L01-P12 or Lane 1 Plot 12"
                  className="form-control"
                  value={newHelp.flatId}
                  onChange={(e) => setNewHelp({ ...newHelp, flatId: e.target.value })}
                />
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
