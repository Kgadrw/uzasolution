'use client'

import dynamic from 'next/dynamic'

const PortfolioSection = dynamic(() => import('../../components/Portfolio'))
const Footer = dynamic(() => import('../../components/footer'))
const Navbar = dynamic(() => import('../../components/navbar'))
const Testimonials = dynamic(() => import('../../components/testimonials'))

export default function PortfolioPage() {
  return (
    <div>
      <Navbar />
      <PortfolioSection />
      
      <Footer />
    </div>
  )
}


