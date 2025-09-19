'use client'

import dynamic from 'next/dynamic'

const Story = dynamic(() => import('../../components/story'))
const Footer = dynamic(() => import('../../components/footer'))
const Navbar = dynamic(() => import('../../components/navbar'))

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <Story />
      <Footer />
    </div>
  )
}


