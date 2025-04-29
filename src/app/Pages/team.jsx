'use client'
import Navbar from '../../components/navbar'
import AboutUs from '../../components/about'
import Footer from '../../components/footer'
import Team from '../../components/team'
import '../app/globals.css'

import React from 'react'

const Page = () => {
  return (
    <div>
        <Navbar />
        <Team />
      <Footer />
    </div>
  )
}

export default Page
