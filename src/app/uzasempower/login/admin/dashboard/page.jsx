'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Shield, Users, FileCheck, DollarSign, AlertTriangle, 
  CheckCircle, XCircle, Clock, TrendingUp, BarChart3,
  Search, Filter, Download, Eye, LogOut, Bell, Settings,
  UserCheck, FileText, Calendar, MapPin, Star, LayoutDashboard, Menu
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [unreadAlerts, setUnreadAlerts] = useState(12)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/uzasempower/login')
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FileCheck },
    { id: 'milestones', label: 'Milestones', icon: CheckCircle },
    { id: 'tranches', label: 'Tranches', icon: DollarSign },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'kyc', label: 'KYC Review', icon: UserCheck },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ]

  // Mock data
  const summaryData = {
    totalProjects: 45,
    pendingReview: 8,
    activeProjects: 32,
    totalFunds: 125000000,
    totalDisbursed: 85000000,
    pendingTranches: 5,
    alertsCount: 12,
    kycPending: 6
  }

  const projects = [
    {
      id: 1,
      title: 'Vegetable Farming Project',
      beneficiary: 'John Doe Cooperative',
      location: 'Kicukiro, Rwanda',
      category: 'Agriculture',
      status: 'Pending Review',
      requestedAmount: 5000000,
      kycStatus: 'Verified',
      submittedDate: '2024-01-20',
      health: 'N/A'
    },
    {
      id: 2,
      title: 'Poultry Farming Initiative',
      beneficiary: 'Women Farmers Group',
      location: 'Gasabo, Rwanda',
      category: 'Livestock',
      status: 'Active',
      requestedAmount: 3000000,
      kycStatus: 'Verified',
      submittedDate: '2024-01-15',
      health: 'On Track'
    },
    {
      id: 3,
      title: 'Beekeeping Project',
      beneficiary: 'Youth Cooperative',
      location: 'Nyarugenge, Rwanda',
      category: 'Agriculture',
      status: 'At Risk',
      requestedAmount: 2000000,
      kycStatus: 'Pending',
      submittedDate: '2024-01-18',
      health: 'At Risk'
    },
  ]

  const milestones = [
    {
      id: 1,
      project: 'Vegetable Farming Project',
      milestone: 'Land Preparation',
      status: 'Evidence Submitted',
      submittedDate: '2024-01-25',
      targetDate: '2024-01-20',
      evidenceCount: 5,
      trancheAmount: 500000
    },
    {
      id: 2,
      project: 'Poultry Farming Initiative',
      milestone: 'Coop Setup',
      status: 'Approved',
      submittedDate: '2024-01-22',
      targetDate: '2024-01-25',
      evidenceCount: 8,
      trancheAmount: 750000
    },
    {
      id: 3,
      project: 'Beekeeping Project',
      milestone: 'Hive Installation',
      status: 'Rejected',
      submittedDate: '2024-01-20',
      targetDate: '2024-01-18',
      evidenceCount: 3,
      trancheAmount: 300000
    },
  ]

  const alerts = [
    {
      id: 1,
      type: 'Anomaly Detected',
      project: 'Beekeeping Project',
      severity: 'High',
      description: 'Unusual spending pattern in Labour category',
      date: '2024-01-26 10:30',
      status: 'Open'
    },
    {
      id: 2,
      type: 'KYC Expired',
      project: 'Fish Farming Project',
      severity: 'Medium',
      description: 'KYC documents need renewal',
      date: '2024-01-25 14:20',
      status: 'Open'
    },
    {
      id: 3,
      type: 'Milestone Overdue',
      project: 'Vegetable Farming Project',
      severity: 'Low',
      description: 'Planting Complete milestone is 5 days overdue',
      date: '2024-01-24 09:15',
      status: 'Resolved'
    },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF', minimumFractionDigits: 0 }).format(amount)
  }

  const getStatusColor = (status) => {
    const colors = {
      'Pending Review': 'bg-yellow-100 text-yellow-800',
      'Active': 'bg-green-100 text-green-800',
      'At Risk': 'bg-red-100 text-red-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Evidence Submitted': 'bg-blue-100 text-blue-800',
      'Verified': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'On Track': 'bg-green-100 text-green-800',
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-blue-100 text-blue-800',
      'Open': 'bg-red-100 text-red-800',
      'Resolved': 'bg-green-100 text-green-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 fixed h-screen z-30`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <h2 className="text-xl font-bold text-[#FBAF43]">Admin Panel</h2>
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
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#FBAF43] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
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
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'} overflow-hidden`}>
        <div className="h-full overflow-y-auto pt-8 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Summary Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#E5243B] to-[#19486A] p-4 sm:p-6 mb-6 text-white shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-sm sm:text-base opacity-90">Manage projects, review milestones, and monitor system health</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Link href="#alerts" className="relative flex-shrink-0">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                  {unreadAlerts > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                      {unreadAlerts}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">Total Projects</p>
                <p className="text-sm sm:text-lg font-bold">{summaryData.totalProjects}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">Pending Review</p>
                <p className="text-sm sm:text-lg font-bold text-yellow-300">{summaryData.pendingReview}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">Active</p>
                <p className="text-sm sm:text-lg font-bold text-green-300">{summaryData.activeProjects}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">Total Funds</p>
                <p className="text-xs sm:text-sm font-bold break-words">{formatCurrency(summaryData.totalFunds)}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">Disbursed</p>
                <p className="text-xs sm:text-sm font-bold break-words">{formatCurrency(summaryData.totalDisbursed)}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">Pending Tranches</p>
                <p className="text-sm sm:text-lg font-bold text-yellow-300">{summaryData.pendingTranches}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">Alerts</p>
                <p className="text-sm sm:text-lg font-bold text-red-300">{summaryData.alertsCount}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">KYC Pending</p>
                <p className="text-sm sm:text-lg font-bold text-yellow-300">{summaryData.kycPending}</p>
              </div>
            </div>
          </motion.div>


          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white shadow-lg p-4 sm:p-6"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 transition-colors">
                      <FileCheck className="w-8 h-8 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-900">Review Projects</span>
                      <span className="text-xs text-gray-600">{summaryData.pendingReview} pending</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 transition-colors">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <span className="text-sm font-semibold text-gray-900">Review Milestones</span>
                      <span className="text-xs text-gray-600">3 pending</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 bg-yellow-50 hover:bg-yellow-100 transition-colors">
                      <DollarSign className="w-8 h-8 text-yellow-600" />
                      <span className="text-sm font-semibold text-gray-900">Release Tranches</span>
                      <span className="text-xs text-gray-600">{summaryData.pendingTranches} pending</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 transition-colors">
                      <UserCheck className="w-8 h-8 text-purple-600" />
                      <span className="text-sm font-semibold text-gray-900">KYC Review</span>
                      <span className="text-xs text-gray-600">{summaryData.kycPending} pending</span>
                    </button>
                  </div>
                </motion.div>

                {/* Recent Alerts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white shadow-lg p-4 sm:p-6"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Recent Alerts</h2>
                  <div className="space-y-3">
                    {alerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50">
                        <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          alert.severity === 'High' ? 'text-red-500' :
                          alert.severity === 'Medium' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{alert.type}</p>
                          <p className="text-xs text-gray-600 truncate">{alert.project}</p>
                          <p className="text-xs text-gray-500">{alert.date}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold flex-shrink-0 ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab('alerts')}
                    className="mt-4 w-full text-center text-sm text-[#FBAF43] hover:text-[#e59e3b] font-semibold"
                  >
                    View All Alerts
                  </button>
                </motion.div>
              </div>

              {/* System Health */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white  shadow-lg p-4 sm:p-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">System Health</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Projects On Track</p>
                    <p className="text-2xl font-bold text-green-700">28</p>
                    <p className="text-xs text-gray-500 mt-1">62% of active</p>
                  </div>
                  <div className="bg-yellow-50 p-4">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Projects At Risk</p>
                    <p className="text-2xl font-bold text-yellow-700">4</p>
                    <p className="text-xs text-gray-500 mt-1">9% of active</p>
                  </div>
                  <div className="bg-blue-50 p-4">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Avg. Response Time</p>
                    <p className="text-2xl font-bold text-blue-700">2.3 days</p>
                    <p className="text-xs text-gray-500 mt-1">Below target</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="bg-white  shadow-lg p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent text-sm"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Active">Active</option>
                    <option value="At Risk">At Risk</option>
                  </select>
                  <button className="flex items-center justify-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-4 py-2  transition-colors text-sm">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Projects Table */}
              <div className="bg-white  shadow-lg">
                <div className="-mx-4 sm:mx-0">
                  <table className="w-full text-xs sm:text-sm min-w-[800px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Project</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Beneficiary</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Location</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-semibold text-gray-600">Amount</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">KYC</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50">
                          <td className="px-2 sm:px-4 py-2 sm:py-3">
                            <p className="font-semibold text-gray-900">{project.title}</p>
                            <p className="text-xs text-gray-500">{project.category}</p>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-700">{project.beneficiary}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-700">{project.location}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3">
                            <span className={`px-2 py-1  text-xs font-medium ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-right font-semibold text-gray-900">{formatCurrency(project.requestedAmount)}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3">
                            <span className={`px-2 py-1  text-xs font-medium ${getStatusColor(project.kycStatus)}`}>
                              {project.kycStatus}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3">
                            <div className="flex gap-2">
                              <button className="text-[#FBAF43] hover:text-[#e59e3b]">
                                <Eye className="w-4 h-4" />
                              </button>
                              {project.status === 'Pending Review' && (
                                <>
                                  <button className="text-green-600 hover:text-green-700">
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-700">
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Milestones Tab */}
          {activeTab === 'milestones' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {milestones.map((milestone) => (
                <div key={milestone.id} className="bg-white  shadow-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{milestone.milestone}</h3>
                      <p className="text-sm text-gray-600 mb-2">Project: {milestone.project}</p>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <span>Target: {new Date(milestone.targetDate).toLocaleDateString()}</span>
                        <span>Submitted: {new Date(milestone.submittedDate).toLocaleDateString()}</span>
                        <span>Evidence: {milestone.evidenceCount} items</span>
                        <span className="font-semibold text-[#FBAF43]">
                          Tranche: {formatCurrency(milestone.trancheAmount)}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1  text-xs sm:text-sm font-semibold ${getStatusColor(milestone.status)}`}>
                      {milestone.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="flex items-center justify-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-4 py-2  transition-colors text-sm">
                      <Eye className="w-4 h-4" />
                      Review Evidence
                    </button>
                    {milestone.status === 'Evidence Submitted' && (
                      <>
                        <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2  transition-colors text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2  transition-colors text-sm">
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tranches Tab */}
          {activeTab === 'tranches' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white  shadow-lg p-4 sm:p-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Pending Tranche Releases</h2>
              <div className="space-y-4">
                {[
                  { project: 'Vegetable Farming Project', milestone: 'Seed Planting', amount: 1000000, status: 'Ready' },
                  { project: 'Poultry Farming Initiative', milestone: 'Coop Setup', amount: 750000, status: 'Ready' },
                  { project: 'Fish Farming Project', milestone: 'Pond Setup', amount: 500000, status: 'Pending Approval' },
                ].map((tranche, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 ">
                    <div>
                      <p className="font-semibold text-gray-900">{tranche.project}</p>
                      <p className="text-sm text-gray-600">{tranche.milestone}</p>
                      <p className="text-lg font-bold text-[#FBAF43] mt-1">{formatCurrency(tranche.amount)}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1  text-xs font-semibold ${getStatusColor(tranche.status)}`}>
                        {tranche.status}
                      </span>
                      {tranche.status === 'Ready' && (
                        <button className="bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-4 py-2  transition-colors text-sm">
                          Release Tranche
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-white  shadow-lg p-4 sm:p-6 border-l-4 border-red-500">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className={`w-5 h-5 ${
                          alert.severity === 'High' ? 'text-red-500' :
                          alert.severity === 'Medium' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} />
                        <span className="text-sm font-semibold text-gray-900">{alert.type}</span>
                        <span className={`px-2 py-1  text-xs font-semibold ${getStatusColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{alert.project}</span>
                        <span>{alert.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1  text-xs font-semibold ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                      {alert.status === 'Open' && (
                        <button className="bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-4 py-2  transition-colors text-sm">
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* KYC Tab */}
          {activeTab === 'kyc' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white  shadow-lg p-4 sm:p-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">KYC Verification Queue</h2>
              <div className="space-y-4">
                {[
                  { name: 'John Doe', project: 'Vegetable Farming Project', submitted: '2024-01-20', status: 'Pending' },
                  { name: 'Jane Smith', project: 'Poultry Farming Initiative', submitted: '2024-01-18', status: 'Under Review' },
                  { name: 'Bob Johnson', project: 'Beekeeping Project', submitted: '2024-01-15', status: 'Pending' },
                ].map((kyc, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 ">
                    <div>
                      <p className="font-semibold text-gray-900">{kyc.name}</p>
                      <p className="text-sm text-gray-600">{kyc.project}</p>
                      <p className="text-xs text-gray-500 mt-1">Submitted: {kyc.submitted}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1  text-xs font-semibold ${getStatusColor(kyc.status)}`}>
                        {kyc.status}
                      </span>
                      <button className="flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-4 py-2  transition-colors text-sm">
                        <Eye className="w-4 h-4" />
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white  shadow-lg p-4 sm:p-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">System Reports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100  transition-colors">
                  <BarChart3 className="w-8 h-8 text-[#FBAF43]" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Project Performance Report</p>
                    <p className="text-sm text-gray-600">Download comprehensive project analytics</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
                <button className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100  transition-colors">
                  <TrendingUp className="w-8 h-8 text-[#FBAF43]" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Financial Summary</p>
                    <p className="text-sm text-gray-600">View funding and disbursement reports</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
                <button className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100  transition-colors">
                  <Users className="w-8 h-8 text-[#FBAF43]" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">User Activity Report</p>
                    <p className="text-sm text-gray-600">Monitor user engagement and activity</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
                <button className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100  transition-colors">
                  <AlertTriangle className="w-8 h-8 text-[#FBAF43]" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Alert & Risk Report</p>
                    <p className="text-sm text-gray-600">Review system alerts and risk metrics</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
              </div>
            </motion.div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

