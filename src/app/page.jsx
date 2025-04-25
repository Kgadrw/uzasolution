'use client'
import Hero from "../../components/Hero"
import AboutUs from "../../components/Aboutus"
import TrustedCompanies from "../../components/Trustedco"
import Profiles from "../../components/Profiles"
import '../globals.css'

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
