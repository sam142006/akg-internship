import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '../styles.css'

const rootEl = document.getElementById('root')
const root = createRoot(rootEl)
root.render(<App />)

// load the existing DOM-driven app logic after React renders DOM
import('./app.js')
