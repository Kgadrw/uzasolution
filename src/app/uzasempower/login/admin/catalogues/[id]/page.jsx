'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { 
  ArrowLeft, Image as ImageIcon, FileText, X, Menu, LogOut, Search, Bell,
  LayoutDashboard, FileCheck, CheckCircle, DollarSign, AlertTriangle, 
  UserCheck, BarChart3, BookOpen, Info
} from 'lucide-react'
import { api, API_BASE_URL, getAuthToken } from '@/lib/api/config'
import Image from 'next/image'
import { ensureCloudinaryUrl } from '@/lib/utils'

export default function CatalogueFormPage() {
  const router = useRouter()
  const params = useParams()
  const catalogueId = params.id === 'new' ? null : params.id
  const isEditing = !!catalogueId

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const notificationDropdownRef = useRef(null)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEditing)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: null,
    file: null,
    imagePreview: '',
    filePreview: '',
  })

  const categories = ['Industrial', 'Agriculture', 'Technology', 'Healthcare', 'Construction', 'Automotive']

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/uzasempower/login/admin/dashboard' },
    { id: 'projects', label: 'Projects', icon: FileCheck, path: '/uzasempower/login/admin/dashboard?tab=projects' },
    { id: 'milestones', label: 'Milestones', icon: CheckCircle, path: '/uzasempower/login/admin/dashboard?tab=milestones' },
    { id: 'tranches', label: 'Tranches', icon: DollarSign, path: '/uzasempower/login/admin/dashboard?tab=tranches' },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, path: '/uzasempower/login/admin/dashboard?tab=alerts' },
    { id: 'kyc', label: 'KYC Review', icon: UserCheck, path: '/uzasempower/login/admin/dashboard?tab=kyc' },
    { id: 'catalogues', label: 'Catalogues', icon: BookOpen, path: '/uzasempower/login/admin/dashboard?tab=catalogues' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/uzasempower/login/admin/dashboard?tab=reports' },
  ]

  // Load user data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        } catch (error) {
          console.error('Error parsing user data:', error)
        }
      }
    }
  }, [])

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setShowNotificationDropdown(false)
      }
    }

    if (showNotificationDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNotificationDropdown])

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    setShowLogoutModal(false)
    localStorage.removeItem('user')
    router.push('/uzasempower/login')
  }

  useEffect(() => {
    if (isEditing && catalogueId) {
      fetchCatalogue()
    }
  }, [isEditing, catalogueId])

  const fetchCatalogue = async () => {
    try {
      setFetching(true)
      const response = await api.get(`/catalogues/${catalogueId}`)
      if (response.success && response.data) {
        const catalogue = response.data.catalogue || response.data
        setFormData({
          title: catalogue.title || '',
          category: catalogue.category || '',
          description: catalogue.description || '',
          image: null,
          file: null,
          imagePreview: catalogue.image || '',
          filePreview: catalogue.file || '',
        })
      }
    } catch (error) {
      console.error('Error fetching catalogue:', error)
      alert('Failed to load catalogue. Redirecting back...')
      router.push('/uzasempower/login/admin/dashboard?tab=catalogues')
    } finally {
      setFetching(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file,
        filePreview: file.name
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const token = getAuthToken()
      const url = isEditing
        ? `${API_BASE_URL}/catalogues/${catalogueId}`
        : `${API_BASE_URL}/catalogues`
      
      // Check if we have new files to upload
      const hasNewImage = formData.image && formData.image instanceof File
      const hasNewFile = formData.file && formData.file instanceof File
      
      // If we have new files OR it's a new catalogue (which requires files), use FormData
      // Otherwise, if editing without new files, use JSON
      if (hasNewImage || hasNewFile || !isEditing) {
        const submitFormData = new FormData()
        submitFormData.append('title', formData.title)
        submitFormData.append('category', formData.category)
        submitFormData.append('description', formData.description)

        // Add image if it's a new file
        if (hasNewImage) {
          submitFormData.append('image', formData.image)
        } else if (formData.imagePreview && !isEditing) {
          // For new catalogues, image is required
          alert('Please upload an image')
          setLoading(false)
          return
        } else if (formData.imagePreview && isEditing) {
          // For editing, send existing image URL in body (will be handled by backend)
          submitFormData.append('image', formData.imagePreview)
        }

        // Add file if it's a new file
        if (hasNewFile) {
          submitFormData.append('file', formData.file)
        } else if (formData.filePreview && !isEditing) {
          // For new catalogues, file is required
          alert('Please upload a PDF file')
          setLoading(false)
          return
        } else if (formData.filePreview && isEditing) {
          // For editing, send existing file URL in body (will be handled by backend)
          submitFormData.append('file', formData.filePreview)
        }

        const response = await fetch(url, {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
          },
          body: submitFormData,
        })

        let data = {}
        try {
          const responseText = await response.text()
          if (responseText) {
            data = JSON.parse(responseText)
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError)
          data = { message: 'Invalid response from server' }
        }
        
        if (!response.ok) {
          const errorMessage = data.message || data.error || `Failed to save catalogue (${response.status})`
          throw new Error(errorMessage)
        }

        // Redirect back to catalogues list
        router.push('/uzasempower/login/admin/dashboard?tab=catalogues')
      } else {
        // Editing without new files - use JSON
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category,
            description: formData.description,
            image: formData.imagePreview,
            file: formData.filePreview,
          }),
        })

        const data = await response.json()
        
        if (!response.ok) {
          const errorMessage = data.message || data.error || `Failed to update catalogue (${response.status})`
          throw new Error(errorMessage)
        }

        // Redirect back to catalogues list
        router.push('/uzasempower/login/admin/dashboard?tab=catalogues')
      }
    } catch (error) {
      console.error('Error saving catalogue:', error)
      alert(error.message || 'Failed to save catalogue. Please try again.')
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading catalogue...</p>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden font-opensans" style={{ fontFamily: '"Open Sans", sans-serif', fontOpticalSizing: 'auto', fontStyle: 'normal', fontVariationSettings: '"wdth" 100' }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0'} ${sidebarOpen ? 'md:w-64' : 'md:w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 fixed h-screen z-30`}>
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex items-center justify-between h-[80px]">
          {sidebarOpen && (
            <h2 className="text-xl text-green-600">Admin Panel</h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = item.id === 'catalogues'
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} ml-0 overflow-hidden`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between h-[80px]">
          <div className="flex items-center gap-3 md:gap-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/uzasempower/login/admin/dashboard?tab=catalogues')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg md:text-2xl text-gray-900">
                {isEditing ? 'Edit Catalogue' : 'Add New Catalogue'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search something here.."
                className="pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative" ref={notificationDropdownRef}>
                <button
                  onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                  className="relative"
                >
                  <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-green-600" />
                </button>
                
                {/* Notification Dropdown */}
                {showNotificationDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="text-sm text-gray-900">Notifications</h3>
                      <button
                        onClick={() => setShowNotificationDropdown(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 text-center text-sm text-gray-500">
                      No notifications
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm text-gray-900">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-600">{user?.email || 'admin@example.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="h-full overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 shadow-sm">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FBAF43]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Enter category name (e.g., Industrial, Agriculture, Technology)"
                  required
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FBAF43]"
                />
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500">Quick select:</span>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                      className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FBAF43]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image *
              </label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#FBAF43] transition-colors">
                  {formData.imagePreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={ensureCloudinaryUrl(formData.imagePreview)}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized={formData.imagePreview?.startsWith('blob:')}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                      <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500 text-center">Click to upload image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {formData.imagePreview && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: isEditing ? prev.imagePreview : '' }))}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              {!formData.imagePreview && !isEditing && (
                <p className="text-xs text-gray-500 mt-1">Image is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF File *
              </label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#FBAF43] transition-colors p-4">
                  {formData.filePreview ? (
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex items-center justify-center w-12 h-12 bg-red-100">
                        <FileText className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {typeof formData.filePreview === 'string' && formData.filePreview.includes('/')
                            ? formData.filePreview.split('/').pop()
                            : formData.filePreview}
                        </p>
                        <p className="text-xs text-gray-500">PDF Document</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 mb-2">
                        <FileText className="w-6 h-6 text-gray-400" />
                      </div>
                      <span className="text-xs text-gray-500 text-center">Click to upload PDF</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {formData.filePreview && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, file: null, filePreview: isEditing ? prev.filePreview : '' }))}
                    className="text-red-600 hover:text-red-700 text-sm whitespace-nowrap"
                  >
                    Remove
                  </button>
                )}
              </div>
              {!formData.filePreview && !isEditing && (
                <p className="text-xs text-gray-500 mt-1">PDF file is required</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/uzasempower/login/admin/dashboard?tab=catalogues')}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#FBAF43] text-white hover:bg-[#DDA63A] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Saving...' : (isEditing ? 'Update' : 'Create')} Catalogue
              </button>
            </div>
          </form>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

