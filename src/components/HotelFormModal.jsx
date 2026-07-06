import React, { useState, useEffect } from 'react';

const CITIES = [
  "Ahmedabad", "Bengaluru", "Chennai", "Delhi", "Goa", 
  "Gurgaon", "Hyderabad", "Jaipur", "Kolkata", "Mumbai", "Noida", "Pune"
];

export default function HotelFormModal({ hotel, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    location: "Delhi",
    rating: "4.0",
    description: "",
    thumbnail: "",
    photosInput: ""
  });

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || "",
        price: hotel.price || "",
        location: hotel.location || "Delhi",
        rating: hotel.rating ? String(hotel.rating) : "4.0",
        description: hotel.description || "",
        thumbnail: hotel.thumbnail || "",
        photosInput: hotel.photos ? hotel.photos.join(", ") : ""
      });
    } else {
      setFormData({
        name: "",
        price: "",
        location: "Delhi",
        rating: "4.0",
        description: "",
        thumbnail: "",
        photosInput: ""
      });
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const photos = formData.photosInput
      ? formData.photosInput.split(",").map(url => url.trim()).filter(url => url.length > 0)
      : [];

    const defaultThumbnail = formData.thumbnail.trim() || (photos.length > 0 ? photos[0] : "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80");

    const payload = {
      name: formData.name.trim(),
      price: parseFloat(formData.price).toFixed(2),
      location: formData.location,
      rating: parseFloat(formData.rating),
      description: formData.description.trim(),
      thumbnail: defaultThumbnail,
      photos: photos.length > 0 ? photos : [defaultThumbnail]
    };

    onSubmit(payload);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        <div className="form-container">
          <h2 className="form-title">{hotel ? "Edit Hotel Listing" : "Add New Hotel Listing"}</h2>
          
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="hotel-name">Hotel Name *</label>
              <input 
                id="hotel-name"
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g. Hotel Haven Cascade"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="hotel-price">Nightly Rate (₹) *</label>
              <input 
                id="hotel-price"
                type="number" 
                name="price" 
                min="500" 
                max="50000"
                value={formData.price} 
                onChange={handleChange} 
                placeholder="e.g. 4500"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="hotel-location">Location / City *</label>
              <select 
                id="hotel-location"
                name="location" 
                value={formData.location} 
                onChange={handleChange}
              >
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="hotel-rating">Initial Rating *</label>
              <select 
                id="hotel-rating"
                name="rating" 
                value={formData.rating} 
                onChange={handleChange}
              >
                <option value="1.0">1.0 ★</option>
                <option value="1.5">1.5 ★</option>
                <option value="2.0">2.0 ★</option>
                <option value="2.5">2.5 ★</option>
                <option value="3.0">3.0 ★</option>
                <option value="3.5">3.5 ★</option>
                <option value="4.0">4.0 ★</option>
                <option value="4.5">4.5 ★</option>
                <option value="5.0">5.0 ★</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="hotel-thumbnail">Thumbnail Image URL</label>
              <input 
                id="hotel-thumbnail"
                type="url" 
                name="thumbnail" 
                value={formData.thumbnail} 
                onChange={handleChange} 
                placeholder="https://images.unsplash.com/..." 
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="hotel-description">Description *</label>
              <textarea 
                id="hotel-description"
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Provide a detailed description of the hotel property amenities, location, etc."
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="hotel-photos">Image Gallery URLs (comma separated)</label>
              <input 
                id="hotel-photos"
                type="text" 
                name="photosInput" 
                value={formData.photosInput} 
                onChange={handleChange} 
                placeholder="https://image1.jpg, https://image2.jpg" 
              />
            </div>

            <div className="form-actions full-width" style={{ width: '100%' }}>
              <button type="button" className="form-cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="form-submit-btn">
                {hotel ? "Save Changes" : "Create Listing"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}