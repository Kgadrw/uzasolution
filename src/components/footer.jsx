// components/Footer.tsx
'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#213348] text-white font-[Monospace] px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10 w-20 mb-4" />
          </Link>
          <p className="text-sm">
            Empowering businesses with smart tools to grow, manage, and optimize their digital workflows.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2">Explore</h3>
          <Link href="/marketplace" className="hover:text-[#FBAF43]">Marketplace</Link>
          <Link href="/how-it-works" className="hover:text-[#FBAF43]">How It Works</Link>
          <Link href="/solutions" className="hover:text-[#FBAF43]">Solutions</Link>
          <Link href="/tools" className="hover:text-[#FBAF43]">Tools</Link>
        </div>

        {/* Contact / Socials */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p>Email: info@uzasolutions.com</p>
          <p>Phone: + 250 788 371 081</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-[#FBAF43]">Twitter</a>
            <a href="#" className="hover:text-[#FBAF43]">LinkedIn</a>
            <a href="#" className="hover:text-[#FBAF43]">TikTok</a>
            <a href="#" className="hover:text-[#FBAF43]">Instagram</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 text-center text-sm border-t border-gray-600 pt-6">
        © {new Date().getFullYear()} Uzasolution ltd . All rights reserved.
      </div>
    </footer>
  )
}
