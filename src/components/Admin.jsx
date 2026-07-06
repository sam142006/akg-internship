import React from 'react'

export default function Admin() {
  return (
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
              <input id="adminPrice" className="form-control" type="number" defaultValue={3500} min={1} />
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
  )
}
