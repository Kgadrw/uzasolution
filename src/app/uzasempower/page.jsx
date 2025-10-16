'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Users, TrendingUp, CheckCircle, Star, ArrowRight, Award, Globe, Heart, Building2, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('../../components/navbar'))
const Footer = dynamic(() => import('../../components/footer'))
const ImpactCardsSection = dynamic(() => import('../../components/ImpactCardsSection'))
const MagicBento = dynamic(() => import('../../components/MagicBento'))

export default function UZAEmpowerPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [currentIntroSlide, setCurrentIntroSlide] = useState(0)
  
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
      name: "Claude Uwimana",
      location: "Kigali, Rwanda",
      business: "Fruit & Flower Farming",
      quote: "UZA Empower gave me the equipment and training I needed to start my fruit and flower farming business. In just 8 months, my income increased by 300%.",
      image: "/story1.jpg",
      story: "Former street vendor turned successful fruit and flower farmer",
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

  const nextStory = () => {
    setCurrentStoryIndex((prevIndex) => 
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevStory = () => {
    setCurrentStoryIndex((prevIndex) => 
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    )
  }

  const introSlides = [
    {
      id: 1,
      title: "What is UZA Empower?",
      content: [
        "UZA Empower is a social enterprise initiative by UZA Solutions Ltd, designed to unlock economic freedom for low-income earners across Africa through inclusive financing, business training, and access to productive tools.",
        "We work with street vendors, construction workers, women entrepreneurs, youth, and smallholder farmers earning less than $5/day — helping them transition from survival to sustainable entrepreneurship."
      ],
      image: "/story1.jpg",
      bgColor: "bg-[#FBAF43]"
    },
    {
      id: 2,
      title: "Our Impact Goals",
      content: [
        "Measurable results that demonstrate our commitment to transforming lives and communities across Africa.",
        "Our targets include 1,000 individuals trained & equipped, 80% average income increase, 70% asset ownership rate, 50% women beneficiaries, and 2,500+ indirect jobs created."
      ],
      image: "/story2.png",
      bgColor: "bg-[#E5243B]",
      stats: [
        { number: "1,000", label: "Individuals Trained & Equipped", color: "bg-[#E5243B]" },
        { number: "80%", label: "Average Income Increase", color: "bg-[#DDA63A]" },
        { number: "70%", label: "Asset Ownership Rate", color: "bg-[#4C9F38]" },
        { number: "50%", label: "Women Beneficiaries", color: "bg-[#FF3A21]" },
        { number: "2,500+", label: "Indirect Jobs Created", color: "bg-[#00689D]" }
      ]
    },
    {
      id: 3,
      title: "Sustainable Impact Model",
      content: [
        "UZA Empower operates through a revolving fund. Lease repayments finance new participants, while graduates become franchise owners and trainers, ensuring long-term sustainability.",
        "This creates a self-sustaining ecosystem where success breeds success, allowing us to scale impact across Africa without constant external funding."
      ],
      image: "/story3.jpg",
      bgColor: "bg-[#00689D]",
      steps: [
        { number: "1", title: "Initial Investment", description: "Fund initial participants with equipment and training", color: "bg-[#E5243B]" },
        { number: "2", title: "Repayment Cycle", description: "Lease payments fund new participants", color: "bg-[#DDA63A]" },
        { number: "3", title: "Graduate Network", description: "Successful participants become trainers and franchise owners", color: "bg-[#00689D]" }
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Rotating Images with Text Overlays */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden flex items-center justify-center rounded-b-[2rem] sm:rounded-b-[3rem] border-b-2 sm:border-b-4 border-[#19486A]">
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
            
            {/* Blue gradient overlay for all images */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#19486A]/80 via-[#19486A]/85 to-transparent"></div>
            
            {/* Hero Text Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl px-4 sm:px-6 md:px-8 ml-4 sm:ml-6 md:ml-8 lg:ml-16">
                
               <motion.h1 
                 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gray-100 mb-4 sm:mb-6 md:mb-8 leading-tight" 
                 style={{ fontFamily: 'Comfortaa, sans-serif' }}
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
               >
                 UZA <span className="text-[#FBAF43]">Empower</span>
               </motion.h1>
               
               <motion.p 
                 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-100 mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-4xl leading-relaxed font-semibold" 
                 style={{ fontFamily: 'Comfortaa, sans-serif' }}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
               >
                 Empowering displacement-affected communities across Africa with sustainable solutions for lasting change
               </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <motion.button 
                    className="group px-4 sm:px-5 md:px-6 py-3 sm:py-3 md:py-4 rounded-2xl sm:rounded-3xl md:rounded-4xl font-bold text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 transform hover:scale-110 shadow-2xl bg-[#DDA63A] hover:bg-[#C7A03A] text-[#00142B] flex items-center justify-center space-x-2 sm:space-x-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Join Our Mission</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                  </motion.div>
                </div>
              </div>

                  </div>
        ))}
        
        {/* Image indicator dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((imageData, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? imageData.type === 'challenge'
                    ? 'bg-[#FF3A21] scale-125'
                    : 'bg-[#DDA63A] scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
                  </div>
      </section>

      {/* Program Introduction Slider */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 relative">
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                        {introSlides[currentIntroSlide].stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2`}>
                              <span className="text-white font-bold text-xs sm:text-sm">{stat.number}</span>
                  </div>
                            <p className="text-xs sm:text-xs md:text-xs text-gray-600 font-medium leading-tight">{stat.label}</p>
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
                  className="relative hidden md:block"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div 
                    className="relative h-64 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden mt-6 lg:mt-0"
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

            {/* Navigation Arrows - Much further from content */}
            <button 
              onClick={prevIntroSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 sm:-translate-x-12 md:-translate-x-16 lg:-translate-x-20 bg-white/90 hover:bg-white backdrop-blur-sm rounded-lg border-t-2 sm:border-t-4 border-[#19486A] p-2 sm:p-3 shadow-lg transition-all duration-300 group z-10"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#19486A] group-hover:scale-110 transition-transform" />
            </button>
            
            <button 
              onClick={nextIntroSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8 sm:translate-x-12 md:translate-x-16 lg:translate-x-20 bg-white/90 hover:bg-white backdrop-blur-sm rounded-lg border-t-2 sm:border-t-4 border-[#19486A] p-2 sm:p-3 shadow-lg transition-all duration-300 group z-10"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#19486A] group-hover:scale-110 transition-transform" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {introSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIntroSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIntroSlide 
                      ? 'bg-[#FBAF43] scale-125' 
                      : 'bg-gray-400 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Solutions - Inkomoko Inspired */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8">
                Our Solutions for Change
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                Three integrated approaches that transform challenges into opportunities for lasting change in displacement-affected communities
              </p>
            </div>

            {/* Solutions Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20">
              {[
                {
                  title: "No Poverty",
                  description: "Lease-to-own asset financing that provides productive equipment and tools to transform informal workers into successful entrepreneurs.",
                  icon: DollarSign,
                  color: "from-[#E5243B] to-[#C5192D]",
                  stats: "97% Repayment Rate",
                  details: "Low-interest financing, flexible payment terms, comprehensive support"
                },
                {
                  title: "Partnerships for Goals", 
                  description: "Connecting entrepreneurs to markets, suppliers, and customers through our extensive network and digital platforms.",
                    icon: Globe,
                  color: "from-[#19486A] to-[#00689D]",
                  stats: "50% Revenue Growth",
                  details: "Supply chain integration, customer acquisition, market intelligence"
                },
                {
                  title: "Peace & Justice",
                  description: "Policy engagement and community mobilization to create enabling environments for displaced communities to thrive.",
                  icon: Users,
                  color: "from-[#00689D] to-[#19486A]",
                  stats: "1.2M Lives Improved",
                  details: "Policy influence, community organizing, stakeholder engagement"
                }
              ].map((solution, index) => {
                const Icon = solution.icon
                  return (
                  <div key={index} className={`group relative ${index === 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden relative h-full" 
                     style={{
                       backgroundImage: `url(${index === 0 ? '/negative.jpg' : index === 1 ? '/negative1.jpg' : '/negative.jpg'})`,
                       backgroundSize: 'cover',
                       backgroundPosition: 'center',
                       backgroundRepeat: 'no-repeat'
                     }}>
                      <div className="absolute inset-0 bg-white/90"></div>
                      <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${solution.color} rounded-t-2xl sm:rounded-t-3xl`}></div>
                  
                      <div className="relative z-10 h-full flex flex-col">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${solution.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#00689D]">{solution.title}</h3>
                        <p className="text-[#19486A] leading-relaxed text-sm sm:text-base flex-grow">
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
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-8 sm:mb-10 md:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our Approach
              </motion.h2>
                </motion.div>

                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
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
          </div>
        </div>
      </section>

      {/* Impact Cards Section */}
      <ImpactCardsSection />

      {/* Real Voices - Client Success Stories */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div 
              className="text-center mb-10 sm:mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4 sm:mb-6 px-4" 
                style={{ fontFamily: 'Comfortaa, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Success Stories from Our Community
              </motion.h2>
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Hear from the entrepreneurs whose lives have been transformed through UZA Empower
              </motion.p>
            </motion.div>

            {/* Success Story Slider */}
            <motion.div 
              className="relative max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="relative h-[500px] sm:h-[600px] md:h-[700px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                key={currentStoryIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={stories[currentStoryIndex].image}
                  alt={stories[currentStoryIndex].name}
                  fill
                  className="object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Colorful Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#E5243B]/20 via-[#19486A]/10 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                  <span className={`bg-white text-[#00142B] px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold ${stories[currentStoryIndex].borderColor} border-t-2 sm:border-t-4`}>
                    {stories[currentStoryIndex].category}
                  </span>
              </div>
              
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 text-white">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-white" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                    {stories[currentStoryIndex].name}
                  </h3>
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#FBAF43] font-semibold mb-1 sm:mb-2">{stories[currentStoryIndex].business}</div>
                  <div className="text-sm sm:text-base md:text-lg text-gray-300 mb-3 sm:mb-4 md:mb-6">{stories[currentStoryIndex].location}</div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-3 sm:mb-4 md:mb-6 max-w-4xl" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                    "{stories[currentStoryIndex].quote}"
                  </p>

                  <div className="text-xs sm:text-sm text-gray-400">{stories[currentStoryIndex].story}</div>
                </div>
            </motion.div>

              {/* Navigation Arrows */}
              <button 
                onClick={prevStory}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
              </button>
              
              <button 
                onClick={nextStory}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 group"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
              </button>
              
              {/* Story Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStoryIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStoryIndex 
                        ? 'bg-[#FBAF43] scale-125' 
                        : 'bg-gray-400 hover:bg-gray-300'
                    }`}
                  />
                  ))}
            </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
    
  )
}
