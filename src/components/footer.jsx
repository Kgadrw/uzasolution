'use client'

import React from 'react'
import Link from 'next/link'
import { FiMail, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="bg-[#19283A] text-gray-200 pt-12 pb-6 px-6 md:px-12 antialiased">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Branding & Contact */}
        <div className="lg:col-span-1">
          <img src="/logo.png" alt="UZA Solutions Logo" className="h-10 w-auto mb-6" />
          <div className="flex items-center mb-3 text-sm">
            <FiMail className="text-[#FBAF43] mr-2" />
            <span>info@uzasolutions.com</span>
          </div>
          <div className="flex items-center text-sm">
            <FiPhone className="text-[#FBAF43] mr-2" />
            <span>+250 788 371 081</span>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-base font-bold tracking-wide text-white mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#about" className="hover:text-[#FBAF43] transition">About Us</Link></li>
            <li><Link href="#campaigns" className="hover:text-[#FBAF43] transition">Campaigns</Link></li>
            <li><Link href="#news" className="hover:text-[#FBAF43] transition">News & Trends</Link></li>
            <li><Link href="#contact" className="hover:text-[#FBAF43] transition">Contact Us</Link></li>
            <li><Link href="#partner" className="hover:text-[#FBAF43] transition">Partner with Us</Link></li>
            <li><Link href="#privacy" className="hover:text-[#FBAF43] transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-base font-bold tracking-wide text-white mb-4">Solutions</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#bulk" className="hover:text-[#FBAF43] transition">UZA Bulk</Link></li>
            <li><Link href="#mall" className="hover:text-[#FBAF43] transition">UZA Mall</Link></li>
            <li><Link href="#logistics" className="hover:text-[#FBAF43] transition">UZA Logistics</Link></li>
            <li><Link href="#cloud" className="hover:text-[#FBAF43] transition">UZA Cloud</Link></li>
          </ul>
        </div>

        {/* Map */}
        <div className="lg:col-span-1">
          <h3 className="text-base font-bold tracking-wide text-white mb-4">Our Location</h3>
          <div className="mt-2  overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d127600.74046948539!2d29.976706427443276!3d-1.943525891566445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x19dca5bad4fbd373%3A0xe9b0424afd612b26!2sKN%202%20St%2C%20Kigali!3m2!1d-1.9435278999999999!2d30.0591084!5e0!3m2!1sen!2srw!4v1757073774622!5m2!1sen!2srw"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-6 px-12 border-t border-[#2C3A4B] flex flex-col md:flex-row items-center justify-between text-sm">
        <div className="mb-4 md:mb-0">© 2025 UZA Solutions. All rights reserved</div>
        <div className="flex gap-3">
          <a href="#" className="bg-[#213348] rounded-full p-2 text-[#FBAF43] hover:bg-[#FBAF43] hover:text-[#213348] transition"><FaFacebookF className="w-4 h-4" /></a>
          <a href="#" className="bg-[#213348] rounded-full p-2 text-[#FBAF43] hover:bg-[#FBAF43] hover:text-[#213348] transition"><FaXTwitter className="w-4 h-4" /></a>
          <a href="#" className="bg-[#213348] rounded-full p-2 text-[#FBAF43] hover:bg-[#FBAF43] hover:text-[#213348] transition"><FaLinkedinIn className="w-4 h-4" /></a>
          <a href="#" className="bg-[#213348] rounded-full p-2 text-[#FBAF43] hover:bg-[#FBAF43] hover:text-[#213348] transition"><FaInstagram className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  )
}
