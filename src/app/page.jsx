'use client'
import Hero from '../components/hero'
import AboutUs from '../components/about'
import TrustedCo from '../components/trusted'
import Projects from '../components/projects'
import Footer from '../components/footer'
import Why from '../components/why'
import News from '../components/news'

import React from 'react'

const Page = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Projects />
      <Why />
      <TrustedCo />
      <News />
      <Footer />
    </div>
  )
}

export default Page
