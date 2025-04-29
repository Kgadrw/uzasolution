'use client'
import Abouthero from '../../components/ahero'
import AboutUs from '../../components/about'
import Footer from '../../components/footer'
import Team from '../../components/team'
import '../app/globals.css'

import React from 'react'

const Page = () => {
  return (
    <div>
      <Abouthero/>
      <AboutUs />
      <Team />
      <Footer />
    </div>
  )
}

export default Page
