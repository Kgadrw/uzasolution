'use client'

import Image from 'next/image'
import { ArrowRight, DollarSign, Globe, Building2 } from 'lucide-react'
import CardSwap, { Card } from './CardSwap'

export default function ImpactCardsSection() {
  const impactCards = [
    {
      id: 1,
      image: '/story1.jpg',
      badge: {
        icon: 'DollarSign',
        text: 'NO POVERTY',
        color: 'bg-[#E5243B]'
      },
      title: 'Impact begins with inclusive finance',
      bgColor: 'bg-[#E5243B]'
    },
    {
      id: 2,
      image: '/story2.png',
      badge: {
        icon: 'Globe',
        text: 'PARTNERSHIPS',
        color: 'bg-[#19486A]'
      },
      title: 'Connected markets accelerate growth',
      bgColor: 'bg-[#19486A]'
    },
    {
      id: 3,
      image: '/story3.jpg',
      badge: {
        icon: 'Building2',
        text: 'PEACE & JUSTICE',
        color: 'bg-[#00689D]'
      },
      title: 'Policy drives shared prosperity',
      bgColor: 'bg-[#00689D]'
    }
  ]

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'DollarSign':
        return <DollarSign className="w-4 h-4" />
      case 'Globe':
        return <Globe className="w-4 h-4" />
      case 'Building2':
        return <Building2 className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#FBAF43]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#00142B]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          

          {/* Content Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4">
                  Driving Sustainable Impact
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Our three strategic pillars work together to create lasting change in displacement-affected communities across Africa. Through innovative approaches and collaborative partnerships, we're building a more inclusive and prosperous future.
            </p>
          </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#E5243B] rounded-xl flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#00142B] mb-2">No Poverty</h4>
                    <p className="text-gray-600">Providing accessible financial solutions and investment opportunities that enable individuals and communities to build sustainable economic foundations.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#19486A] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#00142B] mb-2">Partnerships for Goals</h4>
                    <p className="text-gray-600">Connecting local producers with global markets through innovative platforms and partnerships that accelerate economic growth and development.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#00689D] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#00142B] mb-2">Peace & Justice</h4>
                    <p className="text-gray-600">Advocating for policies and frameworks that promote inclusive growth, social equity, and sustainable development across the region.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side - CardSwap Container */}
            <div style={{ height: '600px', position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={true}
                width={450}
                height={520}
            >
              {impactCards.map((card) => (
                <Card key={card.id} customClass="bg-white shadow-2xl border-gray-200">
                  <div className="h-full flex flex-col">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden rounded-t-xl">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Floating Badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold text-white ${card.bgColor} shadow-lg`}>
                          {getIcon(card.badge.icon)}
                          <span className="ml-2">{card.badge.text}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-[#00142B] mb-4 leading-tight">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed mb-6 text-sm flex-1 min-h-[80px]">
                        {card.id === 1 && "Providing accessible financial solutions and investment opportunities that enable individuals and communities to build sustainable economic foundations."}
                        {card.id === 2 && "Connecting local producers with global markets through innovative platforms and partnerships that accelerate economic growth and development."}
                        {card.id === 3 && "Advocating for policies and frameworks that promote inclusive growth, social equity, and sustainable development across the region."}
                      </p>

                      {/* Action Button */}
                      <div className="flex items-center justify-between">
                        <button className="flex items-center text-[#FBAF43] font-semibold hover:text-[#E09A2F] transition-colors duration-300 text-sm">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                        
                        {/* Progress Indicator */}
                        <div className="flex space-x-1">
                          <div className={`w-2 h-2 rounded-full ${card.id === 1 ? 'bg-[#FBAF43]' : 'bg-gray-300'}`}></div>
                          <div className={`w-2 h-2 rounded-full ${card.id === 2 ? 'bg-[#FBAF43]' : 'bg-gray-300'}`}></div>
                          <div className={`w-2 h-2 rounded-full ${card.id === 3 ? 'bg-[#FBAF43]' : 'bg-gray-300'}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
