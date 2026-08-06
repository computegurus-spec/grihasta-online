import React, { useState } from 'react';
import type { Amenity, AmenityBooking, UserRole } from '../types';
import { StorageEngine } from '../services/storage';
import { Calendar, Clock, Users } from 'lucide-react';

interface Props {
  role: UserRole;
}

export const Module05_Amenities: React.FC<Props> = () => {
  const [amenities] = useState<Amenity[]>(StorageEngine.getAmenities());
  const [bookings, setBookings] = useState<AmenityBooking[]>(StorageEngine.getBookings());

  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-08-15');
  const [slotTime, setSlotTime] = useState('04:00 PM - 08:00 PM');
  const [guestsCount, setGuestsCount] = useState(10);
  const [purpose, setPurpose] = useState('');
  const [flatId, setFlatId] = useState('A-101');
  const [errorMsg, setErrorMsg] = useState('');

  const flats = StorageEngine.getFlats();

  const handleOpenBooking = (amenity: Amenity) => {
    setSelectedAmenity(amenity);
    setErrorMsg('');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAmenity) return;

    // CONFLICT DETECTION ENGINE
    // Parse hours to check time overlaps
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
      // Overlap condition: start < existing.end && end > existing.start
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
      {/* Banner */}
      <div className="card card-sage" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-sage" style={{ marginBottom: '0.4rem' }}>MODULE 05</span>
          <h2>🏊 Amenities Booking & Reservation</h2>
          <p style={{ fontSize: '0.9rem', color: '#031D34' }}>
            Instant reservation of Party Hall, Swimming Pool, Gym, and Badminton Courts with auto conflict detection.
          </p>
        </div>
      </div>

      {/* Grid of Available Amenities */}
      <div className="grid-2">
        {amenities.map((amn) => (
          <div key={amn.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#0B4769', fontSize: '1.15rem' }}>{amn.name}</h3>
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

      {/* Active & Past Bookings Table */}
      <div className="card">
        <h3>📋 Layout Reservation Schedule & History</h3>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Amenity</th>
                <th>Flat ID</th>
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
                  <label>Reserving Flat</label>
                  <select
                    className="form-control"
                    value={flatId}
                    onChange={(e) => setFlatId(e.target.value)}
                  >
                    {flats.map(f => (
                      <option key={f.id} value={f.id}>{f.id} - {f.ownerName}</option>
                    ))}
                  </select>
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
                    <option value="06:00 AM - 08:00 AM">06:00 AM - 08:00 AM</option>
                    <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                    <option value="04:00 PM - 08:00 PM">04:00 PM - 08:00 PM</option>
                    <option value="08:00 PM - 11:00 PM">08:00 PM - 11:00 PM</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Number of Guests</label>
                  <input
                    type="number"
                    required
                    max={selectedAmenity.capacity}
                    className="form-control"
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Event Purpose</label>
                <input
                  type="text"
                  placeholder="e.g. Birthday Party / Family Gathering"
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
