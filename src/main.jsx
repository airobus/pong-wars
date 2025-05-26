import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import GhibliPong from './GhibliPong.jsx'
import SeasonsPong from './SeasonsPong.jsx'
import Navigation from './Navigation.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ghibli" element={<GhibliPong />} />
        <Route path="/seasons" element={<SeasonsPong />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)