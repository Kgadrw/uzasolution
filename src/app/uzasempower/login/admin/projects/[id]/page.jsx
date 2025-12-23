'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { 
  MapPin, DollarSign, Users, Menu, LogOut, Search, Bell,
  LayoutDashboard, FileCheck, CheckCircle, AlertTriangle, DollarSign as DollarIcon,
  UserCheck, BarChart3, Settings, ArrowLeft
} from 'lucide-react'
import { api } from '@/lib/api/config'

export default function AdminProjectDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState(null)

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/uzasempower/login/admin/dashboard' },
    { id: 'projects', label: 'Projects', icon: FileCheck, path: '/uzasempower/login/admin/dashboard?tab=projects' },
    { id: 'milestones', label: 'Milestones', icon: CheckCircle, path: '/uzasempower/login/admin/dashboard?tab=milestones' },
    { id: 'tranches', label: 'Tranches', icon: DollarIcon, path: '/uzasempower/login/admin/dashboard?tab=tranches' },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, path: '/uzasempower/login/admin/dashboard?tab=alerts' },
    { id: 'kyc', label: 'KYC Review', icon: UserCheck, path: '/uzasempower/login/admin/dashboard?tab=kyc' },
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

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        // Try admin endpoint first, then fallback to general endpoint
        let response = await api.get(`/admin/projects/${projectId}`)
        if (!response.success || !response.data) {
          // Fallback: try to get from projects list
          const projectsRes = await api.get(`/admin/projects?limit=1000`)
          if (projectsRes.success && projectsRes.data) {
            const projectsArray = Array.isArray(projectsRes.data) 
              ? projectsRes.data 
              : (projectsRes.data.projects || projectsRes.data.data || [])
            const foundProject = projectsArray.find(p => (p._id || p.id) === projectId)
            if (foundProject) {
              setProject(foundProject)
              setLoading(false)
              return
            }
          }
        } else {
          setProject(response.data.project || response.data)
        }
      } catch (error) {
        console.error('Error fetching project:', error)
        // Try alternative: get from projects list
        try {
          const projectsRes = await api.get(`/admin/projects?limit=1000`)
          if (projectsRes.success && projectsRes.data) {
            const projectsArray = Array.isArray(projectsRes.data) 
              ? projectsRes.data 
              : (projectsRes.data.projects || projectsRes.data.data || [])
            const foundProject = projectsArray.find(p => (p._id || p.id) === projectId)
            if (foundProject) {
              setProject(foundProject)
            }
          }
        } catch (altError) {
          console.error('Alternative endpoint also failed:', altError)
        }
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      fetchProject()
    }
  }, [projectId])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/uzasempower/login')
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-RW', { 
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0 
    }).format(amount || 0)
  }

  const getStatusColor = (status) => {
    const statusColors = {
      'Pending Review': 'bg-yellow-100 text-yellow-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'Active': 'bg-green-100 text-green-800',
      'active': 'bg-green-100 text-green-800',
      'At Risk': 'bg-red-100 text-red-800',
      'paused': 'bg-red-100 text-red-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'completed': 'bg-blue-100 text-blue-800',
      'Cancelled': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-gray-100 text-gray-800',
    }
    return statusColors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden font-opensans" style={{ fontFamily: '"Open Sans", sans-serif', fontOpticalSizing: 'auto', fontStyle: 'normal', fontVariationSettings: '"wdth" 100' }}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 fixed h-screen z-30`}>
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between h-[80px]">
          {sidebarOpen && (
            <h2 className="text-xl text-green-600">Admin Panel</h2>
          )}
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
                onClick={() => router.push(item.path)}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-gray-700 hover:bg-gray-100"
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
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'} overflow-hidden`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between h-[80px]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/uzasempower/login/admin/dashboard?tab=projects')}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors rounded"
              title="Back to Project List"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Project List</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl text-gray-900">Project Details{project ? ` - ${project.title}` : ''}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search something here.."
                className="pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-green-600" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <p className="text-sm text-gray-900">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-600">{user?.email || 'admin@example.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh-80px)] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Image src="/loader.gif" alt="Loading" width={80} height={80} className="mx-auto" />
                <p className="text-gray-600 mt-4">Loading project details...</p>
              </div>
            </div>
          ) : !project ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Project not found</p>
                <button
                  onClick={() => router.push('/uzasempower/login/admin/dashboard?tab=projects')}
                  className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
              {/* Project Header Card */}
              <div className="bg-white border border-gray-100 p-6 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl text-gray-900 mb-2">{project.title || 'Project Title'}</h2>
                    <p className="text-sm text-gray-600">{project.description || 'No description available'}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded ${getStatusColor(project.status)}`}>
                    {project.status || 'Unknown'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm text-gray-900">{project.location || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5"></div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm text-gray-900">{project.category || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Funding Goal</p>
                      <p className="text-sm text-gray-900">{formatCurrency(project.fundingGoal || project.requestedAmount || 0)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Total Funded</p>
                      <p className="text-sm text-gray-900">{formatCurrency(project.totalFunded || 0)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Beneficiary Information */}
              {project.beneficiary && (
                <div className="bg-white border border-gray-100 p-6 rounded-lg">
                  <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Beneficiary Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm text-gray-900">{typeof project.beneficiary === 'string' ? project.beneficiary : (project.beneficiary.name || 'N/A')}</p>
                    </div>
                    {typeof project.beneficiary === 'object' && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm text-gray-900">{project.beneficiary.email || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm text-gray-900">{project.beneficiary.phone || 'N/A'}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Funding Progress */}
              <div className="bg-white border border-gray-100 p-6 rounded-lg">
                <h3 className="text-lg text-gray-900 mb-4">Funding Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">Funding Progress</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {project.fundingGoal || project.requestedAmount ? 
                          Math.round(((project.totalFunded || 0) / (project.fundingGoal || project.requestedAmount)) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-green-500 h-3 transition-all"
                        style={{ 
                          width: `${project.fundingGoal || project.requestedAmount ? 
                            Math.min(((project.totalFunded || 0) / (project.fundingGoal || project.requestedAmount)) * 100, 100) : 0}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Funded: {formatCurrency(project.totalFunded || 0)}</span>
                      <span>Goal: {formatCurrency(project.fundingGoal || project.requestedAmount || 0)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Information */}
              <div className="bg-white border border-gray-100 p-6 rounded-lg">
                <h3 className="text-lg text-gray-900 mb-4">Project Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Project ID</p>
                    <p className="text-sm text-gray-900 font-mono">{project._id || project.id || projectId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <p className="text-sm text-gray-900">{project.status || 'N/A'}</p>
                  </div>
                  {project.createdAt && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Created Date</p>
                      <p className="text-sm text-gray-900">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {project.updatedAt && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                      <p className="text-sm text-gray-900">
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

