'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, MapPin, Users, Target, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '@components/navbar'
import Footer from '@components/footer'

export default function CampaignsPage() {
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
                Empowering communities through sustainable development and economic growth across Rwanda.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#about" className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-8 py-4 rounded-full transition-all">
                  Learn More <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#impact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all">
                  View Impact
                </a>
              </div>
            </motion.div>

            
          </div>
        </div>
      </section>

      {/* Campaign Stats */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'Communities Reached', value: '50+' },
              { icon: Target, label: 'Projects Completed', value: '200+' },
              { icon: MapPin, label: 'Districts Covered', value: '15' },
              { icon: Calendar, label: 'Years Active', value: '3+' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
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
                About Wikwigora
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Wikwigora, meaning "to develop" in Kinyarwanda, is our flagship community development campaign. 
                We work directly with local communities to identify needs, implement sustainable solutions, 
                and create lasting economic opportunities.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Through strategic partnerships with local governments, NGOs, and community leaders, 
                we've successfully delivered infrastructure projects, skills training programs, 
                and economic development initiatives across Rwanda.
              </p>
              
              <div className="space-y-4">
                {[
                  'Community-driven development approach',
                  'Sustainable infrastructure projects',
                  'Skills training and capacity building',
                  'Economic empowerment programs',
                  'Environmental conservation initiatives'
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
                alt="Community Development" 
                fill 
                className="object-cover" 
              />
            </motion.div>
          </div>
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
              Our Impact Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from communities we've transformed through the Wikwigora campaign.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Water Access Project",
                location: "Nyagatare District",
                description: "Installed 5 boreholes serving 2,000+ families with clean drinking water.",
                image: "/hero2.jpg"
              },
              {
                title: "Skills Training Center",
                location: "Huye District", 
                description: "Built vocational training center training 500+ youth in technical skills.",
                image: "/hero3.jpg"
              },
              {
                title: "Market Infrastructure",
                location: "Musanze District",
                description: "Constructed modern market facilities benefiting 300+ local traders.",
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
              Join the Wikwigora Movement
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Be part of sustainable community development. Partner with us to create lasting impact 
              in communities across Rwanda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-8 py-4 rounded-full transition-all"
              >
                Partner With Us <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all"
              >
                Learn More
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
