'use client'

import { useState, useEffect } from 'react'
import { Search, Download, Grid, List, ChevronLeft, ChevronRight, Eye, FileText, X } from 'lucide-react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { api, API_BASE_URL } from '@/lib/api/config'
import { ensureCloudinaryUrl } from '@/lib/utils'

const Navbar = dynamic(() => import('../../components/navbar'))
const Footer = dynamic(() => import('../../components/footer'))

export default function CataloguesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [catalogues, setCatalogues] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewingPdf, setViewingPdf] = useState(null)
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null)
  const [loadingPdf, setLoadingPdf] = useState(false)
  const [pdfError, setPdfError] = useState(null)
  const itemsPerPage = 6

  // Fetch catalogues from backend
  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/catalogues/public`)
        const data = await response.json()
        
        if (data.success && data.data) {
          const cataloguesList = data.data.catalogues || []
          // Debug: Log catalogue data to check file field
          console.log('Fetched catalogues:', cataloguesList)
          cataloguesList.forEach((cat, index) => {
            console.log(`Catalogue ${index}:`, {
              title: cat.title,
              hasFile: !!cat.file,
              file: cat.file,
              fileUrl: cat.fileUrl,
            })
          })
          setCatalogues(cataloguesList)
        }
      } catch (error) {
        console.error('Error fetching catalogues:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCatalogues()
  }, [])

  // Get unique categories from catalogues
  const categories = ['all', ...new Set(catalogues.map(cat => cat.category).filter(Boolean))]

  const filteredCatalogues = catalogues.filter(catalogue => {
    const matchesSearch = catalogue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         catalogue.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || catalogue.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredCatalogues.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCatalogues = filteredCatalogues.slice(startIndex, endIndex)

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleDownload = async (fileUrl, filename) => {
    try {
      // Ensure Cloudinary URL is used
      const cloudinaryUrl = ensureCloudinaryUrl(fileUrl)
      
      // For Cloudinary URLs, use fl_attachment flag to force download as PDF
      let downloadUrl = cloudinaryUrl
      
      if (cloudinaryUrl.includes('res.cloudinary.com')) {
        // Parse Cloudinary URL structure: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/{transformations}/{public_id}.{format}
        const urlParts = cloudinaryUrl.split('/upload/')
        if (urlParts.length === 2) {
          // Add fl_attachment flag to force download
          // Format: /upload/fl_attachment/{public_id}.pdf
          const publicIdPart = urlParts[1]
          // Remove any existing transformations and add attachment flag
          downloadUrl = `${urlParts[0]}/upload/fl_attachment/${publicIdPart.split('/').pop()}`
          
          // Ensure .pdf extension
          if (!downloadUrl.endsWith('.pdf')) {
            // Remove any existing extension and add .pdf
            downloadUrl = downloadUrl.replace(/\.[^/.]+$/, '') + '.pdf'
          }
        }
      }
      
      // Fetch the PDF file as ArrayBuffer to ensure binary data
      const response = await fetch(downloadUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/pdf,application/octet-stream'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`)
      }
      
      // Get as ArrayBuffer first to ensure we have binary data
      const arrayBuffer = await response.arrayBuffer()
      
      // Verify it's a PDF by checking the first bytes (PDF files start with %PDF)
      const uint8Array = new Uint8Array(arrayBuffer.slice(0, 4))
      const pdfSignature = String.fromCharCode(...uint8Array)
      
      if (!pdfSignature.startsWith('%PDF')) {
        console.warn('File does not appear to be a PDF. Signature:', pdfSignature)
        // Still proceed, but warn
      }
      
      // Create a Blob with explicit PDF MIME type
      const pdfBlob = new Blob([arrayBuffer], { 
        type: 'application/pdf' 
      })
      
      // Generate proper filename
      let downloadFilename = (filename || 'catalogue')
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()
      
      // Ensure .pdf extension
      if (!downloadFilename.endsWith('.pdf')) {
        downloadFilename += '.pdf'
      }
      
      // Create download link
      const blobUrl = window.URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = downloadFilename
      link.style.display = 'none'
      
      // Append to body, click, and remove
      document.body.appendChild(link)
      link.click()
      
      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl)
      }, 100)
      
    } catch (error) {
      console.error('Error downloading PDF:', error)
      
      // Fallback: Use Cloudinary's direct download with attachment flag
      try {
        const cloudinaryUrl = ensureCloudinaryUrl(fileUrl)
        let fallbackUrl = cloudinaryUrl
        
        // Add fl_attachment transformation to Cloudinary URL
        if (cloudinaryUrl.includes('res.cloudinary.com') && cloudinaryUrl.includes('/upload/')) {
          const parts = cloudinaryUrl.split('/upload/')
          if (parts.length === 2) {
            // Get the public_id and format
            const publicIdWithFormat = parts[1].split('/').pop()
            // Ensure .pdf extension
            const publicId = publicIdWithFormat.replace(/\.[^/.]+$/, '') + '.pdf'
            fallbackUrl = `${parts[0]}/upload/fl_attachment/${publicId}`
          }
        }
        
        // Create download link for direct download
        const link = document.createElement('a')
        link.href = fallbackUrl
        link.download = ((filename || 'catalogue').replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf')
        link.target = '_blank'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        setTimeout(() => {
          document.body.removeChild(link)
        }, 100)
      } catch (fallbackError) {
        console.error('Fallback download failed:', fallbackError)
        alert('Failed to download PDF. Please try viewing it instead.')
      }
    }
  }

  const handleView = async (fileUrl, catalogueTitle) => {
    try {
      setLoadingPdf(true)
      setPdfError(null)
      setPdfBlobUrl(null)
      
      if (!fileUrl) {
        throw new Error('PDF URL is missing')
      }
      
      const cloudinaryUrl = ensureCloudinaryUrl(fileUrl)
      console.log('Loading PDF from:', cloudinaryUrl)
      
      // Use Next.js API proxy to fetch PDF (bypasses CORS and authentication issues)
      const proxyUrl = `/api/pdf-proxy?url=${encodeURIComponent(cloudinaryUrl)}`
      
      // Fetch the PDF through the proxy
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf'
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(`Failed to load PDF: ${response.status} - ${errorData.error || response.statusText}`)
      }
      
      // Get as blob
      const blob = await response.blob()
      console.log('PDF blob received:', { size: blob.size, type: blob.type })
      
      // Verify it's a PDF
      if (!blob.type.includes('pdf') && !blob.type.includes('octet-stream')) {
        // Check first bytes
        const arrayBuffer = await blob.slice(0, 4).arrayBuffer()
        const uint8Array = new Uint8Array(arrayBuffer)
        const signature = String.fromCharCode(...uint8Array)
        console.log('PDF signature check:', signature)
        if (!signature.startsWith('%PDF')) {
          throw new Error('File is not a valid PDF')
        }
      }
      
      // Create blob URL for viewing
      const blobUrl = URL.createObjectURL(blob)
      setPdfBlobUrl(blobUrl)
      setViewingPdf({ url: blobUrl, title: catalogueTitle || 'Catalogue PDF' })
    } catch (error) {
      console.error('Error loading PDF:', error)
      setPdfError(error.message || 'Failed to load PDF. Please try again.')
      // Don't set viewingPdf if there's an error, so modal doesn't show
    } finally {
      setLoadingPdf(false)
    }
  }

  const closePdfViewer = () => {
    if (pdfBlobUrl) {
      URL.revokeObjectURL(pdfBlobUrl)
      setPdfBlobUrl(null)
    }
    setViewingPdf(null)
    setPdfError(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header Section */}
      <div className="bg-[#F8FAFC]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Product Catalogues
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-3xl">
            Explore our comprehensive collection of product catalogues across various industries. Download detailed catalogs to discover our range of solutions.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#F8FAFC]/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search catalogues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-[#FBAF43] text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 border border-gray-300">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-[#FBAF43] text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-[#FBAF43] text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Catalogues Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading catalogues...</p>
          </div>
        ) : filteredCatalogues.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No catalogues found matching your search.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCatalogues.map((catalogue) => (
              <div
                key={catalogue._id || catalogue.id}
                className="bg-white border border-gray-200 overflow-hidden"
              >
                <div className="relative h-48 bg-gray-100">
                  {catalogue.image ? (
                    <Image
                      src={ensureCloudinaryUrl(catalogue.image)}
                      alt={catalogue.title}
                      fill
                      className="object-cover"
                      unoptimized={catalogue.image?.startsWith('blob:')}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-[#FBAF43] uppercase">
                      {catalogue.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {catalogue.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {catalogue.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {catalogue.createdAt ? new Date(catalogue.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                    <div className="flex items-center gap-2">
                      {catalogue.file ? (
                        <>
                          <button
                            onClick={() => handleView(catalogue.file, catalogue.title)}
                            className="flex items-center gap-1 bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-2 text-sm font-medium"
                            title="View PDF"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(catalogue.file, catalogue.title)}
                            className="flex items-center gap-1 bg-[#FBAF43] text-white hover:bg-[#DDA63A] px-3 py-2 text-sm font-medium"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400">No PDF available</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedCatalogues.map((catalogue) => (
              <div
                key={catalogue._id || catalogue.id}
                className="bg-white border border-gray-200 p-4 flex flex-col sm:flex-row gap-4"
              >
                <div className="relative w-full sm:w-32 h-32 bg-gray-100 flex-shrink-0">
                  {catalogue.image ? (
                    <Image
                      src={ensureCloudinaryUrl(catalogue.image)}
                      alt={catalogue.title}
                      fill
                      className="object-cover"
                      unoptimized={catalogue.image?.startsWith('blob:')}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-[#FBAF43] uppercase">
                      {catalogue.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {catalogue.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {catalogue.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {catalogue.createdAt ? new Date(catalogue.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                    <div className="flex items-center gap-2">
                      {catalogue.file ? (
                        <>
                          <button
                            onClick={() => handleView(catalogue.file, catalogue.title)}
                            className="flex items-center gap-1 bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-2 text-sm font-medium"
                            title="View PDF"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(catalogue.file, catalogue.title)}
                            className="flex items-center gap-1 bg-[#FBAF43] text-white hover:bg-[#DDA63A] px-3 py-2 text-sm font-medium"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400">No PDF available</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredCatalogues.length > 0 && totalPages > 1 && (
          <div className="mt-8 flex justify-end items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#FBAF43] text-white'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-700 px-4">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#FBAF43] text-white'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {viewingPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-6xl h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {viewingPdf.title}
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (pdfBlobUrl) {
                      const link = document.createElement('a')
                      link.href = pdfBlobUrl
                      link.download = `${viewingPdf.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`
                      link.click()
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FBAF43] text-white hover:bg-[#DDA63A] text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  onClick={closePdfViewer}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden bg-gray-100">
              {loadingPdf ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Loading PDF...</p>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FBAF43] mx-auto"></div>
                  </div>
                </div>
              ) : pdfError ? (
                <div className="flex flex-col items-center justify-center h-full p-8">
                  <FileText className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-red-600 font-medium mb-2">Error Loading PDF</p>
                  <p className="text-gray-600 text-sm text-center mb-4">{pdfError}</p>
                  <button
                    onClick={() => {
                      setPdfError(null)
                      if (viewingPdf) {
                        // Try to reload by getting the original URL from the catalogue
                        const catalogue = catalogues.find(c => c.title === viewingPdf.title)
                        if (catalogue?.file) {
                          handleView(catalogue.file, catalogue.title)
                        }
                      }
                    }}
                    className="px-4 py-2 bg-[#FBAF43] text-white hover:bg-[#DDA63A] text-sm font-medium"
                  >
                    Try Again
                  </button>
                </div>
              ) : pdfBlobUrl ? (
                <object
                  data={pdfBlobUrl}
                  type="application/pdf"
                  className="w-full h-full"
                  aria-label={viewingPdf.title}
                >
                  <div className="flex flex-col items-center justify-center h-full p-8">
                    <FileText className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">Your browser cannot display PDF files.</p>
                    <a
                      href={pdfBlobUrl}
                      download={`${viewingPdf.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`}
                      className="px-4 py-2 bg-[#FBAF43] text-white hover:bg-[#DDA63A] text-sm font-medium"
                    >
                      Download PDF
                    </a>
                  </div>
                </object>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No PDF loaded</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

