'use client'
import Hero from '../components/hero'
import AboutUs from '../components/about'
import Footer from '../components/footer'
import Team from '../components/team'
import '../app/globals.css'

import React from 'react'

const Page = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
        <Team />
      <Footer />
    </div>
  )
}

export default Page
