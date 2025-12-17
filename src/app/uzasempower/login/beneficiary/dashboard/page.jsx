'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  DollarSign, CheckCircle, AlertCircle, Bell,
  Search, Download, MapPin, Heart, Settings, LogOut, 
  LayoutDashboard, Menu, Info, Wallet, Activity, Target,
  Plus, Upload, FileText, BarChart3, Users, TrendingUp, X
} from 'lucide-react'
import { api, getAuthToken, API_BASE_URL } from '@/lib/api/config'

export default function BeneficiaryDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showRequestFundModal, setShowRequestFundModal] = useState(false)
  const [showAddProjectModal, setShowAddProjectModal] = useState(false)
  const [showUploadEvidenceModal, setShowUploadEvidenceModal] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    fundingGoal: ''
  })
  const [fundingRequestForm, setFundingRequestForm] = useState({
    projectId: '',
    amount: '',
    reason: ''
  })
  const [uploadEvidenceForm, setUploadEvidenceForm] = useState({
    documentType: '',
    projectId: '',
    file: null,
    description: ''
  })
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const notificationDropdownRef = useRef(null)
  const fileInputRef = useRef(null)

  // Data state
  const [loading, setLoading] = useState(true)
  const [summaryData, setSummaryData] = useState({
    totalFunded: 0,
    totalDonors: 0,
    activeProjects: 0,
    pendingDocuments: 0,
    onTrackProjects: 0
  })
  const [donors, setDonors] = useState([])
  const [fundingRequests, setFundingRequests] = useState([])
  const [projects, setProjects] = useState([])
  const [milestones, setMilestones] = useState([])
  const [missingDocuments, setMissingDocuments] = useState([])
  const [notifications, setNotifications] = useState([])
  const [user, setUser] = useState(null)
  const [submittedEvidence, setSubmittedEvidence] = useState([])
  const [loadingEvidence, setLoadingEvidence] = useState(false)

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

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Fetch overview
        const overviewRes = await api.get('/beneficiary/dashboard/overview')
        if (overviewRes.success && overviewRes.data) {
          const data = overviewRes.data.summaryData || {}
          setSummaryData({
            totalFunded: data.totalFunded || 0,
            totalDonors: data.totalDonors || 0,
            activeProjects: data.activeProjects || 0,
            pendingDocuments: data.pendingDocuments || 0,
            onTrackProjects: data.onTrackProjects || 0
          })
        }

        // Fetch donors
        const donorsRes = await api.get('/beneficiary/donors')
        if (donorsRes.success && donorsRes.data) {
          const formattedDonors = (donorsRes.data.donors || donorsRes.data || []).map((d, idx) => ({
            id: d._id || d.donor?._id || idx + 1,
            name: d.donor?.name || d.name || 'Unknown',
            email: d.donor?.email || d.email || '',
            totalDonated: d.totalAmount || d.amount || 0,
            projects: d.projects || []
          }))
          setDonors(formattedDonors)
        }

        // Fetch funding requests
        const fundingRes = await api.get('/beneficiary/funding-requests')
        if (fundingRes.success && fundingRes.data) {
          const formattedRequests = (fundingRes.data.requests || fundingRes.data || []).map((r, idx) => ({
            id: r._id || idx + 1,
            title: r.title || 'Untitled Request',
            amount: r.amount || 0,
            status: r.status || 'pending',
            date: r.createdAt ? new Date(r.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            description: r.description || ''
          }))
          setFundingRequests(formattedRequests)
        }

        // Fetch projects
        const projectsRes = await api.get('/beneficiary/projects')
        if (projectsRes.success && projectsRes.data) {
          // Handle paginated response (data.data) or direct array (data)
          const projectsArray = projectsRes.data.data || projectsRes.data.projects || projectsRes.data || []
          const formattedProjects = (Array.isArray(projectsArray) ? projectsArray : []).map((p, idx) => ({
            id: p._id || p.id || idx + 1,
            title: p.title || 'Untitled Project',
            location: p.location || 'N/A',
            category: p.category || 'Other',
            totalFunded: p.totalFunded || 0,
            totalRequested: p.fundingGoal || p.amount || 0,
            status: p.status || 'pending',
            missingDocuments: p.missingDocuments || []
          }))
          setProjects(formattedProjects)
        }

        // Fetch missing documents
        const missingDocsRes = await api.get('/beneficiary/missing-documents')
        if (missingDocsRes.success && missingDocsRes.data) {
          // Handle different response structures (data.documents, data.data, or direct array)
          const docsArray = missingDocsRes.data.documents || missingDocsRes.data.data || missingDocsRes.data || []
          const formattedDocs = (Array.isArray(docsArray) ? docsArray : []).map((d, idx) => ({
            id: d._id || idx + 1,
            projectName: d.project?.title || 'Unknown Project',
            milestoneName: d.milestone?.title || 'Unknown Milestone',
            documentType: d.type || 'Evidence',
            dueDate: d.dueDate ? new Date(d.dueDate).toISOString().split('T')[0] : ''
          }))
          setMissingDocuments(formattedDocs)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        showNotification('Failed to load dashboard data', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Fetch submitted evidence when submit-evidence tab is active
  useEffect(() => {
    const fetchSubmittedEvidence = async () => {
      if (activeTab !== 'submit-evidence') return
      
      try {
        setLoadingEvidence(true)
        const evidenceByProject = []
        
        // Fetch milestones for each project to get evidence
        for (const project of projects) {
          try {
            const milestonesRes = await api.get(`/beneficiary/projects/${project.id}/milestones`)
            if (milestonesRes.success && milestonesRes.data?.milestones) {
              const projectEvidence = []
              milestonesRes.data.milestones.forEach((milestone) => {
                if (milestone.evidence && Array.isArray(milestone.evidence) && milestone.evidence.length > 0) {
                  milestone.evidence.forEach((ev) => {
                    projectEvidence.push({
                      id: `${milestone._id}-${ev.url}`,
                      milestoneTitle: milestone.title,
                      type: ev.type || 'document',
                      url: ev.url,
                      uploadedAt: ev.uploadedAt || milestone.createdAt,
                      milestoneId: milestone._id
                    })
                  })
                }
              })
              
              if (projectEvidence.length > 0) {
                evidenceByProject.push({
                  projectId: project.id,
                  projectTitle: project.title,
                  evidence: projectEvidence
                })
              }
            }
          } catch (error) {
            console.error(`Error fetching milestones for project ${project.id}:`, error)
          }
        }
        
        setSubmittedEvidence(evidenceByProject)
      } catch (error) {
        console.error('Error fetching submitted evidence:', error)
      } finally {
        setLoadingEvidence(false)
      }
    }

    if (projects.length > 0) {
      fetchSubmittedEvidence()
    }
  }, [activeTab, projects])

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Overview filters
  const [overviewSearchQuery, setOverviewSearchQuery] = useState('')

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

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' })
    }, 3000)
  }

  const handleLogout = () => {
    showNotification('Beneficiary User logged out successfully', 'success')
    setTimeout(() => {
      localStorage.removeItem('user')
      router.push('/uzasempower/login')
    }, 1500)
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'funding-request', label: 'Funding Request', icon: DollarSign },
    { id: 'submit-evidence', label: 'Submit Evidence', icon: Upload },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  // All data is now fetched from API and stored in state

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-RW', { 
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0 
    }).format(amount)
  }

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'On Hold': 'bg-yellow-100 text-yellow-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Completed': 'bg-blue-100 text-blue-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  // Filter donors
  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(overviewSearchQuery.toLowerCase()) ||
                         donor.email.toLowerCase().includes(overviewSearchQuery.toLowerCase())
    return matchesSearch
  })

  // Filter projects
  const filteredOverviewProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(overviewSearchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(overviewSearchQuery.toLowerCase()) ||
                         project.category.toLowerCase().includes(overviewSearchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden font-opensans" style={{ fontFamily: '"Open Sans", sans-serif', fontOpticalSizing: 'auto', fontStyle: 'normal', fontVariationSettings: '"wdth" 100' }}>
      {/* Top Loading Bar */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
          <motion.div
            className="h-full bg-[#FBAF43]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      )}
      
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
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  activeTab === item.id
                    ? 'bg-green-50 text-green-700 border border-green-200'
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
            <div>
              <h1 className="text-lg md:text-2xl text-gray-900">Welcome back {user?.name || 'Beneficiary User'}</h1>
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
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative" ref={notificationDropdownRef}>
                <button
                  onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                  className="relative"
                >
                  <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-green-600" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
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
                    <div className="divide-y divide-gray-200">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`flex-shrink-0 mt-0.5 ${
                                notif.type === 'success' ? 'text-green-500' :
                                notif.type === 'warning' ? 'text-yellow-500' :
                                'text-blue-500'
                              }`}>
                                {notif.type === 'success' ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : notif.type === 'warning' ? (
                                  <AlertCircle className="w-4 h-4" />
                                ) : (
                                  <Info className="w-4 h-4" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 mb-1">{notif.title}</p>
                                <p className="text-xs text-gray-600 mb-1">{notif.message}</p>
                                <p className="text-xs text-gray-500">{new Date(notif.date).toLocaleDateString()}</p>
                              </div>
                              {!notif.read && (
                                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-gray-200 text-center">
                        <button className="text-xs text-green-600 hover:text-green-700">
                          Mark all as read
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'B'}
                </div>
                <div>
                  <p className="text-sm text-gray-900">{user?.name || 'Beneficiary User'}</p>
                  <p className="text-xs text-gray-600">{user?.email || 'beneficiary@example.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh-80px)] overflow-y-auto">
          <div className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 space-y-4 md:space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <div className="bg-white border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm text-gray-600">Total Funded</h3>
                      <Wallet className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl text-gray-900">{formatCurrency(summaryData.totalFunded)}</p>
                    <p className="text-xs text-gray-500 mt-1">Total amount received</p>
                  </div>

                  <div className="bg-white border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm text-gray-600">Total Donors</h3>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl text-gray-900">{summaryData.totalDonors}</p>
                    <p className="text-xs text-gray-500 mt-1">Supporting your projects</p>
                  </div>

                  <div className="bg-white border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm text-gray-600">Active Projects</h3>
                      <Activity className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl text-gray-900">{summaryData.activeProjects}</p>
                    <p className="text-xs text-gray-500 mt-1">Currently active</p>
                  </div>

                  <div className="bg-white border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm text-gray-600">Missing Documents</h3>
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl text-red-600">{summaryData.pendingDocuments}</p>
                    <p className="text-xs text-gray-500 mt-1">Requires attention</p>
                  </div>
                </div>

                {/* Missing Documents Notification */}
                {summaryData.pendingDocuments > 0 && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-sm text-yellow-900 mb-1">Missing Documents Required</h3>
                        <p className="text-xs text-yellow-700">
                          You have {summaryData.pendingDocuments} missing document(s) that need to be uploaded to complete your application.
                        </p>
                        <button
                          onClick={() => setActiveTab('submit-evidence')}
                          className="mt-2 text-xs text-yellow-900 underline hover:text-yellow-700"
                        >
                          Upload documents now
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Donors Section */}
                <div className="bg-white border border-gray-100 p-6">
                  <h2 className="text-xl text-gray-900 mb-4">Donors Who Donated</h2>
                  <div className="space-y-3">
                    {donors.map((donor) => (
                      <div key={donor.id} className="border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm text-gray-900">{donor.name}</p>
                            <p className="text-xs text-gray-600">{donor.email}</p>
                          </div>
                          <p className="text-sm text-gray-900">{formatCurrency(donor.totalDonated)}</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Projects:</p>
                          <div className="flex flex-wrap gap-2">
                            {donor.projects.map((project, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800">
                                {project}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects List */}
                <div className="bg-white border border-gray-100">
                  <div className="p-4 md:p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl text-gray-900">Your Projects</h2>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            placeholder="Search projects..."
                            value={overviewSearchQuery}
                            onChange={(e) => setOverviewSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                          />
                        </div>
                        <button
                          onClick={() => setShowAddProjectModal(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Project
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto -mx-4 md:mx-0">
                    <div className="min-w-full inline-block align-middle">
                      <table className="w-full min-w-[600px]">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Project Name</th>
                          <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">Funded</th>
                          <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Funding Status</th>
                          <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Missing Docs</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredOverviewProjects.map((project) => (
                          <tr key={project.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{project.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1 text-sm text-gray-700">
                                <MapPin className="w-4 h-4" />
                                {project.location}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800">
                                {project.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="text-sm text-gray-900">{formatCurrency(project.totalFunded)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-900">
                                  {Math.round((project.totalFunded / project.totalRequested) * 100)}%
                                </span>
                                <div className="w-24 bg-gray-200 h-2">
                                  <div 
                                    className="bg-green-500 h-2"
                                    style={{ width: `${(project.totalFunded / project.totalRequested) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs ${getStatusColor(project.status)}`}>
                                {project.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {project.missingDocuments && project.missingDocuments.length > 0 ? (
                                <span className="px-2 py-1 text-xs bg-red-100 text-red-800">
                                  {project.missingDocuments.length} missing
                                </span>
                              ) : (
                                <span className="text-xs text-gray-500">Complete</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Funding Request Tab */}
            {activeTab === 'funding-request' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white border border-gray-100">
                  <div className="p-4 md:p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl text-gray-900">Funding Requests</h2>
                      <button
                        onClick={() => setShowRequestFundModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Request Fund
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto -mx-4 md:mx-0">
                    <div className="min-w-full inline-block align-middle">
                      <table className="w-full min-w-[600px]">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Project</th>
                          <th className="px-6 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Submitted Date</th>
                          <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Reviewed By</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {fundingRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{request.project}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="text-sm text-gray-900">{formatCurrency(request.amount)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">{new Date(request.submittedDate).toLocaleDateString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">{request.reviewedBy || 'Pending'}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Evidence Tab */}
            {activeTab === 'submit-evidence' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white border border-gray-100 p-6">
                  <h2 className="text-xl text-gray-900 mb-4">Submit Evidence & Documents</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Upload required documents and evidence to support your funding requests and project milestones.
                  </p>

                  <div className="space-y-6">
                    {/* Missing Documents Section */}
                    <div className="border border-gray-200 p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Missing Documents</h3>
                      <div className="space-y-2">
                        {projects.filter(p => p.missingDocuments && p.missingDocuments.length > 0).length > 0 ? (
                          projects.filter(p => p.missingDocuments && p.missingDocuments.length > 0).map((project) => (
                            <div key={project.id} className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                              <p className="text-sm font-medium text-gray-900 mb-2">{project.title}</p>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {project.missingDocuments.map((doc, idx) => (
                                  <span key={idx} className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                                    {doc}
                                  </span>
                                ))}
                              </div>
                              <button 
                                onClick={() => setShowUploadEvidenceModal(true)}
                                className="text-xs text-green-600 hover:text-green-700 font-medium"
                              >
                                Upload Documents
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">No missing documents</p>
                        )}
                      </div>
                    </div>

                    {/* Submitted Evidence Section */}
                    <div className="border border-gray-200 p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Previously Submitted Evidence</h3>
                      {loadingEvidence ? (
                        <div className="text-center py-4">
                          <p className="text-sm text-gray-500">Loading evidence...</p>
                        </div>
                      ) : submittedEvidence.length > 0 ? (
                        <div className="space-y-4">
                          {submittedEvidence.map((projectGroup) => (
                            <div key={projectGroup.projectId} className="border border-gray-200 rounded-lg p-4">
                              <h4 className="text-sm font-semibold text-gray-900 mb-3">{projectGroup.projectTitle}</h4>
                              <div className="space-y-2">
                                {projectGroup.evidence.map((ev) => (
                                  <div key={ev.id} className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200">
                                    <div className="flex items-center gap-3 flex-1">
                                      <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900 font-medium truncate">
                                          {ev.milestoneTitle}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                          <span className="text-xs text-gray-500 capitalize">{ev.type}</span>
                                          <span className="text-xs text-gray-400">•</span>
                                          <span className="text-xs text-gray-500">
                                            {ev.uploadedAt ? new Date(ev.uploadedAt).toLocaleDateString() : 'N/A'}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <a
                                        href={ev.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                                      >
                                        <Download className="w-4 h-4" />
                                        View
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No evidence submitted yet</p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowUploadEvidenceModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        Upload Evidence
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white border border-gray-100 p-6">
                  <h2 className="text-xl text-gray-900 mb-4">Prepare Reports for Donors</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Create comprehensive reports to share with your donors about project progress and impact.
                  </p>

                  <div className="space-y-4">
                    <div className="border border-gray-200 p-4">
                      <h3 className="text-sm text-gray-900 mb-4">Create New Report</h3>
                      <form 
                        className="space-y-4"
                        onSubmit={(e) => {
                          e.preventDefault()
                          showNotification('Report submitted successfully', 'success')
                        }}
                      >
                        <div>
                          <label className="block text-xs text-gray-700 mb-2">Report Title</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="e.g., Q1 2024 Progress Report"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-700 mb-2">Project</label>
                          <select className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                            <option>Select project...</option>
                            {projects.map((project) => (
                              <option key={project.id}>{project.title}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-700 mb-2">Report Period</label>
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="date"
                              className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="Start Date"
                            />
                            <input
                              type="date"
                              className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="End Date"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-700 mb-2">Executive Summary</label>
                          <textarea
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Provide a high-level overview of project progress, achievements, and challenges..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-700 mb-2">Key Achievements</label>
                          <textarea
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="List major milestones and accomplishments..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-700 mb-2">Financial Summary</label>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Total Spent</label>
                              <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Amount in RWF"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Remaining Budget</label>
                              <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Amount in RWF"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-700 mb-2">Impact Metrics</label>
                          <textarea
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Describe the impact: beneficiaries reached, income generated, jobs created, etc..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-700 mb-2">Challenges & Solutions</label>
                          <textarea
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Describe any challenges faced and how they were addressed..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-700 mb-2">Next Steps</label>
                          <textarea
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Outline future plans and upcoming milestones..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-700 mb-2">Supporting Media (Photos, Videos)</label>
                          <div className="border-2 border-dashed border-gray-300 p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Upload images or videos</p>
                            <p className="text-xs text-gray-500 mt-1">JPG, PNG, MP4 up to 50MB</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => showNotification('Report draft saved successfully', 'success')}
                            className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                          >
                            Save Draft
                          </button>
                          <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                          >
                            Submit Report
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white border border-gray-100 p-6">
                  <h2 className="text-xl text-gray-900 mb-6">Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg text-gray-900 mb-4">Profile Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            defaultValue={user?.name || 'Beneficiary User'}
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue={user?.email || 'beneficiary@example.com'}
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            defaultValue={user?.phone || ''}
                            placeholder="+250 XXX XXX XXX"
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg text-gray-900 mb-4">Notification Settings</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500" />
                          <span className="text-sm text-gray-700">Email notifications for funding approvals</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500" />
                          <span className="text-sm text-gray-700">SMS notifications for milestone deadlines</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500" />
                          <span className="text-sm text-gray-700">Weekly project summary reports</span>
                        </label>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <button 
                        onClick={async (e) => {
                          e.preventDefault()
                          const nameInput = e.target.closest('.space-y-4').querySelector('input[type="text"]')
                          const emailInput = e.target.closest('.space-y-4').querySelector('input[type="email"]')
                          const phoneInput = e.target.closest('.space-y-4').querySelector('input[type="tel"]')
                          
                          const updateData = {}
                          if (nameInput?.value) updateData.name = nameInput.value
                          if (emailInput?.value) updateData.email = emailInput.value
                          if (phoneInput?.value) updateData.phone = phoneInput.value

                          if (Object.keys(updateData).length === 0) {
                            showNotification('No changes to save', 'error')
                            return
                          }

                          setIsSubmitting(true)
                          try {
                            const response = await api.put('/auth/profile', updateData)
                            if (response.success) {
                              showNotification('Profile updated successfully', 'success')
                              // Update user in localStorage
                              if (response.data?.user) {
                                const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
                                localStorage.setItem('user', JSON.stringify({ ...currentUser, ...response.data.user }))
                                setUser({ ...user, ...response.data.user })
                              }
                            } else {
                              showNotification(response.message || 'Failed to update profile', 'error')
                            }
                          } catch (error) {
                            console.error('Error updating profile:', error)
                            showNotification(error.message || 'Failed to update profile', 'error')
                          } finally {
                            setIsSubmitting(false)
                          }
                        }}
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Saving...' : 'Save Settings'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>

      {/* Request Fund Modal */}
      {showRequestFundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl text-gray-900">Request Funding</h3>
              <button
                onClick={() => setShowRequestFundModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form 
              className="p-6 space-y-4"
              onSubmit={async (e) => {
                e.preventDefault()
                
                if (!fundingRequestForm.projectId || !fundingRequestForm.amount || !fundingRequestForm.reason) {
                  showNotification('Please fill in all required fields', 'error')
                  return
                }

                setIsSubmitting(true)
                try {
                  const response = await api.post('/beneficiary/funding-requests', {
                    projectId: fundingRequestForm.projectId,
                    amount: Number(fundingRequestForm.amount),
                    reason: fundingRequestForm.reason
                  })

                  if (response.success) {
                    showNotification('Funding request submitted successfully', 'success')
                    setShowRequestFundModal(false)
                    setFundingRequestForm({ projectId: '', amount: '', reason: '' })
                    // Refresh funding requests
                    const fundingRes = await api.get('/beneficiary/funding-requests')
                    if (fundingRes.success && fundingRes.data) {
                      const formattedRequests = (fundingRes.data.requests || fundingRes.data || []).map((r, idx) => ({
                        id: r._id || idx + 1,
                        title: r.title || 'Untitled Request',
                        amount: r.amount || 0,
                        status: r.status || 'pending',
                        date: r.createdAt ? new Date(r.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                        description: r.description || ''
                      }))
                      setFundingRequests(formattedRequests)
                    }
                  } else {
                    showNotification(response.message || 'Failed to submit funding request', 'error')
                  }
                } catch (error) {
                  console.error('Error creating funding request:', error)
                  showNotification(error.message || 'Failed to submit funding request', 'error')
                } finally {
                  setIsSubmitting(false)
                }
              }}
            >
              <div>
                <label className="block text-sm text-gray-700 mb-2">Project *</label>
                <select 
                  value={fundingRequestForm.projectId}
                  onChange={(e) => setFundingRequestForm({ ...fundingRequestForm, projectId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select project...</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>{project.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Requested Amount (RWF) *</label>
                <input
                  type="number"
                  value={fundingRequestForm.amount}
                  onChange={(e) => setFundingRequestForm({ ...fundingRequestForm, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter amount"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Justification / Reason *</label>
                <textarea
                  rows={4}
                  value={fundingRequestForm.reason}
                  onChange={(e) => setFundingRequestForm({ ...fundingRequestForm, reason: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Explain why this funding is needed..."
                  required
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowRequestFundModal(false)
                    setFundingRequestForm({ projectId: '', amount: '', reason: '' })
                  }}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl text-gray-900">Add New Project</h3>
              <button
                onClick={() => setShowAddProjectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form 
              className="p-6 space-y-4"
              onSubmit={async (e) => {
                e.preventDefault()
                
                if (!projectForm.title || !projectForm.description || !projectForm.category || !projectForm.location || !projectForm.fundingGoal) {
                  showNotification('Please fill in all fields', 'error')
                  return
                }

                setIsSubmitting(true)
                try {
                  const response = await api.post('/beneficiary/projects', {
                    title: projectForm.title,
                    description: projectForm.description,
                    category: projectForm.category,
                    location: projectForm.location,
                    fundingGoal: Number(projectForm.fundingGoal)
                  })

                  if (response.success) {
                    showNotification('Project created successfully', 'success')
                    setShowAddProjectModal(false)
                    setProjectForm({ title: '', description: '', category: '', location: '', fundingGoal: '' })
                    // Refresh projects list
                    const projectsRes = await api.get('/beneficiary/projects')
                    if (projectsRes.success && projectsRes.data) {
                      // Handle paginated response (data.data) or direct array (data)
                      const projectsArray = projectsRes.data.data || projectsRes.data.projects || projectsRes.data || []
                      const formattedProjects = (Array.isArray(projectsArray) ? projectsArray : []).map((p, idx) => ({
                        id: p._id || p.id || idx + 1,
                        title: p.title || 'Untitled Project',
                        location: p.location || 'N/A',
                        category: p.category || 'Other',
                        totalFunded: p.totalFunded || 0,
                        totalRequested: p.fundingGoal || p.amount || 0,
                        status: p.status || 'pending',
                        missingDocuments: p.missingDocuments || []
                      }))
                      setProjects(formattedProjects)
                    }
                    // Refresh dashboard overview
                    const overviewRes = await api.get('/beneficiary/dashboard/overview')
                    if (overviewRes.success && overviewRes.data) {
                      const data = overviewRes.data.summaryData || {}
                      setSummaryData({
                        totalFunded: data.totalFunded || 0,
                        totalDonors: data.totalDonors || 0,
                        activeProjects: data.activeProjects || 0,
                        pendingDocuments: data.pendingDocuments || 0,
                        onTrackProjects: data.onTrackProjects || 0
                      })
                    }
                  } else {
                    showNotification(response.message || 'Failed to create project', 'error')
                  }
                } catch (error) {
                  console.error('Error creating project:', error)
                  showNotification(error.message || 'Failed to create project', 'error')
                } finally {
                  setIsSubmitting(false)
                }
              }}
            >
              <div>
                <label className="block text-sm text-gray-700 mb-2">Project Title *</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter project title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  value={projectForm.location}
                  onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter project location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Category *</label>
                <select 
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select category...</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Livestock">Livestock</option>
                  <option value="Aquaculture">Aquaculture</option>
                  <option value="Beekeeping">Beekeeping</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Description *</label>
                <textarea
                  rows={4}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe your project..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Total Budget Required (RWF) *</label>
                <input
                  type="number"
                  value={projectForm.fundingGoal}
                  onChange={(e) => setProjectForm({ ...projectForm, fundingGoal: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter total budget"
                  min="0"
                  required
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProjectModal(false)
                    setProjectForm({ title: '', description: '', category: '', location: '', fundingGoal: '' })
                  }}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Add Project'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Upload Evidence Modal */}
      {showUploadEvidenceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl text-gray-900">Upload Evidence</h3>
              <button
                onClick={() => {
                  setShowUploadEvidenceModal(false)
                  setUploadEvidenceForm({ documentType: '', projectId: '', file: null, description: '' })
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form 
              className="p-6 space-y-4"
              onSubmit={async (e) => {
                e.preventDefault()
                
                if (!uploadEvidenceForm.documentType || !uploadEvidenceForm.projectId || !uploadEvidenceForm.file) {
                  showNotification('Please fill in all required fields and select a file', 'error')
                  return
                }

                setIsSubmitting(true)
                try {
                  const formData = new FormData()
                  formData.append('file', uploadEvidenceForm.file)
                  formData.append('documentType', uploadEvidenceForm.documentType)
                  formData.append('projectId', uploadEvidenceForm.projectId)
                  if (uploadEvidenceForm.description) {
                    formData.append('description', uploadEvidenceForm.description)
                  }

                  // Use direct fetch for FormData since api.post uses JSON.stringify
                  const token = getAuthToken()
                  const headers = {}
                  if (token) {
                    headers['Authorization'] = `Bearer ${token}`
                  }
                  // Don't set Content-Type - browser will set it with boundary for FormData

                  const response = await fetch(`${API_BASE_URL}/upload`, {
                    method: 'POST',
                    headers,
                    body: formData,
                  })

                  const data = await response.json()
                  
                  if (!response.ok) {
                    throw new Error(data.message || 'Failed to upload document')
                  }
                  
                  if (data.success !== false) {
                    showNotification('Document submitted successfully', 'success')
                    setShowUploadEvidenceModal(false)
                    setUploadEvidenceForm({ documentType: '', projectId: '', file: null, description: '' })
                    
                    // Refresh submitted evidence list if we're on the submit-evidence tab
                    if (activeTab === 'submit-evidence' && projects.length > 0) {
                      const evidenceByProject = []
                      for (const project of projects) {
                        try {
                          const milestonesRes = await api.get(`/beneficiary/projects/${project.id}/milestones`)
                          if (milestonesRes.success && milestonesRes.data?.milestones) {
                            const projectEvidence = []
                            milestonesRes.data.milestones.forEach((milestone) => {
                              if (milestone.evidence && Array.isArray(milestone.evidence) && milestone.evidence.length > 0) {
                                milestone.evidence.forEach((ev) => {
                                  projectEvidence.push({
                                    id: `${milestone._id}-${ev.url}`,
                                    milestoneTitle: milestone.title,
                                    type: ev.type || 'document',
                                    url: ev.url,
                                    uploadedAt: ev.uploadedAt || milestone.createdAt,
                                    milestoneId: milestone._id
                                  })
                                })
                              }
                            })
                            if (projectEvidence.length > 0) {
                              evidenceByProject.push({
                                projectId: project.id,
                                projectTitle: project.title,
                                evidence: projectEvidence
                              })
                            }
                          }
                        } catch (error) {
                          console.error(`Error fetching milestones for project ${project.id}:`, error)
                        }
                      }
                      setSubmittedEvidence(evidenceByProject)
                    }
                  } else {
                    showNotification(data.message || 'Failed to upload document', 'error')
                  }
                } catch (error) {
                  console.error('Error uploading document:', error)
                  showNotification(error.message || 'Failed to upload document', 'error')
                } finally {
                  setIsSubmitting(false)
                }
              }}
            >
              <div>
                <label className="block text-sm text-gray-700 mb-2">Document Type *</label>
                <select 
                  value={uploadEvidenceForm.documentType}
                  onChange={(e) => setUploadEvidenceForm({ ...uploadEvidenceForm, documentType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select document type...</option>
                  <option value="Business License">Business License</option>
                  <option value="Tax Certificate">Tax Certificate</option>
                  <option value="Environmental Impact Assessment">Environmental Impact Assessment</option>
                  <option value="Project Proposal">Project Proposal</option>
                  <option value="Budget Breakdown">Budget Breakdown</option>
                  <option value="Milestone Evidence">Milestone Evidence</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Project *</label>
                <select 
                  value={uploadEvidenceForm.projectId}
                  onChange={(e) => setUploadEvidenceForm({ ...uploadEvidenceForm, projectId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select project...</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>{project.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Upload File *</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      // Validate file size (10MB)
                      if (file.size > 10 * 1024 * 1024) {
                        showNotification('File size must be less than 10MB', 'error')
                        e.target.value = ''
                        return
                      }
                      // Validate file type
                      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
                      if (!validTypes.includes(file.type)) {
                        showNotification('Please upload a PDF, JPG, or PNG file', 'error')
                        e.target.value = ''
                        return
                      }
                      setUploadEvidenceForm({ ...uploadEvidenceForm, file })
                    }
                  }}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const file = e.dataTransfer.files?.[0]
                    if (file) {
                      // Validate file size (10MB)
                      if (file.size > 10 * 1024 * 1024) {
                        showNotification('File size must be less than 10MB', 'error')
                        return
                      }
                      // Validate file type
                      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
                      if (!validTypes.includes(file.type)) {
                        showNotification('Please upload a PDF, JPG, or PNG file', 'error')
                        return
                      }
                      setUploadEvidenceForm({ ...uploadEvidenceForm, file })
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault()
                  }}
                  className={`border-2 border-dashed p-6 text-center transition-colors cursor-pointer ${
                    uploadEvidenceForm.file 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {uploadEvidenceForm.file ? (
                    <div className="space-y-2">
                      <FileText className="w-8 h-8 mx-auto text-green-600 mb-2" />
                      <p className="text-sm text-gray-900 font-medium">{uploadEvidenceForm.file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(uploadEvidenceForm.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setUploadEvidenceForm({ ...uploadEvidenceForm, file: null })
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ''
                          }
                        }}
                        className="text-xs text-red-600 hover:text-red-700 mt-2"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Description (Optional)</label>
                <textarea
                  rows={3}
                  value={uploadEvidenceForm.description}
                  onChange={(e) => setUploadEvidenceForm({ ...uploadEvidenceForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add any additional notes about this document..."
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadEvidenceModal(false)
                    setUploadEvidenceForm({ documentType: '', projectId: '', file: null, description: '' })
                  }}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Uploading...' : 'Submit Document'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Notification Modal */}
      {notification.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`bg-white max-w-md w-full p-6 ${
              notification.type === 'success' ? 'border-l-4 border-green-500' :
              notification.type === 'error' ? 'border-l-4 border-red-500' :
              'border-l-4 border-yellow-500'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 ${
                notification.type === 'success' ? 'text-green-500' :
                notification.type === 'error' ? 'text-red-500' :
                'text-yellow-500'
              }`}>
                {notification.type === 'success' ? (
                  <CheckCircle className="w-6 h-6" />
                ) : notification.type === 'error' ? (
                  <AlertCircle className="w-6 h-6" />
                ) : (
                  <Info className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification({ show: false, message: '', type: 'success' })}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
