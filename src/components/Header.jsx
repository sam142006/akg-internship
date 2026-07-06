import React from 'react'

export default function Header() {
  return (
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
  )
}
