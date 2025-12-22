'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { newsItems } from './data'

const Footer = dynamic(() => import('../../components/footer'))
const Navbar = dynamic(() => import('../../components/navbar'))

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNews = newsItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div>
      <Navbar initialSolid />
      
      {/* Header Section */}
      <section className="w-full bg-white text-gray-900 pb-16">
        <div className="relative pt-6 pb-12 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gradient-to-br from-[#F8FAFC] to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4">
                News & Insights
              </h1>
              <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
                Stay updated with the latest news, insights, and updates from UZA Solutions. Discover trends, partnerships, and innovations shaping Africa's trade landscape.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto mb-6"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                />
              </div>
            </motion.div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 mb-6 text-center">
              Showing {filteredNews.length} of {newsItems.length} articles
            </div>
          </div>
        </div>

        {/* News Articles Grid */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8">
          <div className="max-w-7xl mx-auto">
            {filteredNews.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-gray-600 mb-2">No articles found</p>
                <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((article, index) => (
                  <motion.article
                    key={article.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white border-2 border-gray-200 overflow-hidden flex flex-col"
                  >
                    {/* Image */}
                    <Link href={`/news/${article.slug}`}>
                      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                        <Image
                          src={article.cover || article.image || '/news1.jpg'}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                        {article.type === 'video' && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-[#FBAF43] text-white text-xs font-semibold px-3 py-1">
                              Video
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Date and Author */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <Link href={`/news/${article.slug}`}>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {article.title}
                        </h2>
                      </Link>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>

                      {/* Read More Link */}
                      <Link
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-2 text-[#FBAF43] font-semibold text-sm mt-auto"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
