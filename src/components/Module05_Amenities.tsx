import React, { useState } from 'react';
import type { Amenity, AmenityBooking, UserRole } from '../types';
import { StorageEngine } from '../services/storage';
import { Calendar, Clock, Users, Car, Building, Waves, Activity, Dumbbell, Info } from 'lucide-react';

interface Props {
  role: UserRole;
}

export const Module05_Amenities: React.FC<Props> = () => {
  const [amenities] = useState<Amenity[]>(StorageEngine.getAmenities());
  const [bookings, setBookings] = useState<AmenityBooking[]>(StorageEngine.getBookings());

  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-08-15');
  const [slotTime, setSlotTime] = useState('04:00 PM - 08:00 PM');
  const [guestsCount, setGuestsCount] = useState(1);
  const [purpose, setPurpose] = useState('');
  const [flatId, setFlatId] = useState('L01-P12');
  const [errorMsg, setErrorMsg] = useState('');

  const flats = StorageEngine.getFlats();

  const handleOpenBooking = (amenity: Amenity) => {
    setSelectedAmenity(amenity);
    setErrorMsg('');
    if (amenity.name.includes('Car Washing')) {
      setSlotTime('08:00 AM - 09:00 AM');
      setGuestsCount(1);
      setPurpose('Weekly Sedan/SUV Pressure Wash');
    } else {
      setSlotTime('04:00 PM - 08:00 PM');
      setGuestsCount(10);
      setPurpose('');
    }
  };

  const renderAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building': return <Building size={20} style={{ color: '#0B4769' }} />;
      case 'Waves': return <Waves size={20} style={{ color: '#0284C7' }} />;
      case 'Activity': return <Activity size={20} style={{ color: '#16A34A' }} />;
      case 'Dumbbell': return <Dumbbell size={20} style={{ color: '#D97706' }} />;
      case 'Car': return <Car size={20} style={{ color: '#2563EB' }} />;
      default: return <Calendar size={20} style={{ color: '#0B4769' }} />;
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAmenity) return;

    // CONFLICT DETECTION ENGINE
    const parseHours = (slotStr: string) => {
      const parts = slotStr.split(' - ');
      if (parts.length !== 2) return { start: 0, end: 24 };
      const toMinutes = (timeStr: string) => {
        const [time, period] = timeStr.trim().split(' ');
        const [h, m] = time.split(':').map(Number);
        let hour = h;
        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;
        return hour * 60 + (m || 0);
      };
      return { start: toMinutes(parts[0]), end: toMinutes(parts[1]) };
    };

    const newSlot = parseHours(slotTime);

    const isConflict = bookings.some(b => {
      if (b.amenityId !== selectedAmenity.id || b.bookingDate !== bookingDate || b.status !== 'Confirmed') {
        return false;
      }
      const existingSlot = parseHours(b.slotTime);
      return newSlot.start < existingSlot.end && newSlot.end > existingSlot.start;
    });

    if (isConflict) {
      setErrorMsg(`⚠️ Conflict Detected! ${selectedAmenity.name} is already booked for an overlapping time slot on ${bookingDate}. Please select another time slot or date.`);
      return;
    }

    const flatObj = flats.find(f => f.id === flatId);
    const bkg: AmenityBooking = {
      id: `BKG-${Date.now().toString().slice(-4)}`,
      amenityId: selectedAmenity.id,
      amenityName: selectedAmenity.name,
      flatId: flatId,
      residentName: flatObj?.ownerName || 'Resident',
      bookingDate: bookingDate,
      slotTime: slotTime,
      purpose: purpose || 'General Reservation',
      guestsCount: Number(guestsCount),
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [bkg, ...bookings];
    setBookings(updated);
    StorageEngine.saveBookings(updated);
    setSelectedAmenity(null);
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' as const } : b);
    setBookings(updated);
    StorageEngine.saveBookings(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Module Banner Header */}
      <div className="card card-sage module-header-banner">
        <div className="module-header-title-group">
          <span className="badge badge-sage">MODULE 05</span>
          <h2>🏊 Amenities Booking & Car Wash Reservations</h2>
          <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
            Instant reservation of Clubhouse Party Hall, Swimming Pool, Gym, Badminton Courts, and <strong>Car Washing Bay</strong> with auto conflict detection.
          </p>
        </div>
      </div>

      {/* Grid of Available Amenities */}
      <div className="grid-2">
        {amenities.map((amn) => (
          <div key={amn.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {renderAmenityIcon(amn.iconName)}
                <h3 style={{ color: '#0B4769', fontSize: '1.15rem', margin: 0 }}>{amn.name}</h3>
              </div>
              <span className="badge badge-ocean"><Users size={12} /> Cap: {amn.capacity}</span>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#475569' }}>{amn.description}</p>

            <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0B4769', fontWeight: 600 }}>
                <Clock size={14} /> Operating Hours: {amn.operatingHours}
              </div>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.35rem', color: '#64748B' }}>
                {amn.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>

            <button onClick={() => handleOpenBooking(amn)} className="btn btn-primary" style={{ width: '100%', marginTop: '0.25rem' }}>
              <Calendar size={16} /> Reserve {amn.name}
            </button>
          </div>
        ))}
      </div>

      {/* MC Member Discussion Callout on Car Wash Arrangement */}
      <div style={{ background: '#F0F9FF', padding: '0.85rem 1.25rem', borderRadius: '10px', border: '1px solid #BAE6FD', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <Info size={20} style={{ color: '#0284C7', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h5 style={{ color: '#0369A1', margin: 0, fontSize: '0.88rem' }}>🚗 Car Washing Facility Arrangement Note</h5>
          <p style={{ fontSize: '0.82rem', color: '#0C4A6E', marginTop: '0.2rem' }}>
            Car washing facility slots are currently enabled. Management Committee (MC) members are further discussing exact water metering & pressure washer arrangements. Suggest additional guidelines to MC desk!
          </p>
        </div>
      </div>

      {/* Active & Past Bookings Table */}
      <div className="card">
        <h3>📋 Layout Reservation Schedule & History</h3>
        {bookings.length === 0 ? (
          <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.5rem' }}>No active amenity reservations yet. Select an amenity above to reserve your slot.</p>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Amenity</th>
                  <th>Plot Address</th>
                  <th>Resident</th>
                  <th>Booking Date</th>
                  <th>Time Slot</th>
                  <th>Purpose</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td><strong style={{ color: '#0B4769' }}>{b.amenityName}</strong></td>
                    <td><span className="badge badge-ocean">{b.flatId}</span></td>
                    <td>{b.residentName}</td>
                    <td>{b.bookingDate}</td>
                    <td><span className="badge badge-amber">{b.slotTime}</span></td>
                    <td>{b.purpose || '-'}</td>
                    <td>
                      <span className={`badge ${b.status === 'Confirmed' ? 'badge-paid' : 'badge-overdue'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      {b.status === 'Confirmed' && (
                        <button onClick={() => handleCancelBooking(b.id)} className="btn btn-sm btn-outline" style={{ borderColor: '#991B1B', color: '#991B1B' }}>
                          Cancel Booking
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

      {/* MODAL: BOOK AMENITY */}
      {selectedAmenity && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Reserve {selectedAmenity.name}</h3>
              <button onClick={() => setSelectedAmenity(null)} style={{ color: '#FFF', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <form onSubmit={handleConfirmBooking} className="modal-body">
              {errorMsg && (
                <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {errorMsg}
                </div>
              )}

              <div className="grid-2">
                <div className="form-group">
                  <label>Reserving Plot Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. L01-P12"
                    className="form-control"
                    value={flatId}
                    onChange={(e) => setFlatId(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Booking Date</label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Time Slot</label>
                  <select
                    className="form-control"
                    value={slotTime}
                    onChange={(e) => setSlotTime(e.target.value)}
                  >
                    {selectedAmenity.name.includes('Car Washing') ? (
                      <>
                        <option value="07:00 AM - 08:00 AM">07:00 AM - 08:00 AM</option>
                        <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM</option>
                        <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                        <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                        <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                        <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                        <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                        <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                      </>
                    ) : (
                      <>
                        <option value="06:00 AM - 08:00 AM">06:00 AM - 08:00 AM</option>
                        <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                        <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                        <option value="04:00 PM - 08:00 PM">04:00 PM - 08:00 PM</option>
                        <option value="08:00 PM - 11:00 PM">08:00 PM - 11:00 PM</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label>Capacity / Vehicles / Guests</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={selectedAmenity.capacity}
                    className="form-control"
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Booking Purpose / Note</label>
                <input
                  type="text"
                  placeholder={selectedAmenity.name.includes('Car Washing') ? 'e.g. Wash Sedan / SUV' : 'e.g. Birthday Party / Family Gathering'}
                  className="form-control"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

