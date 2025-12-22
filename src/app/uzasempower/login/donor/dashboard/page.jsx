'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  DollarSign, CheckCircle, AlertCircle, Bell,
  Search, Download, MapPin, Heart, Settings, LogOut, 
  LayoutDashboard, Menu, Info, Wallet, Activity, Target, X, Inbox
} from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { api } from '@/lib/api/config'
import { DashboardSkeleton } from '@/components/Skeleton'

export default function DonorDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const notificationDropdownRef = useRef(null)
  const [exportDropdowns, setExportDropdowns] = useState({})

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

  // Data state
  const [loading, setLoading] = useState(true)
  const [portfolioSummary, setPortfolioSummary] = useState({
    totalPledged: 0,
    totalDistributed: 0,
    balance: 0,
    activeProjects: 0,
    onTrackProjects: 0,
    atRiskProjects: 0,
    unreadAlerts: 0
  })
  const [projects, setProjects] = useState([])
  const [milestones, setMilestones] = useState([])
  const [transactions, setTransactions] = useState([])
  const [alerts, setAlerts] = useState([])
  const [notifications, setNotifications] = useState([])
  const [user, setUser] = useState(null)

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
        const overviewRes = await api.get('/donor/dashboard/overview')
        if (overviewRes.success && overviewRes.data) {
          const data = overviewRes.data.portfolioSummary || {}
          setPortfolioSummary({
            totalPledged: data.totalPledged || 0,
            totalDistributed: data.totalDistributed || 0,
            balance: (data.totalPledged || 0) - (data.totalDistributed || 0),
            activeProjects: data.activeProjects || 0,
            onTrackProjects: data.onTrackProjects || 0,
            atRiskProjects: data.atRiskProjects || 0,
            unreadAlerts: data.unreadAlerts || 0
          })
          
          // Set projects from overview
          if (overviewRes.data.recentProjects) {
            const formattedProjects = overviewRes.data.recentProjects.map((p, idx) => ({
              id: p._id || p.id,
              title: p.title || 'Untitled Project',
              beneficiary: p.beneficiary?.name || 'Unknown',
              location: p.location || 'N/A',
              category: p.category || 'Other',
              pledgeAmount: p.pledgeAmount || 0,
              fundingStatus: p.fundingGoal ? `${Math.round((p.totalFunded || 0) / p.fundingGoal * 100)}%` : '0%',
              fundingGoal: p.fundingGoal || 0,
              totalFunded: p.totalFunded || 0,
              status: p.status === 'active' ? 'On Track' : p.status || 'Pending',
              date: p.createdAt ? new Date(p.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            }))
            setProjects(formattedProjects)
          }
        }

        // Fetch projects
        const projectsRes = await api.get('/donor/projects')
        if (projectsRes.success && projectsRes.data) {
          const formattedProjects = (projectsRes.data.projects || projectsRes.data || []).map((p, idx) => ({
            id: p._id || p.id,
            title: p.title || 'Untitled Project',
            beneficiary: p.beneficiary?.name || 'Unknown',
            location: p.location || 'N/A',
            category: p.category || 'Other',
            pledgeAmount: p.pledgeAmount || 0,
            fundingStatus: p.fundingGoal ? `${Math.round((p.totalFunded || 0) / p.fundingGoal * 100)}%` : '0%',
            fundingGoal: p.fundingGoal || 0,
            totalFunded: p.totalFunded || 0,
            status: p.status === 'active' ? 'On Track' : p.status || 'Pending',
            date: p.createdAt ? new Date(p.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
          }))
          setProjects(formattedProjects)
        }

        // Fetch milestones
        const milestonesRes = await api.get('/donor/milestones')
        if (milestonesRes.success && milestonesRes.data) {
          const formattedMilestones = (milestonesRes.data.milestones || milestonesRes.data || []).map((m, idx) => ({
            id: m._id || idx + 1,
            projectName: m.project?.title || 'Unknown Project',
            projectId: m.project?._id || m.project?.id,
            milestoneName: m.title || 'Untitled Milestone',
            description: m.description || '',
            targetDate: m.targetDate ? new Date(m.targetDate).toISOString().split('T')[0] : '',
            status: m.status === 'approved' ? 'Approved' : m.status === 'evidence_submitted' ? 'Evidence submitted' : m.status === 'in_progress' ? 'In Progress' : 'Not started',
            trancheAmount: m.amount || 0,
            evidenceCount: m.evidence?.length || 0,
            approvedDate: m.approvedDate ? new Date(m.approvedDate).toISOString().split('T')[0] : null,
            beneficiary: m.project?.beneficiary?.name || 'Unknown'
          }))
          setMilestones(formattedMilestones)
        }

        // Fetch ledger/transactions
        const ledgerRes = await api.get('/donor/ledger')
        if (ledgerRes.success && ledgerRes.data) {
          const formattedTransactions = (ledgerRes.data.transactions || ledgerRes.data || []).map((t, idx) => ({
            id: t._id || idx + 1,
            date: t.date ? new Date(t.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            type: t.type || 'Transaction',
            category: t.category || 'Funding',
            description: t.description || '',
            amount: t.amount || 0,
            balance: t.balance || 0,
            project: t.project?.title || 'N/A',
            projectId: t.project?._id || t.project?.id
          }))
          setTransactions(formattedTransactions)
        }

        // Fetch alerts
        const alertsRes = await api.get('/donor/alerts')
        if (alertsRes.success && alertsRes.data) {
          const formattedAlerts = (alertsRes.data.alerts || alertsRes.data || []).map((a, idx) => ({
            id: a._id || idx + 1,
            type: a.type || 'Info',
            title: a.title || 'Alert',
            description: a.message || a.description || '',
            project: a.project?.title || 'N/A',
            projectId: a.project?._id || a.project?.id,
            date: a.createdAt ? new Date(a.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            status: a.read ? 'Read' : 'Active'
          }))
          setAlerts(formattedAlerts)
        }

        // Fetch notifications
        const notificationsRes = await api.get('/donor/notifications')
        if (notificationsRes.success && notificationsRes.data) {
          const formattedNotifications = (notificationsRes.data.notifications || notificationsRes.data || []).map((n, idx) => ({
            id: n._id || idx + 1,
            title: n.title || 'Notification',
            message: n.message || '',
            type: n.type || 'info',
            read: n.read || false,
            date: n.createdAt ? new Date(n.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
          }))
          setNotifications(formattedNotifications)
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

  // Show skeleton loader while loading
  if (loading) {
    return <DashboardSkeleton />
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
              <h1 className="text-lg md:text-2xl text-gray-900">Welcome back {user?.name || 'Donor User'}</h1>
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
                  <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white border border-gray-200 shadow-lg z-50 max-h-96 overflow-y-auto">
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
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                  <p className="text-sm  text-gray-900">{user?.name || 'Donor User'}</p>
                  <p className="text-xs text-gray-600">{user?.email || 'donor@example.com'}</p>
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

                  <div className="overflow-x-auto -mx-4 md:mx-0">
                    <div className="min-w-full inline-block align-middle">
                      <table className="w-full min-w-[600px]">
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
                        {filteredOverviewProjects.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="px-6 py-12 text-center">
                              <div className="flex flex-col items-center justify-center">
                                <Inbox className="w-12 h-12 text-gray-400 mb-3" />
                                <p className="text-sm font-medium text-gray-900 mb-1">No projects found</p>
                                <p className="text-xs text-gray-500">You haven't invested in any projects yet.</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredOverviewProjects.map((project) => (
                        <tr 
                          key={project.id} 
                          className="hover:bg-green-50 cursor-pointer transition-colors border-b border-gray-200"
                          onClick={() => router.push(`/uzasempower/login/donor/projects/${project.id}`)}
                          title="Click to view project details"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 font-medium">{project.title}</div>
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
                          ))
                        )}
                      </tbody>
                    </table>
                    </div>
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
                  <div className="p-4 md:p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-4">
                      <h2 className="text-lg md:text-xl  text-gray-900">Projects</h2>
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
                    <div className="flex flex-wrap items-end gap-2 md:gap-3">
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

                  <div className="overflow-x-auto -mx-4 md:mx-0">
                    <div className="min-w-full inline-block align-middle">
                      <table className="w-full min-w-[600px]">
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
                      {filteredProjects.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <Inbox className="w-12 h-12 text-gray-400 mb-3" />
                              <p className="text-sm font-medium text-gray-900 mb-1">No projects found</p>
                              <p className="text-xs text-gray-500">No projects match your search criteria.</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredProjects.map((project) => (
                        <tr 
                          key={project.id} 
                          className="hover:bg-green-50 cursor-pointer transition-colors border-b border-gray-200"
                          onClick={() => router.push(`/uzasempower/login/donor/projects/${project.id}`)}
                          title="Click to view project details"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 font-medium">{project.title}</div>
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
                        ))
                      )}
                    </tbody>
                  </table>
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
                className="space-y-6"
              >
                <div className="bg-white  border border-gray-100">
                  <div className="p-4 md:p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-4">
                      <h2 className="text-lg md:text-xl  text-gray-900">Milestones</h2>
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
                    <div className="flex flex-wrap items-end gap-2 md:gap-3">
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
                  
                  <div className="overflow-x-auto -mx-4 md:mx-0">
                    <div className="min-w-full inline-block align-middle">
                      <table className="w-full min-w-[600px]">
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
                        {filteredMilestones.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="px-6 py-12 text-center">
                              <div className="flex flex-col items-center justify-center">
                                <Target className="w-12 h-12 text-gray-400 mb-3" />
                                <p className="text-sm font-medium text-gray-900 mb-1">No milestones found</p>
                                <p className="text-xs text-gray-500">No milestones match your search criteria.</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredMilestones.map((milestone) => (
                          <tr key={milestone.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {milestone.projectId ? (
                                <div 
                                  className="text-sm text-gray-900 font-medium cursor-pointer hover:text-green-600 transition-colors"
                                  onClick={() => router.push(`/uzasempower/login/donor/projects/${milestone.projectId}`)}
                                  title="Click to view project details"
                                >
                                  {milestone.projectName}
                                </div>
                              ) : (
                                <div className="text-sm text-gray-900">{milestone.projectName}</div>
                              )}
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
                          ))
                        )}
                      </tbody>
                    </table>
                    </div>
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
                  <div className="p-4 md:p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-4">
                      <h2 className="text-lg md:text-xl  text-gray-900">Transaction History</h2>
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
              
                  <div className="overflow-x-auto -mx-4 md:mx-0">
                    <div className="min-w-full inline-block align-middle">
                      <table className="w-full min-w-[600px]">
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
                        {filteredTransactions.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="px-6 py-12 text-center">
                              <div className="flex flex-col items-center justify-center">
                                <Wallet className="w-12 h-12 text-gray-400 mb-3" />
                                <p className="text-sm font-medium text-gray-900 mb-1">No transactions found</p>
                                <p className="text-xs text-gray-500">No transactions match your search criteria.</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredTransactions.map((transaction) => (
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
                              {transaction.projectId ? (
                                <div 
                                  className="text-sm text-gray-700 cursor-pointer hover:text-green-600 transition-colors font-medium"
                                  onClick={() => router.push(`/uzasempower/login/donor/projects/${transaction.projectId}`)}
                                  title="Click to view project details"
                                >
                                  {transaction.project}
                                </div>
                              ) : (
                                <div className="text-sm text-gray-700">{transaction.project}</div>
                              )}
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
                          ))
                        )}
                  </tbody>
                </table>
                    </div>
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
                        {alert.projectId ? (
                          <span 
                            className="cursor-pointer hover:text-green-600 transition-colors font-medium"
                            onClick={() => router.push(`/uzasempower/login/donor/projects/${alert.projectId}`)}
                            title="Click to view project details"
                          >
                            {alert.project}
                          </span>
                        ) : (
                          <span>{alert.project}</span>
                        )}
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
                            defaultValue={user?.name || 'Donor User'}
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                      </div>
                  <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue={user?.email || 'donor@example.com'}
                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            defaultValue={user?.phone || ''}
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
