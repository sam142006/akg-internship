import React, { useState } from 'react';
import HotelFormModal from './components/HotelFormModal.jsx';

export default function App() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenCreate = () => {
    setSelectedHotel(null);
    setShowModal(true);
  };

  const handleOpenEdit = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedHotel(null);
  };

  const handleSubmit = (hotelData) => {
    if (selectedHotel) {
      setHotels((current) =>
        current.map((item) => (item.id === selectedHotel.id ? { ...item, ...hotelData } : item))
      );
    } else {
      setHotels((current) => [...current, { id: Date.now(), ...hotelData }]);
    }
    handleClose();
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>AKG Hotel Listings</h1>
        <button className="primary-btn" onClick={handleOpenCreate}>
          Add New Hotel
        </button>
      </header>

      <main>
        {hotels.length === 0 ? (
          <div className="empty-state">
            <p>No hotels have been added yet. Use the button above to add a hotel listing.</p>
          </div>
        ) : (
          <div className="hotel-grid">
            {hotels.map((hotel) => (
              <article key={hotel.id} className="hotel-card">
                <img src={hotel.thumbnail} alt={hotel.name} className="hotel-card-image" />
                <div className="hotel-card-content">
                  <div>
                    <h2>{hotel.name}</h2>
                    <p className="hotel-meta">{hotel.location} • ₹{hotel.price} / night</p>
                    <p className="hotel-meta">Rating: {hotel.rating.toFixed(1)} ★</p>
                  </div>
                  <p className="hotel-description">{hotel.description}</p>
                  <button className="secondary-btn" onClick={() => handleOpenEdit(hotel)}>
                    Edit Listing
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <HotelFormModal hotel={selectedHotel} onClose={handleClose} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
