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
      <section className="relative pt-32 pb-16 px-6 md:px-20 bg-gray-50">
        {/* Decorative Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Vertical Lines */}
          <div className="absolute left-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-200/30 to-transparent"></div>
          <div className="absolute left-2/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-200/30 to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* CEO Image - Top on mobile, right on desktop */}
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80 mx-auto order-1 md:order-2 rounded-xl overflow-hidden border-4 border-gray-300"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/yves.jpeg"
              alt="Yves N. Iradukunda"
              fill
              className="object-cover  object-top" 
              priority
            />
          </motion.div>

          {/* Story Text - Below image on mobile, left on desktop */}
          <motion.div
            className="text-gray-800 order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            <h2 className="text-3xl md:text-4xl text-[#FBAF43] font-extrabold mb-4">The UzaBulk Story</h2>
            <p className="text-sm md:text-base mb-4">
              Founded to create transparent trade for African businesses, UzaBulk connects companies directly to factories with no middlemen. The mission is to make trade fair, accessible, and affordable for all African businesses.
            </p>
            <p className="font-semibold text-[#FBAF43]">Yves N. Iradukunda — CEO</p>
            <div className="flex space-x-8">
          
          <a href= "https://www.linkedin.com/in/iradukunda-yves-566194317/" target="_blank" rel="noreferrer">
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-700  transition" />
          </a>
        </div>
          </motion.div>

        </div>
      </section>

      {/* Meet Our Team */}
      <section className="relative py-16 px-6 md:px-20 bg-gray-50">
        {/* Decorative Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Horizontal Lines */}
          <div className="absolute top-1/3 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute top-2/3 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

          {/* Vertical Lines */}
          <div className="absolute left-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute left-2/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center mb-12 relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl text-[#FBAF43] font-extrabold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Team
          </motion.h2>
          <p className="text-gray-700 mt-2">The talented people driving UzaBulk forward.</p>
        </div>

        {/* Meet Our Team */}
<section className="relative py-16 px-6 md:px-20 bg-gray-50">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 relative z-10 justify-items-center">
    {teamMembers.map((member, idx) => (
      <motion.div
        key={idx}
        className="flex flex-col items-start text-left w-full max-w-xs"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: idx * 0.2 }}
      >
        {/* Profile Image */}
        <div className="relative w-full h-64 mb-4">
  <Image
    src={member.image}
    alt={member.name}
    fill
    className="object-cover filter grayscale  object-[center_20%] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
    priority
  />
</div>


        {/* Name & Role */}
        <h3 className="font-semibold text-xl text-[#0f172a]">{member.name}</h3>
        <p className="text-[#0f172a] text-sm mb-4">{member.role}</p>

        {/* Social Icons */}
        <div className="flex space-x-4">
          
          <a href={member.linkedin} target="_blank" rel="noreferrer">
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-700  transition" />
          </a>
        </div>
      </motion.div>
    ))}
  </div>
</section>


      </section>
    </div>
  );
}
