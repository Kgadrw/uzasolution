'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, MapPin, Users, Target, CheckCircle, Instagram, ExternalLink, ShoppingCart, Factory, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '@components/navbar'
import Footer from '@components/footer'

export default function CampaignsPage() {
  const [instagramPosts, setInstagramPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Instagram posts data (you can replace this with actual API integration)
  useEffect(() => {
    // Simulate loading Instagram posts
    setTimeout(() => {
      setInstagramPosts([
        {
          id: 1,
          image: '/hero2.jpg',
          caption: 'Wikwigora campaign in action! Helping local businesses source products locally instead of abroad. #Wikwigora #LocalSourcing #UZABulk',
          likes: 1250,
          comments: 89,
          date: '2024-01-15'
        },
        {
          id: 2,
          image: '/hero3.jpg',
          caption: 'Over 10,000 manufacturers connected through our platform. Supporting local industries and communities. #Manufacturing #LocalBusiness',
          likes: 2100,
          comments: 156,
          date: '2024-01-10'
        },
        {
          id: 3,
          image: '/hero.jpg',
          caption: '20M+ products available on UZABulk platform. From electronics to textiles, find everything locally! #UZABulk #Products',
          likes: 1800,
          comments: 203,
          date: '2024-01-05'
        },
        {
          id: 4,
          image: '/hero2.jpg',
          caption: '100,000+ people reached through Wikwigora campaign. Building stronger local economies together! #Impact #Community',
          likes: 3200,
          comments: 445,
          date: '2024-01-01'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Use existing navbar */}
      <Navbar initialSolid={true} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/hero2.jpg" 
            alt="Wikwigora Campaign" 
            fill 
            className="object-cover" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/90 via-[#00142B]/70 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-8 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <span className="w-1.5 h-6 bg-[#FBAF43] rounded mr-3" />
                <span className="uppercase text-xs tracking-widest text-[#FBAF43] font-bold">Campaign</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                Wikwigora
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Stop stressing about products abroad. We connect industries and sellers with local manufacturers nearby. 
                10,000+ manufacturers, 20M+ products, 100,000+ people reached.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#about" className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-8 py-4 rounded-full transition-all">
                  Learn More <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#instagram" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all">
                  <Instagram className="w-5 h-5" />
                  Follow Our Journey
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campaign Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image 
              src="/news3.jpg" 
              alt="Wikwigora Campaign Banner" 
              width={1200}
              height={400}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00142B]/80 via-transparent to-transparent" />
            
          </motion.div>
        </div>
      </section>

      {/* Campaign Stats */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'People Reached', value: '100K+' },
              { icon: Factory, label: 'Manufacturers', value: '10K+' },
              { icon: ShoppingCart, label: 'Products Available', value: '20M+' },
              { icon: Globe, label: 'Countries Served', value: '15+' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#FBAF43]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#FBAF43]" />
                </div>
                <div className="text-3xl font-bold text-[#213348] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Campaign */}
      <section id="about" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#213348] mb-6">
                Wikwigora Revolution
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                <strong>Stop stressing about products abroad.</strong> Wikwigora connects industries and sellers with local manufacturers nearby. 
                We work with 10,000+ manufacturers and 20M+ products on UZABulk platform.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                <strong>100,000+ people reached.</strong> We help businesses find products within their shops nearby, 
                building stronger local economies and supporting local industries.
              </p>
              
              <div className="space-y-4">
                {[
                  '10,000+ manufacturers connected',
                  '20M+ products available',
                  '100,000+ people reached',
                  'Local sourcing made easy',
                  'Stronger local economies'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FBAF43] flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image 
                src="/hero3.jpg" 
                alt="UZABulk Platform" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00142B]/80 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">UZABulk Platform</h3>
                <p className="text-gray-200">Your gateway to local manufacturing</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section id="instagram" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Instagram className="w-8 h-8 text-[#FBAF43]" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#213348]">
                Follow Our Journey
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              See the Wikwigora campaign in action through our Instagram posts. 
              Real stories, real impact, real communities transformed.
            </p>
            <a 
              href="https://www.instagram.com/uza.solutions" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E4405F] to-[#C13584] hover:from-[#D62976] hover:to-[#A02D6A] text-white font-semibold px-8 py-4 rounded-full transition-all"
            >
              <Instagram className="w-5 h-5" />
              Follow @uza.solutions
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FBAF43]"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {instagramPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-64">
                    <Image 
                      src={post.image} 
                      alt="Instagram Post" 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                      <Instagram className="w-4 h-4 inline mr-1" />
                      Post
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.caption}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Stories */}
      <section id="impact" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#213348] mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real businesses that have transformed their sourcing through the Wikwigora campaign and UZABulk platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Local Electronics Store",
                location: "Kigali, Rwanda",
                description: "Found 500+ electronic products from local manufacturers, reducing import costs by 40% and supporting local industry.",
                image: "/hero2.jpg"
              },
              {
                title: "Textile Retailer",
                location: "Huye, Rwanda", 
                description: "Connected with 50+ local textile manufacturers, now sourcing 80% of products locally through UZABulk platform.",
                image: "/hero3.jpg"
              },
              {
                title: "Construction Company",
                location: "Musanze, Rwanda",
                description: "Sourced building materials from 200+ local suppliers, creating jobs and reducing project costs by 30%.",
                image: "/hero2.jpg"
              }
            ].map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image 
                    src={story.image} 
                    alt={story.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#213348] mb-2">{story.title}</h3>
                  <p className="text-[#FBAF43] font-medium mb-3">{story.location}</p>
                  <p className="text-gray-600">{story.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#213348] to-[#0E2A44] rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the Wikwigora Revolution
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Stop stressing about finding products abroad. Join thousands of businesses already sourcing locally 
              through our UZABulk platform and be part of building stronger local economies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.uzabulk.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-8 py-4 rounded-full transition-all"
              >
                Explore UZABulk <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all"
              >
                Get Started Today
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use existing footer */}
      <Footer />
    </div>
  )
}
