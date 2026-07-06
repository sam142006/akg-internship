import React from 'react'

export default function Bookings() {
  return (
    <div className="tab-pane fade" id="bookings" role="tabpanel" aria-labelledby="bookings-tab">
      <div className="panel-card rounded-4 p-4">
        <h2>Active bookings</h2>
        <p className="text-muted mb-4">Manage your current reservations and cancel when needed.</p>
        <div id="bookingsList" className="list-group"></div>
      </div>
    </div>
  )
}
