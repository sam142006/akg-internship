import React, { useState, useEffect } from 'react';
import { fetchHotelDetails } from '../utils/api';

export default function HotelDetailsModal({ hotelId, onClose, addToast }) {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    };

    setCheckIn(formatDate(today));
    setCheckOut(formatDate(tomorrow));
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchHotelDetails(hotelId)
      .then((res) => {
        if (isMounted) {
          setHotel(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load hotel details.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [hotelId]);

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', padding: '40px', textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border-color)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            margin: '0 auto 16px',
            animation: 'spin 1s linear infinite'
          }}></div>
          <h3>Loading details...</h3>
          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', padding: '40px', textAlign: 'center' }}>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
          <h3 style={{ color: 'var(--danger)' }}>Error Loading Details</h3>
          <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>{error || "Hotel could not be found."}</p>
        </div>
      </div>
    );
  }

  const photos = hotel.photos && hotel.photos.length > 0
    ? hotel.photos
    : [hotel.thumbnail || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80"];

  const dateDiff = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end - start;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  };

  const nights = dateDiff();
  const baseRate = parseFloat(hotel.price || 0);
  const totalBase = baseRate * nights;
  const taxRate = 0.12;
  const serviceFee = 250;
  const taxes = totalBase * taxRate;
  const grandTotal = totalBase + taxes + (nights > 0 ? serviceFee : 0);

  const handleBookStay = (e) => {
    e.preventDefault();
    if (nights <= 0) {
      addToast("Please select valid check-in and check-out dates.", "warning");
      return;
    }

    addToast(`Reservation Confirmed! You booked a ${nights}-night stay at ${hotel.name} for ₹${Math.round(grandTotal).toLocaleString('en-IN')}.`, "success");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className="details-grid">
          <div>
            <div className="details-gallery">
              <div className="details-main-img-wrapper">
                <img 
                  src={photos[activePhotoIdx]} 
                  className="details-main-img" 
                  alt={`${hotel.name} detail view`} 
                />
              </div>
              {photos.length > 1 && (
                <div className="details-thumbs-grid">
                  {photos.map((photo, i) => (
                    <div 
                      key={i} 
                      className={`details-thumb ${i === activePhotoIdx ? 'active' : ''}`}
                      onClick={() => setActivePhotoIdx(i)}
                    >
                      <img src={photo} alt="thumbnail view" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="details-info">
              <div className="details-header">
                <h2 className="details-title">{hotel.name}</h2>
              </div>

              <div className="details-meta">
                <div className="details-meta-item rating">
                  <span>★</span>
                  <span>{parseFloat(hotel.rating || 0).toFixed(1)} Guest Rating</span>
                </div>
                <div className="details-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{hotel.location}, India</span>
                </div>
              </div>

              <h4 className="details-desc-title">About the Property</h4>
              <p className="details-desc">{hotel.description || "No detailed description available for this property."}</p>

              <h4 className="details-desc-title">Popular Amenities</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>✓</span> High-speed Wi-Fi
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>✓</span> Swimming Pool
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>✓</span> Fitness Gym Center
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>✓</span> Free Parking Spaces
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>✓</span> 24/7 Room Dining
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>✓</span> Spa & Wellness center
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="booking-card">
              <div className="booking-header">
                <div className="booking-price">
                  ₹{Number(hotel.price || 0).toLocaleString('en-IN')}
                  <span>/night</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  ★ {parseFloat(hotel.rating || 0).toFixed(1)}
                </div>
              </div>

              <form onSubmit={handleBookStay} className="booking-form">
                <div className="booking-input-group">
                  <label htmlFor="check-in">Check-in Date</label>
                  <input 
                    id="check-in"
                    type="date" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </div>

                <div className="booking-input-group">
                  <label htmlFor="check-out">Check-out Date</label>
                  <input 
                    id="check-out"
                    type="date" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>

                <div className="booking-input-group">
                  <label htmlFor="guests-count">Guests</label>
                  <select 
                    id="guests-count"
                    value={guests} 
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>

                {nights > 0 && (
                  <div className="booking-summary">
                    <div className="booking-summary-row">
                      <span>₹{baseRate.toLocaleString('en-IN')} x {nights} nights</span>
                      <span>₹{totalBase.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="booking-summary-row">
                      <span>Taxes & Fees (12% GST)</span>
                      <span>₹{Math.round(taxes).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="booking-summary-row">
                      <span>Service Fee</span>
                      <span>₹{serviceFee}</span>
                    </div>
                    <div className="booking-summary-row total">
                      <span>Total Amount</span>
                      <span>₹{Math.round(grandTotal).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}

                <button type="submit" className="booking-btn">
                  {nights > 0 ? "Book Stay Now" : "Select Dates to Book"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}