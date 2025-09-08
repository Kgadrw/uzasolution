'use client'

import dynamic from 'next/dynamic'

const Contact = dynamic(() => import('../../components/contact'))
const Footer = dynamic(() => import('../../components/footer'))
const Navbar = dynamic(() => import('../../components/navbar'))

export default function ContactPage() {
  return (
    <div>
      <Navbar initialSolid />
      <Contact />
      <Footer />
    </div>
  )
}


