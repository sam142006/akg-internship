import React from 'react'

export default function Favorites() {
  return (
    <div className="tab-pane fade" id="favorites" role="tabpanel" aria-labelledby="favorites-tab">
      <div className="panel-card rounded-4 p-4">
        <h2>Favorites</h2>
        <p className="text-muted mb-4">Keep track of your top outdoor stays.</p>
        <div id="favoritesList" className="list-group"></div>
      </div>
    </div>
  )
}
