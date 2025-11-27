'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Users, TrendingUp, CheckCircle, Star, ArrowRight, Award, Globe, Heart, Building2, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('../../components/navbar'))
const Footer = dynamic(() => import('../../components/footer'))
const ImpactCardsSection = dynamic(() => import('../../components/ImpactCardsSection'))
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
        { number: "312+", label: "Livelihoods Started", color: "bg-[#E5243B]" },
        { number: "68%", label: "Average Income Growth in Six Months", color: "bg-[#DDA63A]" },
        { number: "97%", label: "On-Time Repayment Rate", color: "bg-[#4C9F38]" },
        { number: "2.3", label: "Jobs Created per Enterprise", color: "bg-[#FF3A21]" }
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
        { number: "1", title: "Identification & Enrollment", description: "We work hand in hand with local authorities, cooperatives, and community groups to find individuals with the drive to succeed but without access to resources", color: "bg-[#E5243B]" },
        { number: "2", title: "Training & Capacity Building", description: "Each participant receives practical training in entrepreneurship, financial literacy, and small business management", color: "bg-[#DDA63A]" },
        { number: "3", title: "Lease-to-Own Financing", description: "We provide equipment and materials through a flexible, affordable lease-to-own model where participants repay in small installments based on their income", color: "bg-[#00689D]" }
      ]
    }
  ]

  const nextIntroSlide = () => {
    setCurrentIntroSlide((prevIndex) => 
      prevIndex === introSlides.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevIntroSlide = () => {
    setCurrentIntroSlide((prevIndex) => 
      prevIndex === 0 ? introSlides.length - 1 : prevIndex - 1
    )
  }

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

  // Swipe functionality for mobile
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextIntroSlide()
    }
    if (isRightSwipe) {
      prevIntroSlide()
    }
  }

  // Auto-slide intro slides on mobile
  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth < 768
    }
    
    if (!checkMobile()) return

    const interval = setInterval(() => {
      setCurrentIntroSlide((prevIndex) => 
        prevIndex === introSlides.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change every 5 seconds on mobile

    return () => clearInterval(interval)
  }, [introSlides.length])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Rotating Images with Text Overlays */}
      <section className="relative h-[450px] sm:h-[550px] md:h-[600px] lg:h-[700px] overflow-hidden flex items-center justify-center rounded-b-[1.5rem] sm:rounded-b-[2rem] md:rounded-b-[3rem] border-b-0 sm:border-b-4 border-[#19486A]">
        {heroImages.map((imageData, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}>
        <Image
              src={imageData.src}
          alt="UZA Empower - Transforming Lives"
          fill
          className="object-cover"
              priority={index === 0}
            />
            
            {/* Blue gradient overlay for all images - Enhanced for mobile */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#19486A]/85 via-[#19486A]/90 to-[#19486A]/60"></div>
            
            {/* Hero Text Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl px-4 sm:px-6 md:px-8 lg:px-16">
                
               <motion.h1 
                 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight font-bold" 
                 style={{ fontFamily: 'Comfortaa, sans-serif' }}
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
               >
                 Turning <span className="text-[#FBAF43]">Ambition</span> into Ownership
               </motion.h1>
               
               <motion.p 
                 className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-12 max-w-4xl leading-relaxed font-medium" 
                 style={{ fontFamily: 'Comfortaa, sans-serif' }}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
               >
                 Across Africa, millions of people wake up each morning ready to work, but opportunities are limited. UZA Empower exists to change that. We discover potential in overlooked communities, train and support individuals to build small businesses, and help them grow into lasting independence.
               </motion.p>
                
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link href="/uzasempower/login">
                    <motion.button 
                      className="group px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-110 shadow-2xl bg-[#DDA63A] hover:bg-[#C7A03A] text-[#00142B] flex items-center justify-center space-x-2 sm:space-x-3 touch-manipulation min-h-[44px] sm:min-h-[48px]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Partner with Us</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                  </Link>
                  </motion.div>
                </div>
              </div>

                  </div>
        ))}
        
        {/* Image indicator dots */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((imageData, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                index === currentImageIndex 
                  ? imageData.type === 'challenge'
                    ? 'bg-[#FF3A21] scale-125'
                    : 'bg-[#DDA63A] scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
                  </div>
      </section>

      {/* Program Introduction Slider */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto relative">
            <motion.div 
              className={`bg-white rounded-xl sm:rounded-2xl border-t-2 sm:border-t-4 p-4 sm:p-6 md:p-8 lg:p-12 ${
                introSlides[currentIntroSlide].id === 1 ? 'border-[#FBAF43]' :
                introSlides[currentIntroSlide].id === 2 ? 'border-[#19486A]' :
                'border-[#4C9F38]'
              }`}
              key={currentIntroSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
                {/* Left Column - Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.h2 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4 sm:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {introSlides[currentIntroSlide].title}
                  </motion.h2>
                  
                  {/* Content based on slide type */}
                  {introSlides[currentIntroSlide].id === 1 && (
                    <>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 md:mb-8">
                        {introSlides[currentIntroSlide].content[0]}
                      </p>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                        {introSlides[currentIntroSlide].content[1]}
                      </p>
                    </>
                  )}

                  {introSlides[currentIntroSlide].id === 2 && (
                    <>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 md:mb-8">
                        {introSlides[currentIntroSlide].content[0]}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-4">
                        {introSlides[currentIntroSlide].stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-2`}>
                              <span className="text-white font-bold text-xs sm:text-sm md:text-base">{stat.number}</span>
                  </div>
                            <p className="text-[10px] sm:text-xs md:text-xs text-gray-600 font-medium leading-tight px-1">{stat.label}</p>
                </div>
                        ))}
              </div>
                    </>
                  )}

                  {introSlides[currentIntroSlide].id === 3 && (
                    <>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 md:mb-8">
                        {introSlides[currentIntroSlide].content[0]}
                      </p>
                      <div className="space-y-3 sm:space-y-4">
                        {introSlides[currentIntroSlide].steps.map((step, index) => (
                          <div key={index} className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                            <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ${step.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                              <span className="text-white font-bold text-xs sm:text-sm">{step.number}</span>
                  </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-[#00142B] mb-1 text-sm sm:text-base">{step.title}</h4>
                              <p className="text-xs sm:text-sm text-gray-600 leading-tight">{step.description}</p>
                  </div>
                </div>
                        ))}
              </div>
                    </>
                  )}
                  </motion.div>
                  
                {/* Right Column - Image */}
                <motion.div 
                  className="relative block md:block"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div 
                    className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden mt-6 lg:mt-0"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={introSlides[currentIntroSlide].image}
                      alt={introSlides[currentIntroSlide].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
            <button 
              onClick={prevIntroSlide}
              className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 lg:-translate-x-12 xl:-translate-x-20 bg-white/90 hover:bg-white backdrop-blur-sm rounded-lg border-t-4 border-[#19486A] p-3 shadow-lg transition-all duration-300 group z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-[#19486A] group-hover:scale-110 transition-transform" />
            </button>
            
            <button 
              onClick={nextIntroSlide}
              className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8 lg:translate-x-12 xl:translate-x-20 bg-white/90 hover:bg-white backdrop-blur-sm rounded-lg border-t-4 border-[#19486A] p-3 shadow-lg transition-all duration-300 group z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-[#19486A] group-hover:scale-110 transition-transform" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
              {introSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIntroSlide(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                    index === currentIntroSlide 
                      ? 'bg-[#FBAF43] scale-125' 
                      : 'bg-gray-400 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Solutions - Inkomoko Inspired */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 lg:mb-8 px-2">
                Join the Movement
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
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
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Title - Left aligned */}
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-8 sm:mb-10 md:mb-12 text-left"
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

      {/* Impact Cards Section */}
      <ImpactCardsSection />

      {/* Real Voices - Client Success Stories */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div 
              className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 px-4" 
                style={{ fontFamily: 'Comfortaa, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Real Stories. Real Change.
              </motion.h2>
              <motion.p 
                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Every person we work with carries a story of strength. UZA Empower doesn't just create businesses — it rebuilds lives, restores confidence, and brings hope back home.
              </motion.p>
            </motion.div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {stories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Image Section */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`bg-white text-[#00142B] px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${story.borderColor} border-t-2`}>
                        {story.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 sm:p-6">
                    {/* Quote */}
                    <div className="mb-4">
                      <svg className="w-8 h-8 text-[#FBAF43] mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic">
                        "{story.quote}"
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 mb-4"></div>

                    {/* Author Info */}
                    <div className="flex items-start gap-3">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full overflow-hidden border-2 border-[#FBAF43]">
                        <Image
                          src={story.image}
                          alt={story.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-[#00142B] mb-1">
                          {story.name}
                        </h3>
                        <p className="text-sm text-[#FBAF43] font-semibold mb-1">
                          {story.business}
                        </p>
                        <p className="text-xs text-gray-500">
                          {story.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <Footer />
            </div>

  )
}