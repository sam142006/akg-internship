import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Explorer from './components/Explorer'
import Bookings from './components/Bookings'
import Favorites from './components/Favorites'
import Admin from './components/Admin'
import DetailsModal from './components/DetailsModal'

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Hero />
      <div className="tab-content mt-4">
        <Explorer />
        <Bookings />
        <Favorites />
        <Admin />
      </div>
      <DetailsModal />
      <div id="toastArea" className="toast-area"></div>
      <div id="confirmArea" className="confirm-area"></div>
    </div>
  )
}
