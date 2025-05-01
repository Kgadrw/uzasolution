'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import client from '../sanityClient' // Adjust the path if needed

export default function Footer() {
  const [footerData, setFooterData] = useState(null)

  useEffect(() => {
    async function fetchFooter() {
      try {
        const res = await client.fetch(`*[_type == "footer"][0]{
          description,
          contactEmail,
          contactPhone,
          socialLinks
        }`)
        setFooterData(res)
      } catch (error) {
        console.error("Failed to fetch footer data:", error)
      }
    }

    fetchFooter()
  }, [])

  return (
    <footer className="bg-[#213348] text-white font-[Montserrat] px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10 w-20 mb-4" />
          </Link>
          <p className="text-sm">
            {footerData?.description || 'Empowering businesses with smart tools to grow, manage, and optimize their digital workflows.'}
          </p>
        </div>

        {/* Navigation Links (Static) */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2">Explore</h3>
          <Link href="/#about" className="hover:text-[#FBAF43]" onClick={() => setShowMobileMenu(false)}>About Us</Link>
          <Link href="/#projects" className="hover:text-[#FBAF43]" onClick={() => setShowMobileMenu(false)}>Our Projects</Link>
          <Link href="/#why" className="hover:text-[#FBAF43]" onClick={() => setShowMobileMenu(false)}>Why Uza?</Link>
          <Link href="/#news" className="hover:text-[#FBAF43]" onClick={() => setShowMobileMenu(false)}>News</Link>
        </div>

        {/* Contact / Socials (Dynamic from Sanity) */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p>Email: {footerData?.contactEmail || 'info@uzasolutions.com'}</p>
          <p>Phone: {footerData?.contactPhone || '+250 788 371 081'}</p>
          <div className="flex space-x-4 mt-2">
            {footerData?.socialLinks?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBAF43]"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar (Static) */}
      <div className="mt-12 text-center text-sm border-t border-gray-600 pt-6">
        © {new Date().getFullYear()} Uzasolution Ltd. All rights reserved.
      </div>
    </footer>
  )
}
