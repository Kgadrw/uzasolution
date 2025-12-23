'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { 
  MapPin, DollarSign, Users, Menu, LogOut, Search, Bell,
  LayoutDashboard, Target, Upload, FileText, Settings, X, ArrowLeft
} from 'lucide-react'
import { api } from '@/lib/api/config'

export default function BeneficiaryProjectDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id
  const [project, setProject] = useState(null)
  const [milestones, setMilestones] = useState([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState(null)

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/uzasempower/login/beneficiary/dashboard' },
    { id: 'funding-request', label: 'Funding Request', icon: DollarSign, path: '/uzasempower/login/beneficiary/dashboard?tab=funding-request' },
    { id: 'milestones', label: 'Milestones', icon: Target, path: '/uzasempower/login/beneficiary/dashboard?tab=milestones' },
    { id: 'submit-evidence', label: 'Submit Evidence', icon: Upload, path: '/uzasempower/login/beneficiary/dashboard?tab=submit-evidence' },
    { id: 'reports', label: 'Reports', icon: FileText, path: '/uzasempower/login/beneficiary/dashboard?tab=reports' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/uzasempower/login/beneficiary/dashboard?tab=settings' },
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
        const response = await api.get(`/beneficiary/projects/${projectId}`)
        if (response.success && response.data) {
          setProject(response.data.project || response.data)
        }
        
        // Fetch milestones for this project
        const milestonesRes = await api.get(`/beneficiary/projects/${projectId}/milestones`)
        if (milestonesRes.success && milestonesRes.data) {
          setMilestones(milestonesRes.data.milestones || [])
        }
      } catch (error) {
        console.error('Error fetching project:', error)
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
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-blue-100 text-blue-800',
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'evidence_submitted': 'bg-purple-100 text-purple-800'
    }
    return statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden font-opensans" style={{ fontFamily: '"Open Sans", sans-serif', fontOpticalSizing: 'auto', fontStyle: 'normal', fontVariationSettings: '"wdth" 100' }}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 fixed h-screen z-30`}>
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between h-[80px]">
          <div className="flex items-center gap-3 min-w-0 w-full">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
            {sidebarOpen && (
              <h2 className="text-lg font-semibold text-gray-900 whitespace-nowrap">Beneficiary Dashboard</h2>
            )}
          </div>
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
              onClick={() => router.push('/uzasempower/login/beneficiary/dashboard')}
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
                  onClick={() => router.push('/uzasempower/login/beneficiary/dashboard')}
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

            {/* Project Milestones */}
            {milestones.length > 0 && (
              <div className="bg-white border border-gray-100 p-6 rounded-lg">
                <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Project Milestones ({milestones.length})
                </h3>
                <div className="space-y-4">
                  {milestones.map((milestone, idx) => (
                    <div key={milestone._id || milestone.id || idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">
                            Milestone {milestone.number || idx + 1}: {milestone.title}
                          </h4>
                          {milestone.description && (
                            <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                          )}
                        </div>
                        <span className={`px-2 py-1 text-xs rounded ${getStatusColor(milestone.status)}`}>
                          {milestone.status || 'pending'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        {milestone.targetDate && (
                          <span>Target Date: {new Date(milestone.targetDate).toLocaleDateString()}</span>
                        )}
                        {milestone.trancheAmount && (
                          <span>Tranche: {formatCurrency(milestone.trancheAmount)}</span>
                        )}
                        {milestone.evidence && milestone.evidence.length > 0 && (
                          <span>{milestone.evidence.length} evidence file(s)</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Information */}
            <div className="bg-white border border-gray-100 p-6 rounded-lg">
              <h3 className="text-lg text-gray-900 mb-4">Project Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Project ID</p>
                  <p className="text-sm text-gray-900 font-mono">{project._id || project.id || projectId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Created Date</p>
                  <p className="text-sm text-gray-900">
                    {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                {project.approvedAt && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Approved Date</p>
                    <p className="text-sm text-gray-900">
                      {new Date(project.approvedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {project.completedAt && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Completed Date</p>
                    <p className="text-sm text-gray-900">
                      {new Date(project.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Missing Documents */}
            {project.missingDocuments && project.missingDocuments.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <h3 className="text-lg text-gray-900 mb-4">Missing Documents</h3>
                <div className="space-y-2">
                  {project.missingDocuments.map((doc, idx) => (
                    <div key={idx} className="text-sm text-gray-700">
                      • {doc}
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

