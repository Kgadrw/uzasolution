'use client'

import dynamic from 'next/dynamic'

const Catalogues = dynamic(() => import('../../components/Catalogues'))
const Footer = dynamic(() => import('../../components/footer'))
const Navbar = dynamic(() => import('../../components/navbar'))

export default function CataloguesPage() {
  return (
    <div>
      <Navbar />
      <Catalogues />
      <Footer />
    </div>
  )
}

