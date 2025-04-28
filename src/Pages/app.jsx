import Link from 'next/link'
import React from 'react'
import HomePage from './about'  // Renamed the imported Home to HomePage
import Abouthero from '../components/ahero'
import About from '../Pages/about'

export default function Home() {
  return (
    <div>
      <Link href="/"></Link>  {/* Added text inside the link */}
      <Link href="/how"></Link>
      <Link href="/team"></Link>
      <Link href="/about"></Link>

    </div>
  )
}
