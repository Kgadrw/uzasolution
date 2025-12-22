'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, Filter, Download, Eye, FileText, Grid, List } from 'lucide-react'

export default function Catalogues() {
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Sample catalogue data - replace with actual data from API
  const catalogues = [
    {
      id: 1,
      title: 'Water Management Solutions',
      category: 'Water',
      description: 'Comprehensive catalog of water treatment systems, pumps, and filtration equipment.',
      image: '/portfolio.jpg',
      pdf: '/catalogues/water-management.pdf',
      date: '2024-01-15',
      pages: 24
    },
    {
      id: 2,
      title: 'Healthcare Equipment',
      category: 'Healthcare',
      description: 'Medical devices, hospital equipment, and healthcare supplies catalog.',
      image: '/portfolio.jpg',
      pdf: '/catalogues/healthcare-equipment.pdf',
      date: '2024-02-20',
      pages: 32
    },
    {
      id: 3,
      title: 'Food Service Solutions',
      category: 'Food',
      description: 'Restaurant equipment, kitchen appliances, and food service supplies.',
      image: '/portfolio.jpg',
      pdf: '/catalogues/food-service.pdf',
      date: '2024-03-10',
      pages: 28
    },
    {
      id: 4,
      title: 'Construction Materials',
      category: 'Construction',
      description: 'Building materials, tools, and construction equipment catalog.',
      image: '/portfolio.jpg',
      pdf: '/catalogues/construction-materials.pdf',
      date: '2024-04-05',
      pages: 45
    },
    {
      id: 5,
      title: 'Logistics & Transportation',
      category: 'Logistics',
      description: 'Fleet management, transportation equipment, and logistics solutions.',
      image: '/portfolio.jpg',
      pdf: '/catalogues/logistics-transport.pdf',
      date: '2024-05-12',
      pages: 36
    },
    {
      id: 6,
      title: 'Technology & IT Solutions',
      category: 'Technology',
      description: 'IT equipment, software solutions, and technology infrastructure catalog.',
      image: '/portfolio.jpg',
      pdf: '/catalogues/technology-it.pdf',
      date: '2024-06-18',
      pages: 40
    }
  ]

  const categories = ['all', 'Water', 'Healthcare', 'Food', 'Construction', 'Logistics', 'Technology']

  const filteredCatalogues = catalogues.filter(catalogue => {
    const matchesSearch = catalogue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         catalogue.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || catalogue.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <section className="w-full bg-white text-gray-900 pb-16">
      {/* Header Section */}
      <div className="relative pt-6 pb-12 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gradient-to-br from-[#F8FAFC] to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4">
              Product Catalogues
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive collection of product catalogues across various industries. Download detailed catalogs to discover our range of solutions.
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-6"
          >
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search catalogues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 border-2 border-gray-300 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid' ? 'bg-[#FBAF43] text-white' : 'text-gray-600'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list' ? 'bg-[#FBAF43] text-white' : 'text-gray-600'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 mb-6">
            Showing {filteredCatalogues.length} of {catalogues.length} catalogues
          </div>
        </div>
      </div>

      {/* Catalogues Grid/List */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8">
        <div className="max-w-7xl mx-auto">
          {filteredCatalogues.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-lg text-gray-600 mb-2">No catalogues found</p>
              <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCatalogues.map((catalogue, index) => (
                <motion.div
                  key={catalogue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={catalogue.image}
                      alt={catalogue.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#FBAF43] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {catalogue.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {catalogue.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {catalogue.description}
                    </p>
                    
                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{catalogue.pages} pages</span>
                      <span>{new Date(catalogue.date).toLocaleDateString()}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <a
                        href={catalogue.pdf}
                        download
                        className="flex-1 flex items-center justify-center gap-2 bg-[#FBAF43] text-white px-4 py-2 font-medium text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                      <a
                        href={catalogue.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-4 py-2"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCatalogues.map((catalogue, index) => (
                <motion.div
                  key={catalogue.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 p-6"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="relative w-full md:w-48 h-48 flex-shrink-0 overflow-hidden bg-gray-100">
                      <Image
                        src={catalogue.image}
                        alt={catalogue.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="bg-[#FBAF43] text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2">
                            {catalogue.category}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {catalogue.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {catalogue.description}
                      </p>
                      
                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span>{catalogue.pages} pages</span>
                        <span>•</span>
                        <span>{new Date(catalogue.date).toLocaleDateString()}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <a
                          href={catalogue.pdf}
                          download
                          className="flex items-center gap-2 bg-[#FBAF43] text-white px-6 py-2 font-medium"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </a>
                        <a
                          href={catalogue.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Online
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

