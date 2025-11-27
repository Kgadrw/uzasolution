'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Wallet, Calendar, CheckCircle, AlertCircle, Bell, 
  TrendingUp, DollarSign, FileText, Upload, Plus,
  MapPin, Image as ImageIcon, Download, Settings,
  LogOut, Eye, X, Camera, MapPin as MapPinIcon
} from 'lucide-react'

export default function BeneficiaryDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [showRequestFunds, setShowRequestFunds] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [unreadNotifications, setUnreadNotifications] = useState(3)

  const handleLogout = () => {
    // Clear any session data if needed
    // localStorage.removeItem('token')
    // sessionStorage.clear()
    
    // Redirect to login page
    router.push('/uzasempower/login/beneficiary')
  }

  // Mock data
  const summaryData = {
    cashBalance: 1250000,
    nextMilestone: 'Planting Complete',
    nextMilestoneDate: '2024-02-15',
    nextMilestoneStatus: 'In progress',
    pendingDecisions: 2,
    projectHealth: 'On Track'
  }

  const projectData = {
    title: 'Vegetable Farming Project',
    projectId: 'PROJ-2024-001',
    location: 'Kicukiro District, Kigali Sector',
    category: 'Agriculture – Vegetables',
    stage: 'Production',
    totalBudget: 5000000,
    totalDisbursed: 2500000,
    totalSpent: 1250000,
    totalRevenue: 1800000,
    margin: 30.4,
    runway: 45,
    reportingConsistency: '5 weeks with 1+ update',
    anomalyCount: 0
  }

  const transactions = [
    { id: 1, date: '2024-01-20', type: 'Expense', category: 'Seed', description: 'Tomato seeds purchase', amount: -50000, balance: 1200000, proofStatus: 'Uploaded', hasEvidence: true, location: 'Kigali' },
    { id: 2, date: '2024-01-18', type: 'Revenue', category: 'Sales', description: 'Tomato harvest sale', amount: 200000, balance: 1250000, proofStatus: 'Uploaded', hasEvidence: true, location: 'Kigali' },
    { id: 3, date: '2024-01-15', type: 'Disbursement', category: 'Funding', description: 'Tranche 2 release', amount: 1000000, balance: 1050000, proofStatus: 'N/A', hasEvidence: false, location: null },
    { id: 4, date: '2024-01-12', type: 'Expense', category: 'Fertilizer', description: 'Organic fertilizer', amount: -75000, balance: 50000, proofStatus: 'Uploaded', hasEvidence: true, location: 'Kigali' },
    { id: 5, date: '2024-01-10', type: 'Expense', category: 'Labour', description: 'Field preparation', amount: -100000, balance: 125000, proofStatus: 'Missing', hasEvidence: false, location: 'Kigali' },
  ]

  const milestones = [
    { id: 1, name: 'Land Preparation', description: 'Complete land clearing and soil preparation', targetDate: '2024-01-05', status: 'Approved', evidenceCount: 5, lastUpdated: '2024-01-04', trancheLinked: 500000, adminComment: 'Well done!' },
    { id: 2, name: 'Seed Planting', description: 'Plant all seeds according to plan', targetDate: '2024-01-20', status: 'Evidence submitted', evidenceCount: 8, lastUpdated: '2024-01-19', trancheLinked: 750000, adminComment: null },
    { id: 3, name: 'Planting Complete', description: 'Complete planting phase and initial maintenance', targetDate: '2024-02-15', status: 'In progress', evidenceCount: 2, lastUpdated: '2024-01-25', trancheLinked: 1000000, adminComment: null },
    { id: 4, name: 'First Harvest', description: 'Complete first harvest cycle', targetDate: '2024-03-30', status: 'Not started', evidenceCount: 0, lastUpdated: null, trancheLinked: 1250000, adminComment: null },
  ]

  const notifications = [
    { id: 1, type: 'Tranche released', message: 'Tranche 2 of 1,000,000 RWF has been released to your account', project: 'Vegetable Farming Project', date: '2024-01-15 10:30', status: 'Read' },
    { id: 2, type: 'Milestone approved', message: 'Land Preparation milestone has been approved', project: 'Vegetable Farming Project', date: '2024-01-05 14:20', status: 'Read' },
    { id: 3, type: 'Anomaly query', message: 'Please review and provide additional documentation for Labour expense on 2024-01-10', project: 'Vegetable Farming Project', date: '2024-01-12 09:15', status: 'Unread' },
    { id: 4, type: 'Top-up decision', message: 'Your top-up request for 500,000 RWF is under review', project: 'Vegetable Farming Project', date: '2024-01-22 16:45', status: 'Unread' },
  ]

  const getStatusColor = (status) => {
    const colors = {
      'On Track': 'bg-green-100 text-green-800',
      'At Risk': 'bg-yellow-100 text-yellow-800',
      'Paused': 'bg-red-100 text-red-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'In progress': 'bg-blue-100 text-blue-800',
      'Evidence submitted': 'bg-purple-100 text-purple-800',
      'Not started': 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF', minimumFractionDigits: 0 }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Summary Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#19486A] to-[#00689D] rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-white shadow-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/20 rounded-lg p-2 sm:p-3">
                  <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm opacity-90">Cash Balance</p>
                  <p className="text-lg sm:text-xl font-bold break-words">{formatCurrency(summaryData.cashBalance)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/20 rounded-lg p-2 sm:p-3">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm opacity-90">Next Milestone</p>
                  <p className="text-sm sm:text-lg font-semibold truncate">{summaryData.nextMilestone}</p>
                  <p className="text-xs opacity-75">{summaryData.nextMilestoneDate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/20 rounded-lg p-2 sm:p-3">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm opacity-90">Pending Decisions</p>
                  <p className="text-lg sm:text-xl font-bold">{summaryData.pendingDecisions}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-white/20 rounded-lg p-2 sm:p-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm opacity-90">Project Health</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(summaryData.projectHealth)}`}>
                      {summaryData.projectHealth}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Link href="#notifications" className="relative flex-shrink-0">
                    <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                        {unreadNotifications}
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
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="sticky top-0 z-10 bg-gray-50 pt-2 sm:pt-4 pb-2 mb-4 sm:mb-6 border-b border-gray-200 -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
              {['overview', 'transactions', 'milestones', 'request-funds', 'notifications', 'profile'].map((tab) => (
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

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Project Overview Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Project Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{projectData.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">ID: {projectData.projectId}</p>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{projectData.location}</span>
                      </div>
                      <p className="text-gray-700"><strong>Category:</strong> {projectData.category}</p>
                      <p className="text-gray-700"><strong>Stage:</strong> {projectData.stage}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span className="text-gray-600">Budget Progress</span>
                        <span className="font-semibold">{Math.round((projectData.totalDisbursed / projectData.totalBudget) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                        <div 
                          className="bg-[#FBAF43] h-2 sm:h-3 rounded-full"
                          style={{ width: `${(projectData.totalDisbursed / projectData.totalBudget) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <p className="text-gray-600">Total Budget</p>
                        <p className="font-bold text-sm sm:text-lg break-words">{formatCurrency(projectData.totalBudget)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Disbursed</p>
                        <p className="font-bold text-sm sm:text-lg break-words">{formatCurrency(projectData.totalDisbursed)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Spent</p>
                        <p className="font-bold text-sm sm:text-lg break-words">{formatCurrency(projectData.totalSpent)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <p className="font-bold text-sm sm:text-lg text-green-600 break-words">{formatCurrency(projectData.totalRevenue)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* KPI Chips */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Key Performance Indicators</h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <div className="bg-blue-50 px-3 sm:px-4 py-2 rounded-lg">
                      <p className="text-xs text-gray-600">Margin %</p>
                      <p className="text-base sm:text-lg font-bold text-blue-700">{projectData.margin}%</p>
                    </div>
                    <div className="bg-green-50 px-3 sm:px-4 py-2 rounded-lg">
                      <p className="text-xs text-gray-600">Runway</p>
                      <p className="text-base sm:text-lg font-bold text-green-700">{projectData.runway} days</p>
                    </div>
                    <div className="bg-purple-50 px-3 sm:px-4 py-2 rounded-lg">
                      <p className="text-xs text-gray-600">Reporting</p>
                      <p className="text-xs sm:text-sm font-semibold text-purple-700">{projectData.reportingConsistency}</p>
                    </div>
                    <div className="bg-red-50 px-3 sm:px-4 py-2 rounded-lg">
                      <p className="text-xs text-gray-600">Anomalies</p>
                      <p className="text-base sm:text-lg font-bold text-red-700">{projectData.anomalyCount}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recent Transactions Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-2 mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Transactions</h2>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => { setShowAddTransaction(true); setActiveTab('transactions') }}
                      className="flex items-center justify-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Transaction
                    </button>
                    <Link
                      href="#transactions"
                      onClick={() => setActiveTab('transactions')}
                      className="flex items-center justify-center gap-2 text-[#FBAF43] hover:text-[#e59e3b] font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      View All
                      <FileText className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-xs sm:text-sm min-w-[600px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Date</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Type</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Description</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-semibold text-gray-600">Amount</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600">Proof</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.slice(0, 5).map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50">
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-700 whitespace-nowrap">{new Date(tx.date).toLocaleDateString()}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3">
                            <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium ${
                              tx.type === 'Revenue' ? 'bg-green-100 text-green-800' :
                              tx.type === 'Disbursement' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {tx.type}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-700">{tx.category}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-700 max-w-[150px] truncate">{tx.description}</td>
                          <td className={`px-2 sm:px-4 py-2 sm:py-3 text-right font-semibold text-xs sm:text-sm whitespace-nowrap ${
                            tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3">
                            <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs ${
                              tx.proofStatus === 'Uploaded' ? 'bg-green-100 text-green-800' :
                              tx.proofStatus === 'Missing' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {tx.proofStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Transaction Ledger</h2>
                <button
                  onClick={() => setShowAddTransaction(true)}
                  className="flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Transaction
                </button>
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
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50">
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
                            tx.proofStatus === 'Uploaded' ? 'bg-green-100 text-green-800' :
                            tx.proofStatus === 'Missing' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {tx.proofStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {tx.location && (
                            <div className="flex items-center gap-1">
                              <MapPinIcon className="w-3 h-3" />
                              {tx.location}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {tx.hasEvidence && (
                            <button className="text-[#FBAF43] hover:text-[#e59e3b]">
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                        {milestone.trancheLinked && (
                          <span className="font-semibold text-[#FBAF43]">
                            Tranche: {formatCurrency(milestone.trancheLinked)}
                          </span>
                        )}
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
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedMilestone(milestone)}
                      className="flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      {milestone.status === 'Not started' || milestone.status === 'In progress' ? (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload Evidence
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          View Details
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Request Funds Tab */}
          {activeTab === 'request-funds' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Additional Funds</h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requested Amount (RWF)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purpose / What You Need the Money For</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                    placeholder="Describe what you need the funds for..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Which Milestone / Stage This Supports</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent">
                    <option>Select milestone...</option>
                    {milestones.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Revenue (RWF)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                      placeholder="Expected revenue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Timeline</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                      placeholder="e.g., 8 weeks"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Notes / Justification</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                    placeholder="Additional justification..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attach Supporting Files (optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><strong>Current Margin:</strong> {projectData.margin}%</p>
                  <p><strong>Milestones Completed:</strong> {milestones.filter(m => m.status === 'Approved').length} / {milestones.length}</p>
                  <p><strong>Anomaly Count:</strong> {projectData.anomalyCount}</p>
                  <p><strong>Reporting Consistency:</strong> {projectData.reportingConsistency}</p>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Submit Request
                </button>
              </form>
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
                        <span className="text-sm font-semibold text-gray-900">{notif.type}</span>
                        {notif.status === 'Unread' && (
                          <span className="bg-[#FBAF43] text-white text-xs px-2 py-1 rounded-full">New</span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-2">{notif.message}</p>
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

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile & KYC Status</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-400">JD</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                    <p className="text-sm text-gray-600">Business Name: Doe Farming Cooperative</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      KYC Verified
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                    <p className="text-gray-900">National ID</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                    <p className="text-gray-900">119**********1234</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">+250 788 123 456</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">john.doe@example.com</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">MoMo Number</label>
                    <p className="text-gray-900">0788***456</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
                    <p className="text-gray-900">****1234</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-gray-900">Kicukiro District, Kigali Sector, Rwanda</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Allow my project photos to appear publicly</span>
                  </label>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button className="flex items-center justify-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold px-4 sm:px-6 py-2 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 sm:px-6 py-2 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Add Transaction Modal */}
          {showAddTransaction && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Add Transaction</h3>
                  <button onClick={() => setShowAddTransaction(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43]">
                        <option>Expense</option>
                        <option>Revenue</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43]" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                      <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43]">
                        <option>RWF</option>
                        <option>USD</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43]">
                      <option>Seed</option>
                      <option>Fertilizer</option>
                      <option>Labour</option>
                      <option>Transport</option>
                      <option>Utilities</option>
                      <option>Equipment</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43]">
                      <option>Cash</option>
                      <option>MoMo</option>
                      <option>Bank</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vendor / Buyer Name (optional)</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43]" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description / Notes</label>
                    <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBAF43]" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attach Proof</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload image or PDF</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="gps" className="rounded" />
                    <label htmlFor="gps" className="text-sm text-gray-700">Auto-capture GPS location</label>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddTransaction(false)}
                      className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Save Transaction
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

