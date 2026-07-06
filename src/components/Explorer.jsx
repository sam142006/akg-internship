import React from 'react'

export default function Explorer() {
  return (
    <div className="tab-pane fade show active" id="explorer" role="tabpanel" aria-labelledby="explorer-tab">
      <div className="row gx-4">
        <aside className="col-lg-3 sidebar-panel rounded-4 p-4 mb-4">
          <div className="sidebar-sticky">
            <div className="form-group mb-3">
              <label htmlFor="searchInput" className="form-label">Search stays</label>
              <input id="searchInput" className="form-control" type="search" placeholder="Search by name or theme" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="locationSelect" className="form-label">Location</label>
              <select id="locationSelect" className="form-select">
                <option value="All">All</option>
                <option>Goa</option>
                <option>Manali</option>
                <option>Wayanad</option>
                <option>Coorg</option>
                <option>Rishikesh</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Price range</label>
              <input id="priceRange" type="range" className="form-range" min="500" max="10000" step="100" defaultValue="10000" />
              <div className="range-values d-flex justify-content-between align-items-center mt-2">
                <div><span className="range-label">Min</span><input id="minPrice" className="form-control range-input" type="number" min="0" defaultValue="500" /></div>
                <div><span className="range-label">Max</span><input id="maxPrice" className="form-control range-input" type="number" min="0" defaultValue="10000" /></div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="ratingSelect" className="form-label">Rating</label>
              <select id="ratingSelect" className="form-select">
                <option value="All">All</option>
                <option value="3.5">3.5+</option>
                <option value="4.0">4.0+</option>
                <option value="4.5">4.5+</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="sortSelect" className="form-label">Sort</label>
              <select id="sortSelect" className="form-select">
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-rating">Rating: High to Low</option>
              </select>
            </div>
            <button id="filterBtn" className="btn btn-primary w-100">Update explorer</button>
          </div>
        </aside>
        <main className="col-lg-9">
          <div className="cards-header d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
            <div>
              <h2>Explorer</h2>
              <p className="text-muted">Browse cabins, domes, treehouses and houseboats from the live GlampQuest collection.</p>
            </div>
            <div className="page-info text-muted" id="pageInfo"></div>
          </div>
          <div id="cabinsList" className="row row-cols-1 row-cols-md-2 g-4"></div>
          <div className="pagination-controls d-flex justify-content-center align-items-center gap-3 mt-4">
            <button id="prevPage" className="btn btn-outline-secondary">Previous</button>
            <button id="nextPage" className="btn btn-outline-secondary">Next</button>
          </div>
        </main>
      </div>
    </div>
  )
}
