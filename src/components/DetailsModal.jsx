import React from 'react'

export default function DetailsModal() {
  return (
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
  )
}
