'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Twitter, Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: 'GAHAMANYI BADIANE',
    role: 'Sales & Marketing Officer',
    image: '/badiane.jpeg',
    linkedin: 'https://www.linkedin.com/in/gahamanyi-badiane-303b7919b',
  },
  {
    name: 'HABARUREMA HONORINE',
    role: 'Customer relations officer',
    image: '/honorine.JPG',
    linkedin: 'https://www.linkedin.com/in/habarurema-honorine-611509360/',
  },
  {
    name: 'GAD KALISA',
    role: 'Software Engineer',
    image: '/kalisa.jpeg',
    linkedin: 'https://www.linkedin.com/in/gad-kalisa-521225339/',
  },
];

export default function AboutPage() {
  return (
    <div className="w-full">

      {/* Short UzaBulk Story with CEO */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-gray-50">
        {/* Decorative Lines - Hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {/* Vertical Lines - Less visible with gradient edges */}
          <div className="absolute left-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-200/10 to-transparent"></div>
          <div className="absolute left-2/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-200/10 to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center relative z-10">
          
          {/* CEO Image - Top on mobile, right on desktop */}
          <motion.div
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 mx-auto order-1 md:order-2 rounded-xl overflow-hidden border-4 border-gray-300"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/yves.jpeg"
              alt="Yves N. Iradukunda"
              fill
              className="object-cover object-top" 
              priority
            />
          </motion.div>

          {/* Story Text - Below image on mobile, left on desktop */}
          <motion.div
            className="text-gray-800 order-2 md:order-1 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl text-[#FBAF43] font-extrabold mb-3 sm:mb-4">The UzaBulk Story</h2>
            <p className="text-sm sm:text-base md:text-base mb-3 sm:mb-4 leading-relaxed">
              Founded to create transparent trade for African businesses, UzaBulk connects companies directly to factories with no middlemen. The mission is to make trade fair, accessible, and affordable for all African businesses.
            </p>
            <p className="font-semibold text-[#FBAF43] mb-3 sm:mb-4">Yves N. Iradukunda — CEO</p>
            <div className="flex justify-center md:justify-start space-x-8">
              <a href="https://www.linkedin.com/in/iradukunda-yves-566194317/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-blue-700 transition" />
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Meet Our Team */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-gray-50">
        {/* Decorative Lines - Hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {/* Horizontal Lines - Less visible with gradient edges */}
          <div className="absolute top-1/3 w-full h-px bg-gradient-to-r from-transparent via-gray-200/10 to-transparent"></div>
          <div className="absolute top-2/3 w-full h-px bg-gradient-to-r from-transparent via-gray-200/10 to-transparent"></div>

          {/* Vertical Lines - Less visible with gradient edges */}
          <div className="absolute left-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-200/10 to-transparent"></div>
          <div className="absolute left-2/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-200/10 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12 relative z-10">
          <motion.h2
            className="text-2xl md:text-3xl text-[#FBAF43] font-extrabold mb-2 sm:mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Team
          </motion.h2>
          <p className="text-gray-700 text-sm sm:text-base mt-2">The talented people driving UzaBulk forward.</p>
        </div>

        {/* Team Members Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center sm:items-start text-center sm:text-left w-full max-w-xs mx-auto sm:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              {/* Profile Image */}
              <div className="relative w-full h-56 sm:h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover filter grayscale object-[center_20%] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>

              {/* Name & Role */}
              <h3 className="font-semibold text-lg sm:text-xl text-[#0f172a] mb-1 sm:mb-2">{member.name}</h3>
              <p className="text-[#0f172a] text-sm sm:text-base mb-3 sm:mb-4">{member.role}</p>

              {/* Social Icons */}
              <div className="flex justify-center sm:justify-start space-x-4">
                <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-blue-700 transition" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
