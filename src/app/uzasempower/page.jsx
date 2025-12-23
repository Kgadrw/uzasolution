'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Users, TrendingUp, CheckCircle, Star, ArrowRight, Award, Globe, Heart, Building2, DollarSign, ChevronLeft, ChevronRight, Briefcase, Target, UserCheck, GraduationCap, Handshake } from 'lucide-react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('../../components/navbar'))
const Footer = dynamic(() => import('../../components/footer'))
const MagicBento = dynamic(() => import('../../components/MagicBento'))

export default function UZAEmpowerPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentIntroSlide, setCurrentIntroSlide] = useState(0)
  
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


  const heroImages = [
    { src: '/negative.jpg', type: 'challenge', title: 'The Challenge', subtitle: 'Displacement-affected communities face barriers to economic empowerment' },
    { src: '/negative1.jpg', type: 'challenge', title: 'The Struggle', subtitle: 'Limited access to capital, markets, and opportunities' },
    { src: '/story1.jpg', type: 'solution', title: 'The Solution', subtitle: 'UZA Empower provides inclusive financing and support' },
    { src: '/story2.png', type: 'solution', title: 'The Impact', subtitle: 'Connected markets accelerate growth and prosperity' },
    { src: '/story3.jpg', type: 'solution', title: 'The Change', subtitle: 'Policy advocacy drives shared prosperity' },
    { src: '/story4.jpg', type: 'solution', title: 'The Future', subtitle: 'Sustainable development through community empowerment' }
  ]

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])


  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section - Matching Homepage Hero Structure */}
      <section className="relative w-full font-sans px-4 md:px-16 lg:px-24 bg-[#F8FAFC]">
        {/* Navbar Component */}
        <Navbar initialSolid={false} />

        {/* -------- Hero Section -------- */}
        <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full md:max-w-[90%] md:mx-auto overflow-hidden group rounded-l-[3rem] rounded-tr-[3rem] rounded-br-[3rem] border-l-4 border-[#19486A]">
          {/* Background Image */}
          {heroImages.map((imageData, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={imageData.src}
                alt="UZA Empower - Transforming Lives"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00142B]/95 via-[#00142B]/80 to-transparent md:bg-gradient-to-r md:from-[#00142B]/95 md:via-[#00142B]/80 md:to-transparent" />

          {/* Hero Content Left-Aligned with responsive padding */}
          <div className="relative z-10 flex h-full items-center px-3 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-32 lg:py-32">
            <div className="max-w-xs sm:max-w-md md:max-w-xl text-left">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-white">
                Turning <span className="text-[#FBAF43]">Ambition</span> into Ownership
              </h1>
              <p className="mt-2 sm:mt-4 md:mt-6 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-200 leading-relaxed">
                Across Africa, millions of people wake up each morning ready to work, but opportunities are limited. UZA Empower exists to change that. We discover potential in overlooked communities, train and support individuals to build small businesses, and help them grow into lasting independence.
              </p>
              <div className="mt-3 sm:mt-6 md:mt-8">
                <Link href="/uzasempower/login">
                  <button className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl text-xs sm:text-sm md:text-base touch-manipulation">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* -------- Slider Arrows -------- */}
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
            className="absolute top-1/2 left-2 sm:left-4 md:left-6 transform -translate-y-1/2 text-white rounded-full p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity touch-manipulation"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)}
            className="absolute top-1/2 right-2 sm:right-4 md:right-6 transform -translate-y-1/2 text-white rounded-full p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity touch-manipulation"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* -------- Slider Dots -------- */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            {heroImages.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all touch-manipulation ${
                  idx === currentImageIndex ? 'bg-[#FBAF43]' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Program Introduction Sections - Static with Alternating Layout */}
      {introSlides.map((slide, slideIndex) => (
        <section key={slide.id} className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#F8FAFC] relative">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className={`grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center ${
                slideIndex % 2 === 0 ? '' : 'lg:grid-flow-dense'
              }`}>
                {/* Content Column - Alternates left/right */}
                <motion.div
                  className={slideIndex % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}
                  initial={{ opacity: 0, x: slideIndex % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4 sm:mb-6">
                    {slide.title}
                  </h2>
                  
                  {/* Content based on slide type */}
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

                  {slide.id === 2 && (
                    <>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 md:mb-8">
                        {slide.content[0]}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-4">
                        {slide.stats.map((stat, index) => {
                          const Icon = stat.icon || Target
                          return (
                            <div key={index} className="text-center">
                              <div className="flex flex-col items-center gap-2 sm:gap-3">
                                <div className="flex items-center justify-center mx-auto">
                                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-[#E5243B]" />
                                </div>
                                <div className="space-y-1">
                                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{stat.number}</div>
                                  <p className="text-[10px] sm:text-xs md:text-xs text-gray-600 font-medium leading-tight px-1">{stat.label}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )}

                  {slide.id === 3 && (
                    <>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 md:mb-8">
                        {slide.content[0]}
                      </p>
                      <div className="space-y-3 sm:space-y-4">
                        {slide.steps.map((step, index) => {
                          const StepIcon = step.icon || Target
                          return (
                            <div key={index} className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${step.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}>
                                <StepIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-[#00142B] mb-1 text-sm sm:text-base">{step.title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-tight">{step.description}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )}
                </motion.div>
                
                {/* Image Column - Alternates right/left */}
                <motion.div 
                  className={`relative ${slideIndex % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
                  initial={{ opacity: 0, x: slideIndex % 2 === 0 ? 30 : -30 }}
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
      ))}

      {/* Core Solutions - Inkomoko Inspired */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-[#F8FAFC] relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-left mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                Join the Movement
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl leading-relaxed">
                For Organizations: Partner with us to reach more communities, fund new projects, and create lasting livelihoods. Together, we can transform small beginnings into large-scale impact.
              </p>
            </div>

            {/* Solutions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              {[
                {
                  title: "Identification & Enrollment",
                  description: "We work hand in hand with local authorities, cooperatives, and community groups to find individuals with the drive to succeed but without access to resources.",
                  icon: DollarSign,
                  color: "from-[#E5243B] to-[#C5192D]",
                  stats: "97% Repayment Rate",
                  details: "Low-interest financing, flexible payment terms, comprehensive support"
                },
                {
                  title: "Training & Capacity Building", 
                  description: "Each participant receives practical training in entrepreneurship, financial literacy, and small business management. They learn how to turn ideas into real, working enterprises.",
                    icon: Globe,
                  color: "from-[#19486A] to-[#00689D]",
                  stats: "68% Income Growth",
                  details: "Supply chain integration, customer acquisition, market intelligence"
                },
                {
                  title: "Lease-to-Own Financing",
                  description: "Once their business begins, we provide equipment and materials through a flexible, affordable lease-to-own model. Participants repay in small installments based on their income, and every repayment supports another new entrepreneur.",
                  icon: Users,
                  color: "from-[#00689D] to-[#19486A]",
                  stats: "312+ Livelihoods",
                  details: "Policy influence, community organizing, stakeholder engagement"
                }
              ].map((solution, index) => {
                const Icon = solution.icon
                  return (
                  <div key={index} className={`group relative`}>
                <div className="rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden relative h-full" 
                     style={{
                       backgroundImage: `url(${index === 0 ? '/negative.jpg' : index === 1 ? '/negative1.jpg' : '/negative.jpg'})`,
                       backgroundSize: 'cover',
                       backgroundPosition: 'center',
                       backgroundRepeat: 'no-repeat'
                     }}>
                      <div className="absolute inset-0 bg-white/90"></div>
                      <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${solution.color} rounded-t-lg sm:rounded-t-xl`}></div>
                  
                      <div className="relative z-10 h-full flex flex-col">
                        <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-br ${solution.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        
                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-[#00689D]">{solution.title}</h3>
                        <p className="text-[#19486A] leading-relaxed text-xs sm:text-sm md:text-sm flex-grow">
                          {solution.description}
                        </p>
                        
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>

          </div>
        </div>
      </section>

      {/* Our Approach - Illustration */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#F8FAFC]">
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