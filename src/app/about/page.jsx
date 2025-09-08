'use client'

import dynamic from 'next/dynamic'

const AboutUs = dynamic(() => import('../../components/about'))
const Footer = dynamic(() => import('../../components/footer'))
const Navbar = dynamic(() => import('../../components/navbar'))

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <AboutUs />
      <Footer />
    </div>
  )
}


