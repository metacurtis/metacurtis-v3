import { motion } from 'framer-motion'
import { useState } from 'react'
import Navbar from './components/Navbar'
import { 
  HeroSection,
  MetaCurtisSection,
  Version3Section,
  ContactSection
} from './components/sections'

function App() {
  return (
    <div className="bg-black">
      <Navbar />
      <HeroSection />
      <MetaCurtisSection />
      <Version3Section />
      <ContactSection />
    </div>
  )
}

export default App
