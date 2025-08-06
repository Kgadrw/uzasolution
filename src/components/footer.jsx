'use client'

import React from 'react'
import Link from 'next/link'
import { FiMail, FiPhone, FiSend } from 'react-icons/fi'
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="bg-[#19283A] text-gray-200 pt-12 pb-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Branding & Contact */}
        <div>
          <img src="/logo.png" alt="UZA Solutions Logo" className="h-10 w-auto mb-6" />
          <div className="flex items-center mb-3 text-sm">
            <FiMail className="text-[#FBAF43] mr-2" />
            <span>info@uzasolutions.com</span>
          </div>
          <div className="flex items-center text-sm">
            <FiPhone className="text-[#FBAF43] mr-2" />
            <span>+250788888888</span>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-base font-bold uppercase tracking-wide text-white mb-4">Useful Link</h3>
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
          <h3 className="text-base font-bold uppercase tracking-wide text-white mb-4">Solutions</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#bulk" className="hover:text-[#FBAF43] transition">UZA Bulk</Link></li>
            <li><Link href="#mall" className="hover:text-[#FBAF43] transition">UZA Mall</Link></li>
            <li><Link href="#logistics" className="hover:text-[#FBAF43] transition">UZA Logistics</Link></li>
            <li><Link href="#cloud" className="hover:text-[#FBAF43] transition">UZA Cloud</Link></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-base font-bold uppercase tracking-wide text-white mb-4">News Letter</h3>
          <p className="text-sm mb-4">Subscribe to our newsletter to receive updates on the latest news!</p>
          <form className="flex items-center bg-[#213348] rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent px-4 py-2 text-sm text-white flex-1 outline-none"
            />
            <button type="submit" className="p-2 text-[#FBAF43] hover:text-white hover:bg-[#FBAF43] transition">
              <FiSend className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-6 border-t border-[#2C3A4B] flex flex-col md:flex-row items-center justify-between text-sm">
        <div className="mb-4 md:mb-0">© 2025 UZA Solutions. All rights reserved by</div>
        <div className="flex gap-3">
          <a href="#" className="bg-[#213348] rounded-full p-2 text-[#FBAF43] hover:bg-[#FBAF43] hover:text-[#213348] transition"><FaFacebookF className="w-4 h-4" /></a>
          <a href="#" className="bg-[#213348] rounded-full p-2 text-[#FBAF43] hover:bg-[#FBAF43] hover:text-[#213348] transition"><FaXTwitter className="w-4 h-4" /></a>
          <a href="#" className="bg-[#213348] rounded-full p-2 text-[#FBAF43] hover:bg-[#FBAF43] hover:text-[#213348] transition"><FaLinkedinIn className="w-4 h-4" /></a>
          <a href="#" className="bg-[#213348] rounded-full p-2 text-[#FBAF43] hover:bg-[#FBAF43] hover:text-[#213348] transition"><FaInstagram className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
}
