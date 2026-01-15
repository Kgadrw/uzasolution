'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Twitter, Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: 'Yves N. Iradukunda',
    role: 'CEO',
    image: '/yves.jpeg',
    linkedin: 'https://www.linkedin.com/in/iradukunda-yves-566194317/',
  },
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
      {/* Meet Our Team */}
      <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-gray-50">
        {/* Decorative Lines - Hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {/* Horizontal Lines - Less visible with gradient edges */}
          <div className="absolute top-1/3 w-full h-px bg-gradient-to-r from-transparent via-gray-200/10 to-transparent"></div>
          <div className="absolute top-2/3 w-full h-px bg-gradient-to-r from-transparent via-gray-200/10 to-transparent"></div>

          {/* Vertical Lines - Less visible with gradient edges */}
          <div className="absolute left-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-200/10 to-transparent"></div>
          <div className="absolute left-2/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-200/10 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto text-left mb-8 sm:mb-12 relative z-10">
          <motion.h2
            className="text-2xl md:text-3xl text-[#FBAF43] font-extrabold mb-2 sm:mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Team
          </motion.h2>
        </div>

        {/* Team Members Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-4 relative z-10">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-start text-left w-full max-w-xs"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              {/* Profile Image */}
              <div className="relative w-full h-80 sm:h-96 mb-4 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover filter grayscale object-[center_20%]"
                  priority
                />
                {/* LinkedIn Icon - Top Right */}
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 hover:text-blue-700 transition-colors" />
                </a>
              </div>

              {/* Name & Role */}
              <h3 className="font-medium text-base sm:text-lg text-[#0f172a] mb-1 sm:mb-2">{member.name}</h3>
              <p className="text-[#0f172a] text-xs sm:text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
