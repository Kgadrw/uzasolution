'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  DollarSign, CheckCircle, AlertCircle, Bell,
  Search, Download, MapPin, Heart, Settings, LogOut, 
  LayoutDashboard, Menu, Info, Wallet, Activity, Target, X
} from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'

export default function DonorDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const notificationDropdownRef = useRef(null)
  const [exportDropdowns, setExportDropdowns] = useState({})
  
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

  // Close export dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.export-dropdown-container')) {
        setExportDropdowns({})
      }
    }

    if (Object.keys(exportDropdowns).length > 0) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [exportDropdowns])
  
  // Overview filters
  const [overviewSearchQuery, setOverviewSearchQuery] = useState('')
  
  // Projects filters
  const [projectsSearchQuery, setProjectsSearchQuery] = useState('')
  const [projectsDateFrom, setProjectsDateFrom] = useState('')
  const [projectsDateTo, setProjectsDateTo] = useState('')
  const [projectsPledgeMin, setProjectsPledgeMin] = useState('')
  const [projectsPledgeMax, setProjectsPledgeMax] = useState('')
  
  // Milestones filters
  const [milestonesSearchQuery, setMilestonesSearchQuery] = useState('')
  const [milestonesStatusFilter, setMilestonesStatusFilter] = useState('all')
  const [milestonesDateFrom, setMilestonesDateFrom] = useState('')
  const [milestonesDateTo, setMilestonesDateTo] = useState('')
  
  // Ledger filters
  const [ledgerSearchQuery, setLedgerSearchQuery] = useState('')
  const [ledgerDateFrom, setLedgerDateFrom] = useState('')
  const [ledgerDateTo, setLedgerDateTo] = useState('')
  const [ledgerTypeFilter, setLedgerTypeFilter] = useState('all')
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' })
    }, 3000)
  }

  const handleLogout = () => {
    showNotification('Donor User logged out successfully', 'success')
    setTimeout(() => {
      localStorage.removeItem('user')
      router.push('/uzasempower/login')
    }, 1500)
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Heart },
    { id: 'milestones', label: 'Milestones', icon: CheckCircle },
    { id: 'ledger', label: 'Ledger', icon: DollarSign },
    { id: 'alerts', label: 'Alerts', icon: AlertCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  // Mock data
  const portfolioSummary = {
    totalPledged: 15000000,
    totalDistributed: 8500000,
    balance: 6500000,
    activeProjects: 8,
    onTrackProjects: 6,
    atRiskProjects: 2,
    unreadAlerts: 5
  }

  const projects = [
    {
      id: 1,
      title: 'Vegetable Farming Project',
      beneficiary: 'John Doe Cooperative',
      location: 'Kicukiro, Rwanda',
      category: 'Agriculture',
      pledgeAmount: 2000000,
      fundingStatus: '70%',
      fundingGoal: 5000000,
      totalFunded: 3500000,
      status: 'On Track',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Poultry Farming Initiative',
      beneficiary: 'Women Farmers Group',
      location: 'Gasabo, Rwanda',
      category: 'Livestock',
      pledgeAmount: 1500000,
      fundingStatus: '93%',
      fundingGoal: 3000000,
      totalFunded: 2800000,
      status: 'On Track',
      date: '2024-01-10'
    },
    {
      id: 3,
      title: 'Beekeeping Project',
      beneficiary: 'Youth Cooperative',
      location: 'Nyarugenge, Rwanda',
      category: 'Agriculture',
      pledgeAmount: 1000000,
      fundingStatus: '60%',
      fundingGoal: 2000000,
      totalFunded: 1200000,
      status: 'At Risk',
      date: '2024-01-05'
    },
    {
      id: 4,
      title: 'Fish Farming Project',
      beneficiary: 'Community Group',
      location: 'Muhanga, Rwanda',
      category: 'Aquaculture',
      pledgeAmount: 2500000,
      fundingStatus: '100%',
      fundingGoal: 4000000,
      totalFunded: 4000000,
      status: 'Completed',
      date: '2023-12-20'
    },
    {
      id: 5,
      title: 'Dairy Farming Project',
      beneficiary: 'Farmers Union',
      location: 'Musanze, Rwanda',
      category: 'Livestock',
      pledgeAmount: 3000000,
      fundingStatus: '45%',
      fundingGoal: 6000000,
      totalFunded: 2700000,
      status: 'On Track',
      date: '2024-01-20'
    },
  ]

  const milestones = [
    {
      id: 1,
      projectName: 'Vegetable Farming Project',
      milestoneName: 'Land Preparation',
      description: 'Complete land clearing and soil preparation',
      targetDate: '2024-01-05',
      status: 'Approved',
      trancheAmount: 500000,
      evidenceCount: 5,
      approvedDate: '2024-01-04',
      beneficiary: 'John Doe Cooperative'
    },
    {
      id: 2,
      projectName: 'Poultry Farming Initiative',
      milestoneName: 'Infrastructure Setup',
      description: 'Build chicken coops and install equipment',
      targetDate: '2024-01-20',
      status: 'Evidence submitted',
      trancheAmount: 750000,
      evidenceCount: 8,
      approvedDate: null,
      beneficiary: 'Women Farmers Group'
    },
    {
      id: 3,
      projectName: 'Beekeeping Project',
      milestoneName: 'Hive Installation',
      description: 'Install beehives and prepare apiary',
      targetDate: '2024-02-15',
      status: 'Not started',
      trancheAmount: 1000000,
      evidenceCount: 0,
      approvedDate: null,
      beneficiary: 'Youth Cooperative'
    },
    {
      id: 4,
      projectName: 'Vegetable Farming Project',
      milestoneName: 'Seed Planting',
      description: 'Plant all seeds according to plan',
      targetDate: '2024-01-25',
      status: 'In Progress',
      trancheAmount: 600000,
      evidenceCount: 3,
      approvedDate: null,
      beneficiary: 'John Doe Cooperative'
    },
  ]

  const transactions = [
    {
      id: 1,
      date: '2024-01-20',
      type: 'Disbursement',
      category: 'Funding',
      description: 'Tranche 2 release - Vegetable Farming Project',
      amount: 1000000,
      balance: 7500000,
      project: 'Vegetable Farming Project'
    },
    {
      id: 2,
      date: '2024-01-18',
      type: 'Pledge',
      category: 'Funding',
      description: 'New pledge - Poultry Farming Initiative',
      amount: 1500000,
      balance: 8500000,
      project: 'Poultry Farming Initiative'
    },
    {
      id: 3,
      date: '2024-01-15',
      type: 'Disbursement',
      category: 'Funding',
      description: 'Tranche 1 release - Beekeeping Project',
      amount: 500000,
      balance: 7000000,
      project: 'Beekeeping Project'
    },
    {
      id: 4,
      date: '2024-01-10',
      type: 'Pledge',
      category: 'Funding',
      description: 'New pledge - Dairy Farming Project',
      amount: 3000000,
      balance: 6500000,
      project: 'Dairy Farming Project'
    },
  ]

  const alerts = [
    {
      id: 1,
      type: 'Warning',
      title: 'Milestone Delay',
      description: 'Beekeeping Project milestone is behind schedule',
      project: 'Beekeeping Project',
      date: '2024-01-16',
      status: 'Active'
    },
    {
      id: 2,
      type: 'Info',
      title: 'Milestone Completed',
      description: 'Vegetable Farming Project completed Land Preparation milestone',
      project: 'Vegetable Farming Project',
      date: '2024-01-05',
      status: 'Read'
    },
  ]

  const notifications = [
    {
      id: 1,
      title: 'Project Milestone Completed',
      message: 'Vegetable Farming Project has completed the Land Preparation milestone',
      date: '2024-01-20',
      read: false,
      type: 'success'
    },
    {
      id: 2,
      title: 'New Funding Request',
      message: 'Poultry Farming Initiative has submitted a new funding request',
      date: '2024-01-19',
      read: false,
      type: 'info'
    },
    {
      id: 3,
      title: 'Project At Risk',
      message: 'Beekeeping Project is behind schedule and needs attention',
      date: '2024-01-18',
      read: false,
      type: 'warning'
    },
    {
      id: 4,
      title: 'Evidence Submitted',
      message: 'Dairy Farming Project has submitted new evidence documents',
      date: '2024-01-17',
      read: true,
      type: 'info'
    },
    {
      id: 5,
      title: 'Project Completed',
      message: 'Fish Farming Project has been successfully completed',
      date: '2024-01-15',
      read: true,
      type: 'success'
    },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-RW', { 
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0 
    }).format(amount)
  }

  const getStatusColor = (status) => {
    const colors = {
      'On Track': 'bg-green-100 text-green-800',
      'At Risk': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'Approved': 'bg-green-100 text-green-800',
      'Evidence submitted': 'bg-purple-100 text-purple-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Not started': 'bg-gray-100 text-gray-800',
      'Active': 'bg-red-100 text-red-800',
      'Read': 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  // Export functions
  const exportToCSV = (data, filename, headers) => {
    const ws = XLSX.utils.json_to_sheet(data, { header: headers || Object.keys(data[0] || {}) })
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, `${filename}.csv`)
  }

  const exportToPDF = (title, data, headers, filename) => {
    const doc = new jsPDF()
    
    // Add header
    doc.setFillColor(16, 185, 129) // Green color
    doc.rect(0, 0, 210, 20, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('UZAEMPOWER', 105, 12, { align: 'center' })
    
    // Reset text color for content
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'normal')
    doc.text(title, 14, 35)
    
    const tableData = data.map(row => 
      headers.map(header => {
        const value = row[header.key] || row[header] || ''
        return typeof value === 'object' ? JSON.stringify(value) : String(value)
      })
    )

    const tableHeaders = headers.map(h => typeof h === 'string' ? h : h.label || h.key)

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      startY: 45,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [16, 185, 129] },
      didDrawPage: function (data) {
        // Add footer on each page
        doc.setFontSize(8)
        doc.setTextColor(128, 128, 128)
        doc.setFont('helvetica', 'italic')
        const pageCount = doc.internal.getNumberOfPages()
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i)
          doc.text('Powered by UZAEMPOWER', 105, doc.internal.pageSize.height - 10, { align: 'center' })
        }
        doc.setTextColor(0, 0, 0)
        doc.setFont('helvetica', 'normal')
      }
    })

    // Add footer to last page if not already added
    const pageCount = doc.internal.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      doc.setFont('helvetica', 'italic')
      doc.text('Powered by UZAEMPOWER', 105, doc.internal.pageSize.height - 10, { align: 'center' })
    }

    doc.save(`${filename}.pdf`)
  }

  const toggleExportDropdown = (id) => {
    setExportDropdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // Export handlers for different data types
  const exportOverviewProjects = (format) => {
    const data = filteredOverviewProjects.map(p => ({
      'Project Name': p.title,
      'Owner (Beneficiary)': p.beneficiary,
      'Location': p.location,
      'Category': p.category,
      'Pledge': formatCurrency(p.pledgeAmount),
      'Funding Status': p.fundingStatus
    }))
    if (format === 'csv') {
      exportToCSV(data, 'investing-projects')
    } else {
      exportToPDF(
        'Your Investing Projects',
        filteredOverviewProjects.map(p => ({
          'Project Name': p.title,
          'Owner (Beneficiary)': p.beneficiary,
          'Location': p.location,
          'Category': p.category,
          'Pledge': formatCurrency(p.pledgeAmount),
          'Funding Status': p.fundingStatus
        })),
        ['Project Name', 'Owner (Beneficiary)', 'Location', 'Category', 'Pledge', 'Funding Status'],
        'investing-projects'
      )
    }
  }

  const exportProjects = (format) => {
    const data = filteredProjects.map(p => ({
      'Project Name': p.title,
      'Beneficiary': p.beneficiary,
      'Location': p.location,
      'Category': p.category,
      'Pledge': formatCurrency(p.pledgeAmount),
      'Funding Status': p.fundingStatus,
      'Status': p.status,
      'Date': p.date
    }))
    if (format === 'csv') {
      exportToCSV(data, 'projects')
    } else {
      exportToPDF(
        'Projects',
        filteredProjects.map(p => ({
          'Project Name': p.title,
          'Beneficiary': p.beneficiary,
          'Location': p.location,
          'Category': p.category,
          'Pledge': formatCurrency(p.pledgeAmount),
          'Funding Status': p.fundingStatus,
          'Status': p.status,
          'Date': p.date
        })),
        ['Project Name', 'Beneficiary', 'Location', 'Category', 'Pledge', 'Funding Status', 'Status', 'Date'],
        'projects'
      )
    }
  }

  const exportMilestones = (format) => {
    const data = filteredMilestones.map(m => ({
      'Project': m.projectName,
      'Milestone': m.milestoneName,
      'Description': m.description,
      'Target Date': m.targetDate,
      'Status': m.status,
      'Tranche Amount': formatCurrency(m.trancheAmount),
      'Evidence Count': m.evidenceCount
    }))
    if (format === 'csv') {
      exportToCSV(data, 'milestones')
    } else {
      exportToPDF(
        'Milestones',
        filteredMilestones.map(m => ({
          'Project': m.projectName,
          'Milestone': m.milestoneName,
          'Description': m.description,
          'Target Date': m.targetDate,
          'Status': m.status,
          'Tranche Amount': formatCurrency(m.trancheAmount),
          'Evidence Count': m.evidenceCount
        })),
        ['Project', 'Milestone', 'Description', 'Target Date', 'Status', 'Tranche Amount', 'Evidence Count'],
        'milestones'
      )
    }
  }

  const exportLedger = (format) => {
    const data = filteredTransactions.map(t => ({
      'Date': t.date,
      'Type': t.type,
      'Category': t.category,
      'Description': t.description,
      'Amount': formatCurrency(t.amount),
      'Balance': formatCurrency(t.balance),
      'Project': t.project
    }))
    if (format === 'csv') {
      exportToCSV(data, 'transaction-history')
    } else {
      exportToPDF(
        'Transaction History',
        filteredTransactions.map(t => ({
          'Date': t.date,
          'Type': t.type,
          'Category': t.category,
          'Description': t.description,
          'Amount': formatCurrency(t.amount),
          'Balance': formatCurrency(t.balance),
          'Project': t.project
        })),
        ['Date', 'Type', 'Category', 'Description', 'Amount', 'Balance', 'Project'],
        'transaction-history'
      )
    }
  }

  // Filter functions
  const filteredOverviewProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(overviewSearchQuery.toLowerCase()) ||
                         project.beneficiary.toLowerCase().includes(overviewSearchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(overviewSearchQuery.toLowerCase())
    return matchesSearch
  })

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(projectsSearchQuery.toLowerCase()) ||
                         project.beneficiary.toLowerCase().includes(projectsSearchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(projectsSearchQuery.toLowerCase())
    
    const matchesDate = (!projectsDateFrom || project.date >= projectsDateFrom) &&
                       (!projectsDateTo || project.date <= projectsDateTo)
    
    const matchesPledge = (!projectsPledgeMin || project.pledgeAmount >= parseFloat(projectsPledgeMin)) &&
                         (!projectsPledgeMax || project.pledgeAmount <= parseFloat(projectsPledgeMax))
    
    return matchesSearch && matchesDate && matchesPledge
  })

  const filteredMilestones = milestones.filter(milestone => {
    const matchesSearch = milestone.projectName.toLowerCase().includes(milestonesSearchQuery.toLowerCase()) ||
                         milestone.milestoneName.toLowerCase().includes(milestonesSearchQuery.toLowerCase()) ||
                         milestone.beneficiary.toLowerCase().includes(milestonesSearchQuery.toLowerCase())
    
    const matchesStatus = milestonesStatusFilter === 'all' || milestone.status === milestonesStatusFilter
    
    const matchesDate = (!milestonesDateFrom || milestone.targetDate >= milestonesDateFrom) &&
                       (!milestonesDateTo || milestone.targetDate <= milestonesDateTo)
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(ledgerSearchQuery.toLowerCase()) ||
                         transaction.project.toLowerCase().includes(ledgerSearchQuery.toLowerCase())
    
    const matchesType = ledgerTypeFilter === 'all' || transaction.type.toLowerCase() === ledgerTypeFilter.toLowerCase()
    
    const matchesDate = (!ledgerDateFrom || transaction.date >= ledgerDateFrom) &&
                       (!ledgerDateTo || transaction.date <= ledgerDateTo)
    
    return matchesSearch && matchesType && matchesDate
  })

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden font-opensans" style={{ fontFamily: '"Open Sans", sans-serif', fontOpticalSizing: 'auto', fontStyle: 'normal', fontVariationSettings: '"wdth" 100' }}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 fixed h-screen z-30`}>
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between h-[80px]">
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
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between h-[80px]">
              <div>
            <h1 className="text-2xl text-gray-900">Welcome back Donor User</h1>
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
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white ">
                  U
              </div>
              <div>
                  <p className="text-sm  text-gray-900">Donor User</p>
                  <p className="text-xs text-gray-600">donor@example.com</p>
              </div>
              </div>
              </div>
            </div>
        </div>

        <div className="h-[calc(100vh-80px)] overflow-y-auto">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">

            {/* Overview Tab */}
            {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Pledges Summary */}
                  <div className="bg-white  p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">Pledges Summary</h3>
                      <Info className="w-4 h-4 text-gray-400" />
              </div>
                    <p className="text-2xl  text-gray-900">{formatCurrency(portfolioSummary.totalPledged)}</p>
                    <p className="text-xs text-gray-500 mt-1">Total pledged amount</p>
              </div>

                  {/* Balance / Total Distributed */}
                  <div className="bg-white  p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">Total Distributed</h3>
                      <Wallet className="w-4 h-4 text-gray-400" />
              </div>
                    <p className="text-2xl  text-gray-900">{formatCurrency(portfolioSummary.totalDistributed)}</p>
                    <p className="text-xs text-green-600 mt-1">+{((portfolioSummary.totalDistributed / portfolioSummary.totalPledged) * 100).toFixed(1)}% of total</p>
              </div>

                  {/* Active Projects */}
                  <div className="bg-white  p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">Active Projects</h3>
                      <Activity className="w-4 h-4 text-gray-400" />
              </div>
                    <p className="text-2xl  text-gray-900">{portfolioSummary.activeProjects}</p>
                    <p className="text-xs text-gray-500 mt-1">Currently active</p>
              </div>

                  {/* Projects On Track */}
                  <div className="bg-white  p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">Projects On Track</h3>
                      <Target className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl  text-green-600">{portfolioSummary.onTrackProjects}</p>
                    <p className="text-xs text-gray-500 mt-1">Performing well</p>
                  </div>
                </div>

                {/* Investing Projects Table */}
                <div className="bg-white  border border-gray-100">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl  text-gray-900">Your Investing Projects</h2>
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
                        <div className="relative export-dropdown-container">
                          <button 
                            onClick={() => toggleExportDropdown('overview')}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Export
                          </button>
                          {exportDropdowns['overview'] && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg z-50">
                              <button
                                onClick={() => { exportOverviewProjects('csv'); setExportDropdowns({}); showNotification('Data exported as CSV successfully', 'success') }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Export as CSV
                              </button>
                              <button
                                onClick={() => { exportOverviewProjects('pdf'); setExportDropdowns({}); showNotification('Data exported as PDF successfully', 'success') }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Export as PDF
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                </div>
              </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Project Name</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Owner (Beneficiary)</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-right text-xs  text-gray-600 uppercase tracking-wider">Pledge</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Funding Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredOverviewProjects.map((project) => (
                        <tr 
                          key={project.id} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => router.push(`/uzasempower/login/donor/projects/${project.id}`)}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm  text-gray-900">{project.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">{project.beneficiary}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1 text-sm text-gray-700">
                                <MapPin className="w-4 h-4" />
                                {project.location}
                            </div>
                          </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
                                {project.category}
                            </span>
                          </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="text-sm  text-gray-900">{formatCurrency(project.pledgeAmount)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span className="text-sm  text-gray-900">{project.fundingStatus}</span>
                                <div className="w-24 bg-gray-200 h-2">
                                  <div 
                                    className="bg-green-500 h-2"
                                    style={{ width: project.fundingStatus }}
                                ></div>
                              </div>
                                <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(project.status)}`}>
                                  {project.status}
                                </span>
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

            {/* Projects Tab */}
            {activeTab === 'projects' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
                <div className="bg-white  border border-gray-100">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl  text-gray-900">Projects</h2>
                      <div className="relative export-dropdown-container">
                        <button 
                          onClick={() => toggleExportDropdown('projects')}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                        {exportDropdowns['projects'] && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg z-50">
                            <button
                              onClick={() => { exportProjects('csv'); setExportDropdowns({}); showNotification('Data exported as CSV successfully', 'success') }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Export as CSV
                            </button>
                            <button
                              onClick={() => { exportProjects('pdf'); setExportDropdowns({}); showNotification('Data exported as PDF successfully', 'success') }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Export as PDF
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Filters */}
                    <div className="flex flex-wrap items-end gap-3">
                      <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search projects..."
                          value={projectsSearchQuery}
                          onChange={(e) => setProjectsSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center gap-2 min-w-[280px]">
                        <input
                          type="date"
                          value={projectsDateFrom}
                          onChange={(e) => setProjectsDateFrom(e.target.value)}
                          className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                        <span className="text-gray-500 text-sm whitespace-nowrap">to</span>
                        <input
                          type="date"
                          value={projectsDateTo}
                          onChange={(e) => setProjectsDateTo(e.target.value)}
                          className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2 min-w-[280px]">
                        <input
                          type="number"
                          value={projectsPledgeMin}
                          onChange={(e) => setProjectsPledgeMin(e.target.value)}
                          className="flex-1 min-w-[100px] px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="Min"
                        />
                        <span className="text-gray-500 text-sm whitespace-nowrap">to</span>
                        <input
                          type="number"
                          value={projectsPledgeMax}
                          onChange={(e) => setProjectsPledgeMax(e.target.value)}
                          className="flex-1 min-w-[100px] px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="Max"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setProjectsSearchQuery('')
                          setProjectsDateFrom('')
                          setProjectsDateTo('')
                          setProjectsPledgeMin('')
                          setProjectsPledgeMax('')
                        }}
                        className="px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
                      >
                        Clear
                      </button>
                    </div>
              </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Project Name</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Owner (Beneficiary)</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-right text-xs  text-gray-600 uppercase tracking-wider">Pledge</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Funding Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredProjects.map((project) => (
                        <tr 
                          key={project.id} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => router.push(`/uzasempower/login/donor/projects/${project.id}`)}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm  text-gray-900">{project.title}</div>
                          </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">{project.beneficiary}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1 text-sm text-gray-700">
                                <MapPin className="w-4 h-4" />
                                {project.location}
                            </div>
                          </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
                                {project.category}
                            </span>
                          </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="text-sm  text-gray-900">{formatCurrency(project.pledgeAmount)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span className="text-sm  text-gray-900">{project.fundingStatus}</span>
                                <div className="w-24 bg-gray-200 h-2">
                                  <div 
                                    className="bg-green-500 h-2"
                                    style={{ width: project.fundingStatus }}
                                ></div>
                              </div>
                                <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(project.status)}`}>
                                  {project.status}
                                </span>
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
                className="space-y-6"
              >
                <div className="bg-white  border border-gray-100">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl  text-gray-900">Milestones</h2>
                      <div className="relative export-dropdown-container">
                        <button 
                          onClick={() => toggleExportDropdown('milestones')}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                        {exportDropdowns['milestones'] && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg z-50">
                            <button
                              onClick={() => { exportMilestones('csv'); setExportDropdowns({}); showNotification('Data exported as CSV successfully', 'success') }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Export as CSV
                            </button>
                            <button
                              onClick={() => { exportMilestones('pdf'); setExportDropdowns({}); showNotification('Data exported as PDF successfully', 'success') }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Export as PDF
                            </button>
                          </div>
                        )}
                      </div>
                      </div>
                    
                    {/* Filters */}
                    <div className="flex flex-wrap items-end gap-3">
                      <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search milestones..."
                          value={milestonesSearchQuery}
                          onChange={(e) => setMilestonesSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={milestonesStatusFilter}
                        onChange={(e) => setMilestonesStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm min-w-[140px]"
                      >
                        <option value="all">All Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Evidence submitted">Evidence submitted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Not started">Not started</option>
                      </select>
                      <div className="flex items-center gap-2 min-w-[280px]">
                        <input
                          type="date"
                          value={milestonesDateFrom}
                          onChange={(e) => setMilestonesDateFrom(e.target.value)}
                          className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                        <span className="text-gray-500 text-sm whitespace-nowrap">to</span>
                        <input
                          type="date"
                          value={milestonesDateTo}
                          onChange={(e) => setMilestonesDateTo(e.target.value)}
                          className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setMilestonesSearchQuery('')
                          setMilestonesStatusFilter('all')
                          setMilestonesDateFrom('')
                          setMilestonesDateTo('')
                        }}
                        className="px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
                      >
                        Clear Filters
                      </button>
                    </div>
                </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Project Name</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Milestone Name</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Beneficiary</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Target Date</th>
                          <th className="px-6 py-3 text-right text-xs  text-gray-600 uppercase tracking-wider">Tranche Amount</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Evidence</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredMilestones.map((milestone) => (
                          <tr key={milestone.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm  text-gray-900">{milestone.projectName}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">{milestone.milestoneName}</div>
                              <div className="text-xs text-gray-500 mt-1">{milestone.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">{milestone.beneficiary}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">{new Date(milestone.targetDate).toLocaleDateString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="text-sm  text-gray-900">{formatCurrency(milestone.trancheAmount)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">{milestone.evidenceCount} items</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(milestone.status)}`}>
                                {milestone.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            </motion.div>
          )}

          {/* Ledger Tab */}
          {activeTab === 'ledger' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white  border border-gray-100">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl  text-gray-900">Transaction History</h2>
                      <div className="relative export-dropdown-container">
                        <button 
                          onClick={() => toggleExportDropdown('ledger')}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                        {exportDropdowns['ledger'] && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg z-50">
                            <button
                              onClick={() => { exportLedger('csv'); setExportDropdowns({}); showNotification('Data exported as CSV successfully', 'success') }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Export as CSV
                            </button>
                            <button
                              onClick={() => { exportLedger('pdf'); setExportDropdowns({}); showNotification('Data exported as PDF successfully', 'success') }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Export as PDF
                            </button>
                          </div>
                        )}
                      </div>
              </div>
              
                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search transactions..."
                          value={ledgerSearchQuery}
                          onChange={(e) => setLedgerSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={ledgerTypeFilter}
                        onChange={(e) => setLedgerTypeFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="all">All Types</option>
                        <option value="disbursement">Disbursement</option>
                        <option value="pledge">Pledge</option>
                      </select>
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={ledgerDateFrom}
                          onChange={(e) => setLedgerDateFrom(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="From Date"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="date"
                          value={ledgerDateTo}
                          onChange={(e) => setLedgerDateTo(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="To Date"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setLedgerSearchQuery('')
                          setLedgerTypeFilter('all')
                          setLedgerDateFrom('')
                          setLedgerDateTo('')
                        }}
                        className="px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
              </div>
              
                  <div className="overflow-x-auto">
                    <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs  text-gray-600 uppercase tracking-wider">Project</th>
                          <th className="px-6 py-3 text-right text-xs  text-gray-600 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-right text-xs  text-gray-600 uppercase tracking-wider">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                        {filteredTransactions.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">{new Date(transaction.date).toLocaleDateString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium ${
                                transaction.type === 'Disbursement' ? 'bg-blue-100 text-blue-800' :
                                transaction.type === 'Pledge' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {transaction.type}
                          </span>
                        </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">{transaction.category}</div>
                        </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-700">{transaction.description}</div>
                        </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">{transaction.project}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className={`text-sm  ${
                                transaction.type === 'Pledge' ? 'text-green-600' : 'text-blue-600'
                              }`}>
                                {transaction.type === 'Pledge' ? '+' : '-'}{formatCurrency(transaction.amount)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="text-sm  text-gray-900">{formatCurrency(transaction.balance)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                  </div>
              </div>
            </motion.div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl  border border-gray-100 p-6">
                  <h2 className="text-xl  text-gray-900 mb-6">Alerts</h2>
                  
                  <div className="space-y-4">
              {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 border-l-4 ${
                          alert.type === 'Warning' ? 'bg-yellow-50 border-yellow-500' :
                          alert.type === 'Info' ? 'bg-blue-50 border-blue-500' :
                          'bg-red-50 border-red-500'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 text-xs  ${
                                alert.type === 'Warning' ? 'bg-yellow-200 text-yellow-800' :
                                alert.type === 'Info' ? 'bg-blue-200 text-blue-800' :
                                'bg-red-200 text-red-800'
                              }`}>
                                {alert.type}
                        </span>
                              <span className="text-sm  text-gray-900">{alert.title}</span>
                      </div>
                            <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{alert.project}</span>
                              <span>{new Date(alert.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                          <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </span>
                  </div>
                </div>
              ))}
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
                <div className="bg-white rounded-xl  border border-gray-100 p-6">
                  <h2 className="text-xl  text-gray-900 mb-6">Settings</h2>
                
                  <div className="space-y-6">
                    {/* Profile Settings */}
                  <div>
                      <h3 className="text-lg  text-gray-900 mb-4">Profile Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            defaultValue="Donor User"
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                      </div>
                  <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue="donor@example.com"
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            placeholder="+250 XXX XXX XXX"
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                    </div>
                  </div>
                </div>

                    {/* Notification Settings */}
                <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg  text-gray-900 mb-4">Notification Settings</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500" />
                          <span className="text-sm text-gray-700">Email notifications for milestone updates</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500" />
                          <span className="text-sm text-gray-700">SMS notifications for critical alerts</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500" />
                          <span className="text-sm text-gray-700">Weekly project summary reports</span>
                        </label>
                  </div>
                </div>

                    {/* Save Button */}
                    <div className="border-t border-gray-200 pt-6">
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          showNotification('Settings saved successfully', 'success')
                        }}
                        className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors "
                      >
                        Save Settings
                  </button>
                    </div>
                </div>
              </div>
            </motion.div>
          )}

                      </div>
        </div>
      </div>

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
