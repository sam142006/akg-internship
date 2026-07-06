import React from 'react';
import HotelCard from './HotelCard';

export default function HotelGrid({ hotels, onViewDetails, filters, setFilters, totalCount }) {
  const handleSortChange = (e) => {
    const val = e.target.value;
    setFilters(prev => ({ ...prev, order_by: val, skip: 0 }));
  };

  const handlePrevPage = () => {
    setFilters(prev => {
      const newSkip = Math.max(0, parseInt(prev.skip || 0) - parseInt(prev.limit || 12));
      return { ...prev, skip: newSkip };
    });
  };

  const handleNextPage = () => {
    setFilters(prev => {
      const currentSkip = parseInt(prev.skip || 0);
      const limit = parseInt(prev.limit || 12);
      const newSkip = currentSkip + limit;
      return newSkip < totalCount ? { ...prev, skip: newSkip } : prev;
    });
  };

  const currentPage = Math.floor(parseInt(filters.skip || 0) / parseInt(filters.limit || 12)) + 1;
  const totalPages = Math.ceil(totalCount / parseInt(filters.limit || 12)) || 1;

  return (
    <div className="hotels-results animate-fade">
      <div className="results-header">
        <div className="results-count">
          Showing <strong>{hotels.length}</strong> of <strong>{totalCount}</strong> hotels
        </div>
        <div className="sort-select-wrapper">
          <select 
            value={filters.order_by || "-rating"} 
            onChange={handleSortChange}
            aria-label="Sort hotels"
          >
            <option value="-rating">Top Rated</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {hotels.length > 0 ? (
        <div className="hotels-grid">
          {hotels.map((hotel) => (
            <HotelCard 
              key={hotel.id} 
              hotel={hotel} 
              onViewDetails={onViewDetails} 
            />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          marginTop: '20px'
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <h3>No Hotels Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            We couldn't find any hotels matching your current filters. Try resetting them.
          </p>
        </div>
      )}

      {totalCount > parseInt(filters.limit || 12) && (
        <div className="pagination-container">
          <button 
            className="pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}