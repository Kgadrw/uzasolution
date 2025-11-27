'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  DollarSign, TrendingUp, CheckCircle, AlertCircle, Bell,
  Search, Filter, Download, Eye, MapPin, Calendar,
  Users, Heart, FileText, Image as ImageIcon, Star,
  BarChart3, PieChart, ArrowRight, X, LogOut
} from 'lucide-react'

export default function DonorDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('portfolio')
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRegion, setFilterRegion] = useState('all')
  const [unreadAlerts, setUnreadAlerts] = useState(5)

  const handleLogout = () => {
    // Clear any session data if needed
    // localStorage.removeItem('token')
    // sessionStorage.clear()
    
    // Redirect to login page
    router.push('/uzasempower/login/donor')
  }

  // Mock data
  const portfolioSummary = {
    totalPledged: 15000000,
    totalDisbursed: 8500000,
    activeProjects: 8,
    completedProjects: 3,
    onTrackProjects: 6,
    atRiskProjects: 2,
    averageImpactScore: 4.5,
    unreadAlerts: 5
  }

  const projects = [
    {
      id: 1,
      title: 'Vegetable Farming Project',
      beneficiary: 'John Doe Cooperative',
      location: 'Kicukiro, Rwanda',
      category: 'Agriculture',
      kycStatus: 'Verified',
      fundingGoal: 5000000,
      pledgeAmount: 2000000,
      totalFunded: 3500000,
      trancheStatus: 'Tranche 2 of 4, Released',
      healthBadge: 'On Track',
      lastMilestone: 'Met',
      lastUpdate: '2024-01-20',
      hasAlerts: false
    },
    {
      id: 2,
      title: 'Poultry Farming Initiative',
      beneficiary: 'Women Farmers Group',
      location: 'Gasabo, Rwanda',
      category: 'Livestock',
      kycStatus: 'Verified',
      fundingGoal: 3000000,
      pledgeAmount: 1500000,
      totalFunded: 2800000,
      trancheStatus: 'Tranche 1 of 3, Released',
      healthBadge: 'On Track',
      lastMilestone: 'Met',
      lastUpdate: '2024-01-18',
      hasAlerts: false
    },
    {
      id: 3,
      title: 'Beekeeping Project',
      beneficiary: 'Youth Cooperative',
      location: 'Nyarugenge, Rwanda',
      category: 'Agriculture',
      kycStatus: 'Pending',
      fundingGoal: 2000000,
      pledgeAmount: 1000000,
      totalFunded: 1200000,
      trancheStatus: 'Tranche 1 of 2, In Escrow',
      healthBadge: 'At Risk',
      lastMilestone: 'Late',
      lastUpdate: '2024-01-15',
      hasAlerts: true
    },
    {
      id: 4,
      title: 'Fish Farming Project',
      beneficiary: 'Community Group',
      location: 'Muhanga, Rwanda',
      category: 'Aquaculture',
      kycStatus: 'Verified',
      fundingGoal: 4000000,
      pledgeAmount: 2500000,
      totalFunded: 4000000,
      trancheStatus: 'Completed',
      healthBadge: 'On Track',
      lastMilestone: 'Met',
      lastUpdate: '2024-01-10',
      hasAlerts: false
    },
  ]

  const projectDetails = {
    title: 'Vegetable Farming Project',
    story: 'A sustainable vegetable farming initiative supporting local farmers in Kicukiro District. This project aims to increase food security and provide income opportunities for 20+ families.',
    impactTags: ['Youth', 'Women', 'Climate-smart agriculture'],
    location: 'Kicukiro District, Rwanda',
    kycStatus: 'Verified',
    kycSummary: 'All documents verified. ID, bank account, and business registration confirmed.',
    fundingGoal: 5000000,
    totalFunded: 3500000,
    pledgeAmount: 2000000,
    pledgePercentage: 40,
    tranchePlan: [
      { number: 1, amount: 500000, status: 'Released' },
      { number: 2, amount: 1000000, status: 'Released' },
      { number: 3, amount: 1500000, status: 'In Escrow' },
      { number: 4, amount: 2000000, status: 'Pending' }
    ],
    currentTranche: { number: 2, amount: 1000000, status: 'Released' },
    healthBadge: 'On Track',
    kpis: {
      margin: 30.4,
      milestonesOnTime: 85,
      reportingFrequency: 'Weekly',
      anomalyFlag: false
    }
  }

  const milestones = [
    { id: 1, name: 'Land Preparation', description: 'Complete land clearing and soil preparation', targetDate: '2024-01-05', status: 'Approved', trancheAmount: 500000, evidenceCount: 5, approvedDate: '2024-01-04', adminComment: 'Well executed' },
    { id: 2, name: 'Seed Planting', description: 'Plant all seeds according to plan', targetDate: '2024-01-20', status: 'Evidence submitted', trancheAmount: 750000, evidenceCount: 8, approvedDate: null, adminComment: null },
    { id: 3, name: 'Planting Complete', description: 'Complete planting phase and initial maintenance', targetDate: '2024-02-15', status: 'Not started', trancheAmount: 1000000, evidenceCount: 0, approvedDate: null, adminComment: null },
  ]

  const ledgerSummary = [
    { date: '2024-01-20', type: 'Expense', category: 'Seed', description: 'Tomato seeds purchase', amount: -50000, balance: 1200000, proofAvailable: true, flagged: false },
    { date: '2024-01-18', type: 'Revenue', category: 'Sales', description: 'Tomato harvest sale', amount: 200000, balance: 1250000, proofAvailable: true, flagged: false },
    { date: '2024-01-15', type: 'Disbursement', category: 'Funding', description: 'Tranche 2 release', amount: 1000000, balance: 1050000, proofAvailable: false, flagged: false },
  ]

  const alerts = [
    { id: 1, type: 'Anomaly detected', description: 'Unusual spending pattern detected in Labour category', project: 'Beekeeping Project', raisedOn: '2024-01-16 10:30', status: 'Under review', impact: 'Partial freeze on future tranches' },
    { id: 2, type: 'Tranche frozen', description: 'Tranche 2 temporarily frozen pending review', project: 'Beekeeping Project', raisedOn: '2024-01-15 14:20', status: 'Under review', impact: 'Future tranches paused' },
  ]

  const notifications = [
    { id: 1, title: 'Milestone Reached', description: 'Vegetable Farming Project has completed Land Preparation milestone', project: 'Vegetable Farming Project', date: '2024-01-05 14:20', status: 'Read' },
    { id: 2, title: 'Tranche Released', description: 'Tranche 2 of 1,000,000 RWF has been released to Vegetable Farming Project', project: 'Vegetable Farming Project', date: '2024-01-15 10:30', status: 'Read' },
    { id: 3, title: 'Project Completed', description: 'Fish Farming Project has been completed. Impact report is ready', project: 'Fish Farming Project', date: '2024-01-10 16:45', status: 'Unread' },
    { id: 4, title: 'Top-up Opportunity', description: 'Vegetable Farming Project is requesting additional funding', project: 'Vegetable Farming Project', date: '2024-01-22 09:15', status: 'Unread' },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF', minimumFractionDigits: 0 }).format(amount)
  }

  const getStatusColor = (status) => {
    const colors = {
      'On Track': 'bg-green-100 text-green-800',
      'At Risk': 'bg-yellow-100 text-yellow-800',
      'Paused': 'bg-red-100 text-red-800',
      'Verified': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Met': 'bg-green-100 text-green-800',
      'Late': 'bg-red-100 text-red-800',
      'Approved': 'bg-green-100 text-green-800',
      'Evidence submitted': 'bg-purple-100 text-purple-800',
      'Not started': 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.beneficiary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory
    const matchesStatus = filterStatus === 'all' || project.healthBadge === filterStatus
    const matchesRegion = filterRegion === 'all' || project.location.includes(filterRegion)
    return matchesSearch && matchesCategory && matchesStatus && matchesRegion
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Portfolio Summary Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#E5243B] to-[#19486A] rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-white shadow-xl"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">Total Pledged</p>
                <p className="text-sm sm:text-lg font-bold break-words">{formatCurrency(portfolioSummary.totalPledged)}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">Total Disbursed</p>
                <p className="text-sm sm:text-lg font-bold break-words">{formatCurrency(portfolioSummary.totalDisbursed)}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">Active Projects</p>
                <p className="text-sm sm:text-lg font-bold">{portfolioSummary.activeProjects}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">Completed</p>
                <p className="text-sm sm:text-lg font-bold">{portfolioSummary.completedProjects}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">On Track</p>
                <p className="text-sm sm:text-lg font-bold text-green-300">{portfolioSummary.onTrackProjects}</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs opacity-90 mb-1">At Risk</p>
                <p className="text-sm sm:text-lg font-bold text-yellow-300">{portfolioSummary.atRiskProjects}</p>
              </div>
              <div className="flex items-center justify-end gap-3 col-span-2 sm:col-span-1">
                <Link href="#alerts" className="relative flex-shrink-0">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                  {unreadAlerts > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                      {unreadAlerts}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 sm:gap-2 text-white hover:text-gray-200 transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/10"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="sticky top-0 z-10 bg-gray-50 pt-2 sm:pt-4 pb-2 mb-4 sm:mb-6 border-b border-gray-200 -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
              {['portfolio', 'project-details', 'milestones', 'ledger', 'alerts', 'impact', 'notifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 sm:px-4 py-2 font-medium text-xs sm:text-sm capitalize transition-colors whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab
                      ? 'text-[#FBAF43] border-b-2 border-[#FBAF43]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Livestock">Livestock</option>
                    <option value="Aquaculture">Aquaculture</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="On Track">On Track</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Paused">Paused</option>
                  </select>
                  <select
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                  >
                    <option value="all">All Regions</option>
                    <option value="Kicukiro">Kicukiro</option>
                    <option value="Gasabo">Gasabo</option>
                    <option value="Nyarugenge">Nyarugenge</option>
                  </select>
                </div>
              </div>

              {/* Projects Table */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-xs sm:text-sm min-w-[1000px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Project</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Beneficiary</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Location</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">KYC</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-semibold text-gray-600">Your Pledge</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-semibold text-gray-600">Funded %</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Health</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredProjects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-semibold text-gray-900">{project.title}</p>
                              <p className="text-xs text-gray-500">{project.trancheStatus}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{project.beneficiary}</td>
                          <td className="px-4 py-3 text-gray-700">{project.location}</td>
                          <td className="px-4 py-3 text-gray-700">{project.category}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.kycStatus)}`}>
                              {project.kycStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatCurrency(project.pledgeAmount)}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <span className="font-semibold">{Math.round((project.totalFunded / project.fundingGoal) * 100)}%</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-[#FBAF43] h-2 rounded-full"
                                  style={{ width: `${Math.min((project.totalFunded / project.fundingGoal) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.lastMilestone)}`}>
                              {project.lastMilestone}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.healthBadge)}`}>
                              {project.healthBadge}
                            </span>
                            {project.hasAlerts && (
                              <AlertCircle className="w-4 h-4 text-red-500 inline-block ml-2" />
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => { setSelectedProject(project); setActiveTab('project-details') }}
                              className="text-[#FBAF43] hover:text-[#e59e3b] font-semibold text-sm"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Project Details Tab */}
          {activeTab === 'project-details' && selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{projectDetails.title}</h2>
                    <p className="text-gray-600">{projectDetails.story}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact Focus</h3>
                    <div className="flex flex-wrap gap-2">
                      {projectDetails.impactTags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#FBAF43]/20 text-[#FBAF43] rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{projectDetails.location}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(projectDetails.kycStatus)}`}>
                      KYC {projectDetails.kycStatus}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{projectDetails.kycSummary}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Funding Goal</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(projectDetails.fundingGoal)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Funded</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(projectDetails.totalFunded)}</p>
                    <p className="text-sm text-gray-500">{Math.round((projectDetails.totalFunded / projectDetails.fundingGoal) * 100)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Your Pledge</p>
                    <p className="text-2xl font-bold text-[#FBAF43]">{formatCurrency(projectDetails.pledgeAmount)}</p>
                    <p className="text-sm text-gray-500">{projectDetails.pledgePercentage}% of project</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tranche Plan</h3>
                  <div className="space-y-3">
                    {projectDetails.tranchePlan.map((tranche) => (
                      <div key={tranche.number} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">Tranche {tranche.number}</p>
                          <p className="text-sm text-gray-600">{formatCurrency(tranche.amount)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tranche.status === 'Released' ? 'bg-green-100 text-green-800' :
                          tranche.status === 'In Escrow' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {tranche.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Margin %</p>
                      <p className="text-xl font-bold text-blue-700">{projectDetails.kpis.margin}%</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Milestones On Time</p>
                      <p className="text-xl font-bold text-green-700">{projectDetails.kpis.milestonesOnTime}%</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Reporting</p>
                      <p className="text-sm font-semibold text-purple-700">{projectDetails.kpis.reportingFrequency}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Anomalies</p>
                      <p className="text-xl font-bold text-red-700">{projectDetails.kpis.anomalyFlag ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
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
                <div key={milestone.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Target: {new Date(milestone.targetDate).toLocaleDateString()}</span>
                        <span>Evidence: {milestone.evidenceCount} items</span>
                        <span className="font-semibold text-[#FBAF43]">
                          Tranche: {formatCurrency(milestone.trancheAmount)}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(milestone.status)}`}>
                      {milestone.status}
                    </span>
                  </div>
                  
                  {milestone.adminComment && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-blue-800"><strong>Admin:</strong> {milestone.adminComment}</p>
                    </div>
                  )}
                  
                  {milestone.approvedDate && (
                    <p className="text-sm text-gray-600 mb-4">
                      Approved on: {new Date(milestone.approvedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* Ledger Tab */}
          {activeTab === 'ledger' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Ledger Summary</h2>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-gray-700">Show summary by category</span>
                </label>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Description</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">Amount</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">Balance</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Proof</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Flagged</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {ledgerSummary.map((tx, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-700">{new Date(tx.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            tx.type === 'Revenue' ? 'bg-green-100 text-green-800' :
                            tx.type === 'Disbursement' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{tx.category}</td>
                        <td className="px-4 py-3 text-gray-700">{tx.description}</td>
                        <td className={`px-4 py-3 text-right font-semibold ${
                          tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-700">{formatCurrency(tx.balance)}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            tx.proofAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {tx.proofAvailable ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            tx.flagged ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {tx.flagged ? 'Under Review' : 'Normal'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Alerts</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Critical</p>
                    <p className="text-2xl font-bold text-red-700">0</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Warning</p>
                    <p className="text-2xl font-bold text-yellow-700">2</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Info</p>
                    <p className="text-2xl font-bold text-blue-700">3</p>
                  </div>
                </div>
              </div>

              {alerts.map((alert) => (
                <div key={alert.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-gray-900">{alert.type}</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                          {alert.status}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        <span>{alert.project}</span>
                        <span>{alert.raisedOn}</span>
                      </div>
                      <p className="text-sm text-gray-600"><strong>Impact:</strong> {alert.impact}</p>
                    </div>
                    <button className="text-[#FBAF43] hover:text-[#e59e3b] font-semibold text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Impact Tab */}
          {activeTab === 'impact' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Impact & Reporting</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Score</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-[#FBAF43]">{portfolioSummary.averageImpactScore}</div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 ${
                              star <= Math.round(portfolioSummary.averageImpactScore)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">High Impact</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Total Beneficiaries Reached</p>
                        <p className="text-2xl font-bold text-gray-900">120+</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Estimated Income Uplift</p>
                        <p className="text-2xl font-bold text-gray-900">45%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Feedback</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Share feedback with program team</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                        placeholder="Your feedback helps us improve..."
                      />
                    </div>
                    <button className="bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors">
                      Submit Feedback
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <button className="flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    Download Impact Report (PDF)
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
                    notif.status === 'Unread' ? 'border-[#FBAF43] bg-yellow-50' : 'border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-gray-900">{notif.title}</span>
                        {notif.status === 'Unread' && (
                          <span className="bg-[#FBAF43] text-white text-xs px-2 py-1 rounded-full">New</span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-2">{notif.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{notif.project}</span>
                        <span>{notif.date}</span>
                      </div>
                    </div>
                    <button className="text-[#FBAF43] hover:text-[#e59e3b] font-semibold text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

