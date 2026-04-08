'use client'

import React from 'react'
import Link from 'next/link'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="bg-[#00142B] text-white rounded-t-[3rem]">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Social icons (top) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://www.twitter.com/uzasolutions"
              aria-label="Twitter"
              className="w-10 h-10 bg-[#FBAF43] rounded-full flex items-center justify-center text-[#00142B] hover:bg-white transition-colors duration-300"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href="https://www.twitter.com/uzasolutions"
              aria-label="X (Twitter)"
              className="w-10 h-10 bg-[#FBAF43] rounded-full flex items-center justify-center text-[#00142B] hover:bg-white transition-colors duration-300"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/uzasolutions"
              aria-label="Facebook"
              className="w-10 h-10 bg-[#FBAF43] rounded-full flex items-center justify-center text-[#00142B] hover:bg-white transition-colors duration-300"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/uza-solutions-aa5353362/"
              aria-label="LinkedIn"
              className="w-10 h-10 bg-[#FBAF43] rounded-full flex items-center justify-center text-[#00142B] hover:bg-white transition-colors duration-300"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/"
              aria-label="YouTube"
              className="w-10 h-10 bg-[#FBAF43] rounded-full flex items-center justify-center text-[#00142B] hover:bg-white transition-colors duration-300"
            >
              <FaYoutube className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/uza.solutions"
              aria-label="Instagram"
              className="w-10 h-10 bg-[#FBAF43] rounded-full flex items-center justify-center text-[#00142B] hover:bg-white transition-colors duration-300"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>

          {/* Contact us */}
          <Link
            href="/contact"
            className="text-sm sm:text-base font-semibold hover:text-[#FBAF43] transition-colors duration-300"
          >
            Contact us
          </Link>

          {/* Copyright */}
          <div className="text-gray-300 text-xs sm:text-sm">
            Copyright © 2026 UZASOLUTIONS. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
