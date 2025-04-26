'use client'
import Hero from "../components/Hero"
import AboutUs from "../components/AboutUs" // Fixed case sensitivity
import TrustedCompanies from "../components/Trustedco" // Updated filename
import Profiles from "../components/Profiles" // Verified filename
import "../app/globals.css" // Fixed relative path

import React from 'react'

const page = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Profiles />
      <TrustedCompanies />
    </div>
  )
}

export default page