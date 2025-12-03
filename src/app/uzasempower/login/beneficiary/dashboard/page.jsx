'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Wallet, Calendar, CheckCircle, AlertCircle, 
  TrendingUp, DollarSign, FileText, Upload, Plus,
  MapPin, Image as ImageIcon, Download, Settings,
  LogOut, Eye, X, Camera, MapPin as MapPinIcon, LayoutDashboard, Menu, ArrowRight
} from 'lucide-react'

export default function BeneficiaryDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile-project')
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [showRequestFunds, setShowRequestFunds] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/uzasempower/login')
  }

  const menuItems = [
    { id: 'profile-project', label: 'Profile & Project', icon: Settings },
    { id: 'funding-request', label: 'Funding Request', icon: Plus },
    { id: 'transactions', label: 'Record Transaction', icon: DollarSign },
    { id: 'milestones', label: 'Submit Evidence', icon: CheckCircle },
    { id: 'tranches', label: 'Tranches', icon: TrendingUp },
  ]

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
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 fixed h-screen z-30`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <h2 className="text-xl font-bold text-[#FBAF43]">My Dashboard</h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 "
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
        <div className="h-full overflow-y-auto custom-scrollbar pt-8 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">


          {/* Profile & Project Tab */}
          {activeTab === 'profile-project' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Profile Section */}
              <div className="bg-white shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile & Project Information</h2>
                
                <div className="space-y-6">
                  {/* Personal Profile */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Full Name</label>
                        <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Business Name</label>
                        <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent" placeholder="Doe Farming Cooperative" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Phone Number</label>
                        <input type="tel" className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent" placeholder="+250 788 123 456" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
                        <input type="email" className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent" placeholder="john.doe@example.com" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Location</label>
                        <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent" placeholder="Kicukiro District, Kigali Sector, Rwanda" />
                      </div>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Project Title</label>
                        <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent" placeholder="What is your project?" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Project Location</label>
                        <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent" placeholder="Where is your project located?" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Project Description</label>
                        <textarea rows={3} className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent" placeholder="Describe your project..." />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Total Budget Required (RWF)</label>
                        <input type="number" className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent" placeholder="How much do you need?" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold py-2 px-4 text-sm transition-colors">
                      Save Profile & Project
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Record Transaction Tab */}
          {activeTab === 'transactions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Quick Record Form */}
              <div className="bg-white shadow-lg p-6 max-w-2xl mx-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Record Transaction</h2>
                <p className="text-sm text-gray-600 mb-6">Record every spend or sale with photo proof</p>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Transaction Type</label>
                      <select className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent">
                        <option>Select type...</option>
                        <option>Expense (Spend)</option>
                        <option>Revenue (Sale)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Date</label>
                      <input type="date" className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Amount (RWF)</label>
                    <input type="number" className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent" placeholder="Enter amount" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Description</label>
                    <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent" placeholder="What was this transaction for?" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Category</label>
                    <select className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent">
                      <option>Select category...</option>
                      <option>Seed</option>
                      <option>Fertilizer</option>
                      <option>Labour</option>
                      <option>Equipment</option>
                      <option>Transport</option>
                      <option>Sales</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Photo Proof (Required)</label>
                    <div className="border-2 border-dashed border-gray-300 p-4 text-center hover:border-[#FBAF43] transition-colors cursor-pointer">
                      <Camera className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                      <p className="text-xs text-gray-600">Click to upload photo</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="gps" className="rounded" defaultChecked />
                    <label htmlFor="gps" className="text-xs text-gray-700">Auto-capture GPS location</label>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold py-2 px-4 text-sm transition-colors"
                  >
                    Record Transaction
                  </button>
                </form>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
                <div className="space-y-2">
                  {transactions.slice(0, 5).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 border border-gray-200 hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs font-medium ${
                          tx.type === 'Revenue' ? 'bg-green-100 text-green-800' :
                          tx.type === 'Disbursement' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {tx.type}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                          <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${
                          tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                        </p>
                        <span className={`text-[10px] ${
                          tx.proofStatus === 'Uploaded' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {tx.proofStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Submit Evidence Tab */}
          {activeTab === 'milestones' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedMilestone(milestone)}
                  className="bg-white shadow-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-gray-200 hover:border-[#FBAF43] group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FBAF43] to-[#e59e3b] text-white flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#FBAF43] transition-colors truncate">{milestone.name}</h3>
                        <span className={`inline-block mt-1 px-1.5 py-0.5 text-[10px] font-semibold ${getStatusColor(milestone.status)}`}>
                          {milestone.status}
                        </span>
                      </div>
                    </div>
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      milestone.status === 'Approved' ? 'text-green-500' : 'text-gray-300'
                    }`} />
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{milestone.description}</p>
                  
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Calendar className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{new Date(milestone.targetDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <FileText className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <span>{milestone.evidenceCount} items</span>
                    </div>
                    {milestone.trancheLinked && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <DollarSign className="w-3 h-3 text-[#FBAF43] flex-shrink-0" />
                        <span className="font-semibold text-[#FBAF43] truncate">
                          {formatCurrency(milestone.trancheLinked)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {milestone.adminComment && (
                    <div className="bg-blue-50 border-l-2 border-blue-400 p-2 mb-3">
                      <p className="text-[10px] text-blue-800 line-clamp-2"><strong>Admin:</strong> {milestone.adminComment}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-[10px] text-gray-500 truncate">
                      {milestone.lastUpdated ? new Date(milestone.lastUpdated).toLocaleDateString() : 'Not started'}
                    </span>
                    <div className="flex items-center gap-1 text-[#FBAF43] group-hover:gap-1.5 transition-all flex-shrink-0">
                      {milestone.status === 'Not started' || milestone.status === 'In progress' ? (
                        <>
                          <Upload className="w-3 h-3" />
                          <span className="text-[10px] font-semibold">Submit</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3" />
                          <span className="text-[10px] font-semibold">View</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tranches Tab */}
          {activeTab === 'tranches' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Tranche Status</h2>
                
                <div className="space-y-4">
                  {[
                    { id: 1, name: 'Tranche 1', amount: 2500000, status: 'Received', date: '2024-01-10', description: 'Initial funding upon approval' },
                    { id: 2, name: 'Tranche 2', amount: 1500000, status: 'Pending', date: null, description: 'Release after milestone completion' },
                    { id: 3, name: 'Tranche 3', amount: 1000000, status: 'Locked', date: null, description: 'Release after final milestone' },
                  ].map((tranche) => (
                    <div key={tranche.id} className="border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{tranche.name}</h3>
                          <p className="text-sm text-gray-600">{tranche.description}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-semibold ${
                          tranche.status === 'Received' ? 'bg-green-100 text-green-800' :
                          tranche.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {tranche.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600">Amount</p>
                          <p className="text-lg font-bold text-gray-900">{formatCurrency(tranche.amount)}</p>
                        </div>
                        {tranche.date && (
                          <div className="text-right">
                            <p className="text-xs text-gray-600">Received Date</p>
                            <p className="text-sm font-semibold text-gray-900">{new Date(tranche.date).toLocaleDateString()}</p>
                          </div>
                        )}
                        {tranche.status === 'Pending' && (
                          <div className="text-right">
                            <p className="text-xs text-gray-600">Status</p>
                            <p className="text-sm font-semibold text-yellow-600">Awaiting milestone completion</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Funding Request Tab */}
          {activeTab === 'funding-request' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow-lg p-6 max-w-3xl mx-auto"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Submit Funding Request</h2>
                <p className="text-sm text-gray-600">Submit funding request with budget breakdown</p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Requested Amount (RWF)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                    placeholder="Enter total amount needed"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Budget Breakdown</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                    placeholder="Break down your budget:&#10;• Seeds: 500,000 RWF&#10;• Fertilizer: 300,000 RWF&#10;• Labour: 200,000 RWF&#10;• Equipment: 1,000,000 RWF"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Project Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring-2 focus:ring-[#FBAF43] focus:border-transparent"
                    placeholder="What is your project? Where? How much?"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Supporting Documents</label>
                  <div className="border-2 border-dashed border-gray-300 p-4 text-center hover:border-[#FBAF43] transition-colors cursor-pointer">
                    <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                    <p className="text-xs text-gray-600">Click to upload budget breakdown</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#FBAF43] hover:bg-[#e59e3b] text-gray-900 font-semibold py-2 px-4 text-sm transition-colors"
                >
                  Submit Funding Request
                </button>
              </form>
            </motion.div>
          )}


          {/* Add Transaction Modal */}
          {showAddTransaction && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh]"
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
    </div>
  )
}

