import React from 'react'

export default function App() {
  return (
    <>
      <div className="app-shell">
        <nav className="navbar navbar-expand-lg nav-theme">
          <div className="container-fluid">
            <a className="navbar-brand brand-title" href="#">GlampQuest</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navTabs" aria-controls="navTabs" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navTabs">
              <ul className="nav nav-tabs ms-auto" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="explorer-tab" data-bs-target="#explorer" data-bs-toggle="tab" type="button" role="tab">Explorer</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="bookings-tab" data-bs-target="#bookings" data-bs-toggle="tab" type="button" role="tab">Bookings</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="favorites-tab" data-bs-target="#favorites" data-bs-toggle="tab" type="button" role="tab">Favorites</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="admin-tab" data-bs-target="#admin" data-bs-toggle="tab" type="button" role="tab">Admin Panel</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <section className="hero-panel rounded-4 overflow-hidden">
          <div className="hero-overlay"></div>
          <div className="hero-copy container text-white">
            <p className="eyebrow">Outdoor Escapes</p>
            <h1>Find your next unique cabin stay in the mountains, coast, and forest.</h1>
            <p>Search the best treehouses, domes, houseboats and luxury cabins with one easy booking flow.</p>
          </div>
        </section>

        <div className="tab-content mt-4">
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

          <div className="tab-pane fade" id="bookings" role="tabpanel" aria-labelledby="bookings-tab">
            <div className="panel-card rounded-4 p-4">
              <h2>Active bookings</h2>
              <p className="text-muted mb-4">Manage your current reservations and cancel when needed.</p>
              <div id="bookingsList" className="list-group"></div>
            </div>
          </div>

          <div className="tab-pane fade" id="favorites" role="tabpanel" aria-labelledby="favorites-tab">
            <div className="panel-card rounded-4 p-4">
              <h2>Favorites</h2>
              <p className="text-muted mb-4">Keep track of your top outdoor stays.</p>
              <div id="favoritesList" className="list-group"></div>
            </div>
          </div>

          <div className="tab-pane fade" id="admin" role="tabpanel" aria-labelledby="admin-tab">
            <div className="row gx-4">
              <div className="col-lg-6 mb-4">
                <div className="panel-card rounded-4 p-4">
                  <h2>Admin entries</h2>
                  <div className="form-group mb-3">
                    <label htmlFor="adminName" className="form-label">Stay name</label>
                    <input id="adminName" className="form-control" type="text" placeholder="Enter cabin name" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="adminLocation" className="form-label">Location</label>
                    <input id="adminLocation" className="form-control" type="text" placeholder="e.g. Wayanad" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="adminPrice" className="form-label">Price per night</label>
                    <input id="adminPrice" className="form-control" type="number" defaultValue="3500" min="1" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="adminRating" className="form-label">Rating</label>
                    <select id="adminRating" className="form-select">
                      <option value="4.0">4.0</option>
                      <option value="4.5">4.5</option>
                      <option value="5.0">5.0</option>
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="adminThumbnail" className="form-label">Image URL</label>
                    <input id="adminThumbnail" className="form-control" type="url" placeholder="https://..." />
                  </div>
                  <button id="adminAdd" className="btn btn-primary w-100">Add local stay</button>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="panel-card rounded-4 p-4">
                  <h2>Local override list</h2>
                  <div id="localCabinsList" className="list-group"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="detailsModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content details-modal rounded-4 border-0 overflow-hidden">
              <div className="modal-header border-bottom-0">
                <h5 className="modal-title" id="detailsTitle"></h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="details-grid">
                  <div className="details-gallery">
                    <img id="detailsImage" className="details-main-image rounded-4" src="" alt="Stay image" />
                    <div id="detailsThumbs" className="details-thumbs d-flex gap-2 mt-3"></div>
                  </div>
                  <div className="details-panel">
                    <p id="detailsLocation" className="text-muted"></p>
                    <div className="details-meta d-flex gap-3 flex-wrap">
                      <span className="chip" id="detailsRating"></span>
                      <span className="chip" id="detailsPrice"></span>
                    </div>
                    <p id="detailsDescription" className="details-description"></p>
                    <div className="details-list mt-4" id="detailsFeatures"></div>
                    <div className="booking-card rounded-4 p-4 mt-4">
                      <h5>Reserve your stay</h5>
                      <p className="text-muted mb-3">A quick booking request for your chosen cabin.</p>
                      <button id="bookNow" className="btn btn-primary w-100">Book now</button>
                      <button id="favoriteNow" className="btn btn-outline-secondary w-100 mt-2">Add to favorites</button>
                    </div>
                    <div className="reviews-panel rounded-4 p-4 mt-4">
                      <h6>Reviews</h6>
                      <div id="reviewList"></div>
                      <div className="review-form mt-3">
                        <label className="form-label">Leave a review</label>
                        <textarea id="reviewText" className="form-control" rows={3} placeholder="Share your experience..."></textarea>
                        <button id="submitReview" className="btn btn-primary w-100 mt-3">Submit review</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="toastArea" className="toast-area"></div>
        <div id="confirmArea" className="confirm-area"></div>
      </div>
    </>
  )
}
