'use client'

import dynamic from 'next/dynamic'
import { FileText } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = dynamic(() => import('../../components/footer'))
const Navbar = dynamic(() => import('../../components/navbar'))

export default function NewsPage() {
  return (
    <div>
      <Navbar initialSolid />
      {/* No News Available Section */}
      <section className="py-16 md:py-20 lg:py-24 px-8 md:px-16 lg:px-24 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-[#213348] mb-4">
            No News Available
          </h2>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}


