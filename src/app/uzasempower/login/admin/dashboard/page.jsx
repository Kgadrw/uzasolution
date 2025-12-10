'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Users, FileCheck, DollarSign, AlertTriangle, 
  CheckCircle, XCircle, Clock, TrendingUp, BarChart3,
  Search, Download, Eye, LogOut, Bell,
  UserCheck, LayoutDashboard, Menu, X, Info
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const notificationDropdownRef = useRef(null)

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

  const notifications = [
    {
      id: 1,
      title: 'New Project Submitted',
      message: 'Vegetable Farming Project has been submitted for review',
      date: '2024-01-20',
      read: false,
      type: 'info'
    },
    {
      id: 2,
      title: 'Milestone Evidence Submitted',
      message: 'Poultry Farming Initiative has submitted evidence for Coop Setup milestone',
      date: '2024-01-19',
      read: false,
      type: 'info'
    },
    {
      id: 3,
      title: 'High Priority Alert',
      message: 'Beekeeping Project has an anomaly detected',
      date: '2024-01-18',
      read: false,
      type: 'warning'
    },
    {
      id: 4,
      title: 'KYC Pending Review',
      message: '6 KYC applications are pending review',
      date: '2024-01-17',
      read: true,
      type: 'info'
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
    <div className="h-screen bg-gray-50 flex overflow-hidden font-opensans" style={{ fontFamily: '"Open Sans", sans-serif', fontOpticalSizing: 'auto', fontStyle: 'normal', fontVariationSettings: '"wdth" 100' }}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 fixed h-screen z-30`}>
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between h-[80px]">
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
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  activeTab === item.id
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
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'} overflow-hidden`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between h-[80px]">
          <div>
            <h1 className="text-2xl text-gray-900">Welcome back Admin User</h1>
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
                                  <AlertTriangle className="w-4 h-4" />
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
                  A
                </div>
                <div>
                  <p className="text-sm text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-600">admin@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full overflow-y-auto p-6">


          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Total Projects</p>
                    <FileCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl text-gray-900">{summaryData.totalProjects}</p>
                  <p className="text-xs text-gray-500 mt-1">All projects in system</p>
                </div>
                <div className="bg-white border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Pending Review</p>
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-2xl text-gray-900">{summaryData.pendingReview}</p>
                  <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
                </div>
                <div className="bg-white border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Active Projects</p>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl text-gray-900">{summaryData.activeProjects}</p>
                  <p className="text-xs text-gray-500 mt-1">Currently active</p>
                </div>
                <div className="bg-white border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Total Funds</p>
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-lg text-gray-900">{formatCurrency(summaryData.totalFunds)}</p>
                  <p className="text-xs text-gray-500 mt-1">Total requested</p>
                </div>
                <div className="bg-white border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Total Disbursed</p>
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-lg text-gray-900">{formatCurrency(summaryData.totalDisbursed)}</p>
                  <p className="text-xs text-gray-500 mt-1">Funds released</p>
                </div>
                <div className="bg-white border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Pending Tranches</p>
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-2xl text-gray-900">{summaryData.pendingTranches}</p>
                  <p className="text-xs text-gray-500 mt-1">Awaiting release</p>
                </div>
                <div className="bg-white border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Active Alerts</p>
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="text-2xl text-gray-900">{summaryData.alertsCount}</p>
                  <p className="text-xs text-gray-500 mt-1">Require attention</p>
                </div>
                <div className="bg-white border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">KYC Pending</p>
                    <UserCheck className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl text-gray-900">{summaryData.kycPending}</p>
                  <p className="text-xs text-gray-500 mt-1">Awaiting verification</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-lg text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setActiveTab('projects')}
                    className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <FileCheck className="w-8 h-8 text-blue-600" />
                    <span className="text-sm text-gray-900">Review Projects</span>
                    <span className="text-xs text-gray-600">{summaryData.pendingReview} pending</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('milestones')}
                    className="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <span className="text-sm text-gray-900">Review Milestones</span>
                    <span className="text-xs text-gray-600">3 pending</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('tranches')}
                    className="flex flex-col items-center gap-2 p-4 bg-yellow-50 hover:bg-yellow-100 transition-colors"
                  >
                    <DollarSign className="w-8 h-8 text-yellow-600" />
                    <span className="text-sm text-gray-900">Release Tranches</span>
                    <span className="text-xs text-gray-600">{summaryData.pendingTranches} pending</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('kyc')}
                    className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <UserCheck className="w-8 h-8 text-purple-600" />
                    <span className="text-sm text-gray-900">KYC Review</span>
                    <span className="text-xs text-gray-600">{summaryData.kycPending} pending</span>
                  </button>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg text-gray-900">Recent Alerts</h2>
                  <button
                    onClick={() => setActiveTab('alerts')}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {alerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50">
                      <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        alert.severity === 'High' ? 'text-red-500' :
                        alert.severity === 'Medium' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">{alert.type}</p>
                        <p className="text-xs text-gray-600 truncate">{alert.project}</p>
                        <p className="text-xs text-gray-500">{alert.date}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs flex-shrink-0 ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white border border-gray-200 p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Active">Active</option>
                    <option value="At Risk">At Risk</option>
                  </select>
                  <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 transition-colors text-sm">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Projects Table */}
              <div className="bg-white border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs text-gray-600">Project</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-600">Beneficiary</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-600">Location</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-600">Status</th>
                      <th className="px-4 py-3 text-right text-xs text-gray-600">Amount</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-600">KYC</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <p className="text-gray-900">{project.title}</p>
                          <p className="text-xs text-gray-500">{project.category}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{project.beneficiary}</td>
                        <td className="px-4 py-3 text-gray-700">{project.location}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-gray-900">{formatCurrency(project.requestedAmount)}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs ${getStatusColor(project.kycStatus)}`}>
                            {project.kycStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="text-green-600 hover:text-green-700">
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
          )}

          {/* Milestones Tab */}
          {activeTab === 'milestones' && (
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="bg-white border border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900 mb-2">{milestone.milestone}</h3>
                      <p className="text-sm text-gray-600 mb-2">Project: {milestone.project}</p>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <span>Target: {new Date(milestone.targetDate).toLocaleDateString()}</span>
                        <span>Submitted: {new Date(milestone.submittedDate).toLocaleDateString()}</span>
                        <span>Evidence: {milestone.evidenceCount} items</span>
                        <span className="text-green-600">
                          Tranche: {formatCurrency(milestone.trancheAmount)}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs sm:text-sm ${getStatusColor(milestone.status)}`}>
                      {milestone.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 transition-colors text-sm">
                      <Eye className="w-4 h-4" />
                      Review Evidence
                    </button>
                    {milestone.status === 'Evidence Submitted' && (
                      <>
                        <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 transition-colors text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 transition-colors text-sm">
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tranches Tab */}
          {activeTab === 'tranches' && (
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-lg text-gray-900 mb-6">Pending Tranche Releases</h2>
              <div className="space-y-4">
                {[
                  { project: 'Vegetable Farming Project', milestone: 'Seed Planting', amount: 1000000, status: 'Ready' },
                  { project: 'Poultry Farming Initiative', milestone: 'Coop Setup', amount: 750000, status: 'Ready' },
                  { project: 'Fish Farming Project', milestone: 'Pond Setup', amount: 500000, status: 'Pending Approval' },
                ].map((tranche, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50">
                    <div>
                      <p className="text-gray-900">{tranche.project}</p>
                      <p className="text-sm text-gray-600">{tranche.milestone}</p>
                      <p className="text-lg text-green-600 mt-1">{formatCurrency(tranche.amount)}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 text-xs ${getStatusColor(tranche.status)}`}>
                        {tranche.status}
                      </span>
                      {tranche.status === 'Ready' && (
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 transition-colors text-sm">
                          Release Tranche
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-white border border-gray-200 p-6 border-l-4 border-red-500">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className={`w-5 h-5 ${
                          alert.severity === 'High' ? 'text-red-500' :
                          alert.severity === 'Medium' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} />
                        <span className="text-sm text-gray-900">{alert.type}</span>
                        <span className={`px-2 py-1 text-xs ${getStatusColor(alert.severity)}`}>
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
                      <span className={`px-3 py-1 text-xs ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                      {alert.status === 'Open' && (
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 transition-colors text-sm">
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* KYC Tab */}
          {activeTab === 'kyc' && (
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-lg text-gray-900 mb-6">KYC Verification Queue</h2>
              <div className="space-y-4">
                {[
                  { name: 'John Doe', project: 'Vegetable Farming Project', submitted: '2024-01-20', status: 'Pending' },
                  { name: 'Jane Smith', project: 'Poultry Farming Initiative', submitted: '2024-01-18', status: 'Under Review' },
                  { name: 'Bob Johnson', project: 'Beekeeping Project', submitted: '2024-01-15', status: 'Pending' },
                ].map((kyc, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50">
                    <div>
                      <p className="text-gray-900">{kyc.name}</p>
                      <p className="text-sm text-gray-600">{kyc.project}</p>
                      <p className="text-xs text-gray-500 mt-1">Submitted: {kyc.submitted}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 text-xs ${getStatusColor(kyc.status)}`}>
                        {kyc.status}
                      </span>
                      <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 transition-colors text-sm">
                        <Eye className="w-4 h-4" />
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-lg text-gray-900 mb-6">System Reports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                  <div className="text-left">
                    <p className="text-gray-900">Project Performance Report</p>
                    <p className="text-sm text-gray-600">Download comprehensive project analytics</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
                <button className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div className="text-left">
                    <p className="text-gray-900">Financial Summary</p>
                    <p className="text-sm text-gray-600">View funding and disbursement reports</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
                <button className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Users className="w-8 h-8 text-green-600" />
                  <div className="text-left">
                    <p className="text-gray-900">User Activity Report</p>
                    <p className="text-sm text-gray-600">Monitor user engagement and activity</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
                <button className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <AlertTriangle className="w-8 h-8 text-green-600" />
                  <div className="text-left">
                    <p className="text-gray-900">Alert & Risk Report</p>
                    <p className="text-sm text-gray-600">Review system alerts and risk metrics</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

