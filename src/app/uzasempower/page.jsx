'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Users, TrendingUp, CheckCircle, Star, ArrowRight, Award, Globe, Heart, Building2, DollarSign, Briefcase, Target, UserCheck, GraduationCap, Handshake } from 'lucide-react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('../../components/navbar'))
const Footer = dynamic(() => import('../../components/footer'))
const MagicBento = dynamic(() => import('../../components/MagicBento'))

export default function UZAEmpowerPage() {
  const [currentIntroSlide, setCurrentIntroSlide] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  
  const introSlides = [
    {
      id: 1,
      title: "What is UZA Empower?",
      content: [
        "UZA Empower is a program by UZA Solutions that gives hardworking people a real chance to build their own future.",
        "Many Africans live on less than five dollars a day, not because they lack ambition, but because they lack access. We step in where opportunity is missing, bringing together training, mentorship, and financial support so that people can start sustainable small businesses and regain control over their lives."
      ],
      image: "/story1.jpg",
      bgColor: "bg-[#FBAF43]"
    },
    {
      id: 2,
      title: "Impact You Can Feel",
      content: [
        "Behind every number is a life transformed. Through UZA Empower, ordinary people are becoming entrepreneurs, families are gaining stability, and communities are creating their own opportunities.",
        "Each achievement begins with one person's courage and the support of those who believe in them."
      ],
      image: "/story2.png",
      bgColor: "bg-[#E5243B]",
      stats: [
        { number: "312+", label: "Livelihoods Started", icon: Building2 },
        { number: "68%", label: "Average Income Growth in Six Months", icon: TrendingUp },
        { number: "97%", label: "On-Time Repayment Rate", icon: CheckCircle },
        { number: "2.3", label: "Jobs Created per Enterprise", icon: Briefcase }
      ]
    },
    {
      id: 3,
      title: "Why It Matters",
      content: [
        "Poverty isn't born from laziness; it's born from lack of access. UZA Empower exists to close that gap, giving people the training, tools, and financial support to create their own path.",
        "We don't give handouts. We create owners. Because dignity grows when people can stand on their own. UZA Empower turns potential into progress, and progress into pride."
      ],
      image: "/story3.jpg",
      bgColor: "bg-[#00689D]",
      steps: [
        { title: "Identification & Enrollment", description: "We work hand in hand with local authorities, cooperatives, and community groups to find individuals with the drive to succeed but without access to resources", color: "bg-[#E5243B]", icon: UserCheck },
        { title: "Training & Capacity Building", description: "Each participant receives practical training in entrepreneurship, financial literacy, and small business management", color: "bg-[#DDA63A]", icon: GraduationCap },
        { title: "Lease-to-Own Financing", description: "We provide equipment and materials through a flexible, affordable lease-to-own model where participants repay in small installments based on their income", color: "bg-[#00689D]", icon: Handshake }
      ]
    }
  ]


  const heroImage = '/story3.jpg'

  const stories = [
    {
      name: "Claudine",
      location: "Kigali, Rwanda",
      business: "Flower & Agriculture Business",
      quote: "I used to sell fruits by the roadside, never sure what tomorrow would bring. After joining UZA Empower, I received training in modern agriculture and flower farming. Today, I run my own agricultural business, employ two people, and can finally send my children to school.",
      image: "/story1.jpg",
      story: "Former roadside fruit vendor turned successful flower and agriculture entrepreneur",
      category: "Success Story",
      borderColor: "border-t-[#E5243B]"
    },
    {
      name: "John Bosco Mwamba",
      location: "Rubavu, Rwanda",
      business: "Agricultural Equipment Services",
      quote: "The lease-to-own financing allowed me to purchase farming machinery. Now I provide agricultural equipment services to local farmers and employ 5 people.",
      image: "/story2.png",
      story: "Farmer turned agricultural machinery service provider",
      category: "Entrepreneur",
      borderColor: "border-t-[#19486A]"
    },
    {
      name: "Emmanuel Mukamana",
      location: "Musanze, Rwanda",
      business: "Maize Processing & Packaging",
      quote: "UZA Empower's training and equipment helped me grow from a small maize trader to a commercial maize processing and packaging business serving the whole community.",
      image: "/story3.jpg",
      story: "Small trader turned commercial maize processor",
      category: "Impact Story",
      borderColor: "border-t-[#4C9F38]"
    }
  ]



  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative w-full font-sans bg-transparent">
        {/* Navbar Component */}
        <Navbar initialSolid={false} overlay />

        {/* Hero Section */}
        <div className="relative h-[480px] sm:h-[600px] md:h-[680px] w-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="UZA Empower - Transforming Lives"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/90 via-[#00142B]/70 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 flex h-full items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
            <div className="max-w-2xl text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Turning <span className="text-[#FBAF43]">Ambition</span> into Ownership
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                Across Africa, millions are ready to work, but opportunity is limited. UZA Empower unlocks potential through training, support, and financing—helping people build businesses and lasting independence.
              </p>
              <div className="mt-6 sm:mt-8">
                <Link href="/uzasempower/login">
                  <button className="bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg text-sm md:text-base">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact You Can Feel - Card Layout */}
      <section className="relative z-20 -mt-10 sm:-mt-14 bg-transparent">
        <div className="bg-white rounded-t-[3rem] overflow-hidden py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
          <div className="max-w-7xl mx-auto">
            {/* What is UZA Empower? (ABOUT + MISSION) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start mb-10">
              <div className="lg:col-span-1">
                <h2 className="text-xl md:text-2xl font-bold text-[#00142B] leading-tight mb-2">
                  What is
                </h2>
                <h3 className="text-xl md:text-2xl font-bold text-[#00142B] leading-tight">
                  UZA Empower?
                </h3>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-[#FBAF43] p-5"
                >
                  <div className="mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#00142B]">
                      ABOUT
                    </span>
                  </div>
                  <p className="text-base text-white">
                    {introSlides.find((s) => s.id === 1)?.content?.[0]}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-[#FBAF43] p-5"
                >
                  <div className="mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#00142B]">
                      MISSION
                    </span>
                  </div>
                  <p className="text-base text-white">
                    {introSlides.find((s) => s.id === 1)?.content?.[1]}
                  </p>
                </motion.div>
              </div>
            </div>

            <div>
              {/* Content Cards */}
              <div>
                {/* Description Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-[#FBAF43] p-5 mb-4"
                >
                  <div className="mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#00142B]">
                      IMPACT
                    </span>
                  </div>
                  <p className="text-base text-white">
                    Behind every number is a life transformed. Through UZA Empower, ordinary people are becoming entrepreneurs, families are gaining stability, and communities are creating their own opportunities.
                  </p>
                </motion.div>

                {/* Stats Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {introSlides.find(s => s.id === 2)?.stats.map((stat, index) => {
                    const Icon = stat.icon || Target
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        className="bg-[#FBAF43] p-6"
                      >
                        <div className="mb-3">
                          <Icon className="w-6 h-6 text-[#00142B] mb-2" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                          {stat.number}
                        </div>
                        <p className="text-sm text-white">
                          {stat.label}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Program Introduction Sections - Static with Alternating Layout */}
      {introSlides.filter(slide => slide.id !== 1 && slide.id !== 2 && slide.id !== 3).map((slide, slideIndex) => {
        return (
          <section key={slide.id} className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#F8FAFC] relative">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
                  {/* Content Column */}
                  <motion.div
                    className="lg:order-1"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4 sm:mb-6">
                      {slide.title}
                    </h2>
                    
                    {slide.id === 1 && (
                      <>
                        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 md:mb-8">
                          {slide.content[0]}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                          {slide.content[1]}
                        </p>
                      </>
                    )}
                  </motion.div>
                  
                  {/* Image Column */}
                  <motion.div 
                    className="relative lg:order-2"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden mt-6 lg:mt-0">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Why It Matters - Merged with Join the Movement - UNDP Style */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#00142B]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Column - Why It Matters */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                    Why It Matters
                  </h2>
                  <p className="text-sm md:text-base text-white leading-relaxed mb-8">
                    Poverty isn't born from laziness; it's born from lack of access. UZA Empower exists to close that gap, giving people the training, tools, and financial support to create their own path.
                  </p>
                  <p className="text-sm md:text-base text-white leading-relaxed mb-10">
                    For Organizations: Partner with us to reach more communities, fund new projects, and create lasting livelihoods. Together, we can transform small beginnings into large-scale impact.
                  </p>
                </div>
                <Link 
                  href="#contact"
                  className="inline-flex items-center font-bold text-white hover:text-[#FBAF43] transition-colors text-sm"
                >
                  LEARN MORE <span className="ml-1 text-[#FBAF43]">{'>'}</span>
                </Link>
              </div>

              {/* Right Column - Image, Tabs, and Content */}
              <div>
                {/* Image */}
                <div className="relative h-64 md:h-80 mb-8 overflow-hidden">
                  <Image
                    src="/story3.jpg"
                    alt="UZA Empower Impact"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Tabs */}
                <div className="flex items-center mb-8">
                  {[
                    { id: 0, label: "IDENTIFICATION & ENROLLMENT" },
                    { id: 1, label: "TRAINING & CAPACITY BUILDING" },
                    { id: 2, label: "LEASE-TO-OWN FINANCING" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-[#FBAF43]'
                          : 'border-transparent'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                  <div className="ml-auto text-xs text-gray-300">1/1</div>
                </div>

                {/* Content */}
                <div className="mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-6">
                    {[
                      "Identification & Enrollment",
                      "Training & Capacity Building",
                      "Lease-to-Own Financing"
                    ][activeTab]}
                  </h3>
                  <p className="text-sm text-white leading-relaxed">
                    {activeTab === 0 && "We work hand in hand with local authorities, cooperatives, and community groups to find individuals with the drive to succeed but without access to resources."}
                    {activeTab === 1 && "Each participant receives practical training in entrepreneurship, financial literacy, and small business management. They learn how to turn ideas into real, working enterprises."}
                    {activeTab === 2 && "Once their business begins, we provide equipment and materials through a flexible, affordable lease-to-own model. Participants repay in small installments based on their income, and every repayment supports another new entrepreneur."}
                  </p>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setActiveTab((prev) => (prev === 0 ? 2 : prev - 1))}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    aria-label="Previous"
                  >
                    <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" />
                  </button>
                  <button
                    onClick={() => setActiveTab((prev) => (prev === 2 ? 0 : prev + 1))}
                    className="w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors"
                    aria-label="Next"
                  >
                    <ArrowRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach - Illustration */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Title - Left aligned */}
            <motion.h2 
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-8 sm:mb-10 md:mb-12 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our Approach
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              {/* Image on the left */}
              <motion.div 
                className="relative order-2 lg:order-1"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/illustration.png"
                  alt="UZA Empower Illustration"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl sm:rounded-2xl"
                />
              </motion.div>

              {/* Text on the right */}
              <motion.div 
                className="order-1 lg:order-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  We work hand in hand with local authorities, cooperatives, and community groups to find individuals with the drive to succeed but without access to resources. Each participant receives practical training in entrepreneurship, financial literacy, and small business management. After training, we guide them to start income-generating activities such as soap-making, block manufacturing, or tomato paste production. Once their business begins, we provide equipment and materials through a flexible, affordable lease-to-own model where participants repay in small installments based on their income.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
            </div>

  )
}