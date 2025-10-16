'use client'

import React from 'react'
import Link from 'next/link'
import { FiMail, FiPhone } from 'react-icons/fi'
import { MapPin, Globe, Heart } from 'lucide-react'
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="bg-[#00142B] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FBAF43' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
            {/* Branding & Mission */}
        <div className="lg:col-span-1">
              <div className="mb-6">
                <img src="/logo.png" alt="UZA Solutions Logo" className="h-12 w-auto mb-4" />
                <p className="text-gray-300 leading-relaxed mb-6">
                  Empowering displacement-affected communities through entrepreneurship, innovation, and sustainable development across Africa.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <FiMail className="text-[#FBAF43] mr-3 w-5 h-5" />
                  <span className="text-sm">info@uzasolutions.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FiPhone className="text-[#FBAF43] mr-3 w-5 h-5" />
                  <span className="text-sm">+250 788 371 081</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="text-[#FBAF43] mr-3 w-5 h-5" />
                  <span className="text-sm">Kigali, Rwanda</span>
          </div>
          </div>
        </div>

            {/* Quick Links */}
        <div>
              <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-300 hover:text-[#FBAF43] transition-colors duration-300 text-sm">About Us</Link></li>
                <li><Link href="/uzasempower" className="text-gray-300 hover:text-[#FBAF43] transition-colors duration-300 text-sm">UZA Empower</Link></li>
                <li><Link href="/uzabulk" className="text-gray-300 hover:text-[#FBAF43] transition-colors duration-300 text-sm">UZA Bulk</Link></li>
                <li><Link href="/uzamall" className="text-gray-300 hover:text-[#FBAF43] transition-colors duration-300 text-sm">UZA Mall</Link></li>
                <li><Link href="/uzalogistics" className="text-gray-300 hover:text-[#FBAF43] transition-colors duration-300 text-sm">UZA Logistics</Link></li>
          </ul>
        </div>

            {/* Resources */}
        <div>
              <h3 className="text-lg font-bold text-white mb-6">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/news" className="text-gray-300 hover:text-[#FBAF43] transition-colors duration-300 text-sm">News & Updates</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-[#FBAF43] transition-colors duration-300 text-sm">Contact Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-[#FBAF43] transition-colors duration-300 text-sm">Partner with Us</Link></li>
                <li><Link href="/uzacloud" className="text-gray-300 hover:text-[#FBAF43] transition-colors duration-300 text-sm">UZA Cloud</Link></li>
                <li><Link href="/portfolio" className="text-gray-300 hover:text-[#FBAF43] transition-colors duration-300 text-sm">Portfolio</Link></li>
          </ul>
        </div>

            {/* Social & Newsletter */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Stay Connected</h3>
              <p className="text-gray-300 text-sm mb-6">
                Follow us for updates on our impact and opportunities to get involved.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4 mb-6">
                <a href="https://www.facebook.com/uzasolutions" className="w-10 h-10 bg-[#FBAF43] rounded-full flex items-center justify-center text-[#00142B] hover:bg-white transition-colors duration-300">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="https://www.twitter.com/uzasolutions" className="w-10 h-10 bg-[#FBAF43] rounded-full flex items-center justify-center text-[#00142B] hover:bg-white transition-colors duration-300">
                  <FaXTwitter className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/uza-solutions-aa5353362/" className="w-10 h-10 bg-[#FBAF43] rounded-full flex items-center justify-center text-[#00142B] hover:bg-white transition-colors duration-300">
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/uza.solutions" className="w-10 h-10 bg-[#FBAF43] rounded-full flex items-center justify-center text-[#00142B] hover:bg-white transition-colors duration-300">
                  <FaInstagram className="w-4 h-4" />
                </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center text-gray-400 text-sm">
                <Heart className="w-4 h-4 text-[#FBAF43] mr-2" />
                <span>© 2025 UZA Solutions. All rights reserved. Made with impact in mind.</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-[#FBAF43] transition-colors duration-300">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-[#FBAF43] transition-colors duration-300">Terms of Service</Link>
                <div className="flex items-center text-gray-400">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>English</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
