'use client'
import Hero from '../components/hero'
import AboutUs from '../components/about'
import TrustedCo from '../components/trusted'
import Profiles from '../components/Profiles'
import Footer from '../components/footer'
import Info from '../components/info'
import News from '../components/news'
import '../app/globals.css'

import React from 'react'

const Page = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Profiles />
      <Info />
      <TrustedCo />
      <News />
      <Footer />
    </div>
  )
}

export default Page
