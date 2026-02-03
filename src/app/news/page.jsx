'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const Footer = dynamic(() => import('../../components/footer'))
const Navbar = dynamic(() => import('../../components/navbar'))

const instagramReels = [
  'https://www.instagram.com/reel/DR4zMf3DJCG/',
  'https://www.instagram.com/reel/DSuEYEQjLGv/',
  'https://www.instagram.com/reel/DTaR1xrjKSe/',
  'https://www.instagram.com/reel/DTuZZKVjK_H/',
  'https://www.instagram.com/reel/DQhKjFGjOIK/',
  'https://www.instagram.com/reel/DQMcM6zDEgV/',
  'https://www.instagram.com/reel/DPve-7hjODv/',
  'https://www.instagram.com/reel/DPb3SuFDJu4/',
  'https://www.instagram.com/reel/DPRVGzMjBVO/',
  'https://www.instagram.com/reel/DPDoWqxDCwi/',
  'https://www.instagram.com/reel/DOycRbIgEnC/',
  'https://www.instagram.com/reel/DOp2TF3DKUw/',
  'https://www.instagram.com/reel/DMLWyh_seQZ/',
]

export default function NewsPage() {
  // Convert Instagram reel URL to embed URL
  const getEmbedUrl = (url) => {
    const reelId = url.split('/reel/')[1]?.split('/')[0]
    return `https://www.instagram.com/reel/${reelId}/embed/`
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar initialSolid overlay />
      {/* News Reels Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Instagram Reels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {instagramReels.map((reelUrl, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group"
              >
                <div className="relative w-full h-[600px] overflow-hidden bg-gray-100">
                  <iframe
                    src={getEmbedUrl(reelUrl)}
                    className="w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allow="encrypted-media"
                    title={`Instagram Reel ${index + 1}`}
                  ></iframe>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


