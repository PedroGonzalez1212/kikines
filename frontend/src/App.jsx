// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import QuienesSomos from './components/QuienesSomos'
import Fixture from './components/Fixture'
import Rendimiento from './components/Rendimiento'
import Plantel from './components/Plantel'
import Goleadores from './components/Goleadores'
import Galeria from './components/Galeria'
import Sponsors from './components/Sponsors'
import Footer from './components/Footer'
import { usePartidos } from './hooks/usePartidos'

import AdminLayout from './admin/AdminLayout'

function SitioPublico() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Navbar />
      <Hero />
      <QuienesSomos />
      <Fixture />
      <Rendimiento />
      <Plantel />
      <Goleadores />
      <Galeria />
      <Sponsors />
      <Footer />
    </div>
  )
}

function App() {
  // dentro del componente App:
    const { torneos, loading, error } = usePartidos()
    console.log('torneos:', torneos)
    console.log('loading:', loading)
    console.log('error:', error)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SitioPublico />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App