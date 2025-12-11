'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { 
  Users, FileCheck, DollarSign, AlertTriangle, 
  CheckCircle, XCircle, Clock, TrendingUp, BarChart3,
  Search, Download, Eye, LogOut, Bell,
  UserCheck, LayoutDashboard, Menu, X, Info
} from 'lucide-react'

// Dynamically import recharts to avoid SSR and module resolution issues
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { api } from '@/lib/api/config'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const notificationDropdownRef = useRef(null)
  const [exportDropdowns, setExportDropdowns] = useState({})

  // Data state
  const [loading, setLoading] = useState(true)
  const [summaryData, setSummaryData] = useState({
    totalProjects: 0,
    pendingReview: 0,
    activeProjects: 0,
    totalFunds: 0,
    totalDisbursed: 0,
    pendingTranches: 0,
    alertsCount: 0,
    kycPending: 0
  })
  const [projects, setProjects] = useState([])
  const [reportsData, setReportsData] = useState({})

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Fetch dashboard overview
        const dashboardRes = await api.get('/admin/dashboard')
        if (dashboardRes.success && dashboardRes.data) {
          const data = dashboardRes.data.summaryData || {}
          setSummaryData({
            totalProjects: data.totalProjects || 0,
            pendingReview: data.pendingReview || 0,
            activeProjects: data.activeProjects || 0,
            totalFunds: data.totalFunds || 0,
            totalDisbursed: data.totalDisbursed || 0,
            pendingTranches: data.pendingTranches || 0,
            alertsCount: data.alertsCount || 0,
            kycPending: data.kycPending || 0
          })
          
          if (dashboardRes.data.recentProjects) {
            const formattedProjects = dashboardRes.data.recentProjects.map((p, idx) => ({
              id: p._id || idx + 1,
              title: p.title || 'Untitled Project',
              beneficiary: p.beneficiary?.name || 'Unknown',
              status: p.status || 'pending',
              fundingGoal: p.fundingGoal || 0,
              totalFunded: p.totalFunded || 0
            }))
            setProjects(formattedProjects)
          }
        }

        // Fetch reports data
        const reportsRes = await api.get('/admin/reports/user-registration')
        if (reportsRes.success && reportsRes.data) {
          setReportsData(reportsRes.data)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

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

  // Chart data for Reports
  const projectPerformanceData = [
    { name: 'Jan', completed: 4, active: 8, pending: 3 },
    { name: 'Feb', completed: 6, active: 10, pending: 2 },
    { name: 'Mar', completed: 8, active: 12, pending: 4 },
    { name: 'Apr', completed: 10, active: 15, pending: 3 },
    { name: 'May', completed: 12, active: 18, pending: 5 },
    { name: 'Jun', completed: 15, active: 20, pending: 4 },
  ]

  const fundingDistributionData = [
    { range: '0-1M', count: 8 },
    { range: '1-2M', count: 12 },
    { range: '2-3M', count: 15 },
    { range: '3-5M', count: 7 },
    { range: '5-10M', count: 3 },
  ]

  const categoryDistributionData = [
    { name: 'Agriculture', value: 35, color: '#10b981' },
    { name: 'Livestock', value: 25, color: '#3b82f6' },
    { name: 'Aquaculture', value: 15, color: '#f59e0b' },
    { name: 'Beekeeping', value: 12, color: '#8b5cf6' },
    { name: 'Other', value: 13, color: '#ef4444' },
  ]

  const financialTrendData = [
    { month: 'Jan', requested: 15000000, disbursed: 8000000 },
    { month: 'Feb', requested: 18000000, disbursed: 10000000 },
    { month: 'Mar', requested: 22000000, disbursed: 12000000 },
    { month: 'Apr', requested: 25000000, disbursed: 15000000 },
    { month: 'May', requested: 28000000, disbursed: 18000000 },
    { month: 'Jun', requested: 32000000, disbursed: 22000000 },
  ]

  const statusDistributionData = [
    { name: 'Active', value: 32, color: '#10b981' },
    { name: 'Pending Review', value: 8, color: '#f59e0b' },
    { name: 'At Risk', value: 4, color: '#ef4444' },
    { name: 'Completed', value: 15, color: '#3b82f6' },
  ]

  const milestoneCompletionData = [
    { project: 'Vegetable', completed: 8, total: 10 },
    { project: 'Poultry', completed: 6, total: 8 },
    { project: 'Beekeeping', completed: 4, total: 7 },
    { project: 'Fish', completed: 10, total: 10 },
    { project: 'Dairy', completed: 5, total: 9 },
  ]

  const donorContributionData = [
    { name: 'Q1', donors: 12, amount: 8500000 },
    { name: 'Q2', donors: 18, amount: 12000000 },
    { name: 'Q3', donors: 22, amount: 15000000 },
    { name: 'Q4', donors: 25, amount: 18000000 },
  ]

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4']

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
  const exportProjectPerformance = (format) => {
    if (format === 'csv') {
      exportToCSV(projectPerformanceData, 'project-performance')
    } else {
      exportToPDF(
        'Project Performance Overview',
        projectPerformanceData,
        ['name', 'completed', 'active', 'pending'],
        'project-performance'
      )
    }
  }

  const exportFinancialTrends = (format) => {
    const data = financialTrendData.map(item => ({
      month: item.month,
      requested: formatCurrency(item.requested),
      disbursed: formatCurrency(item.disbursed)
    }))
    if (format === 'csv') {
      exportToCSV(data, 'financial-trends')
    } else {
      exportToPDF(
        'Financial Trends',
        financialTrendData,
        [
          { key: 'month', label: 'Month' },
          { key: 'requested', label: 'Requested (RWF)' },
          { key: 'disbursed', label: 'Disbursed (RWF)' }
        ],
        'financial-trends'
      )
    }
  }

  const exportCategoryDistribution = (format) => {
    if (format === 'csv') {
      exportToCSV(categoryDistributionData.map(d => ({ Category: d.name, Projects: d.value })), 'category-distribution')
    } else {
      exportToPDF(
        'Projects by Category',
        categoryDistributionData.map(d => ({ Category: d.name, Projects: d.value })),
        ['Category', 'Projects'],
        'category-distribution'
      )
    }
  }

  const exportStatusDistribution = (format) => {
    if (format === 'csv') {
      exportToCSV(statusDistributionData.map(d => ({ Status: d.name, Projects: d.value })), 'status-distribution')
    } else {
      exportToPDF(
        'Projects by Status',
        statusDistributionData.map(d => ({ Status: d.name, Projects: d.value })),
        ['Status', 'Projects'],
        'status-distribution'
      )
    }
  }

  const exportFundingDistribution = (format) => {
    if (format === 'csv') {
      exportToCSV(fundingDistributionData.map(d => ({ 'Funding Range': d.range, 'Number of Projects': d.count })), 'funding-distribution')
    } else {
      exportToPDF(
        'Funding Distribution',
        fundingDistributionData.map(d => ({ 'Funding Range': d.range, 'Number of Projects': d.count })),
        ['Funding Range', 'Number of Projects'],
        'funding-distribution'
      )
    }
  }

  const exportMilestoneCompletion = (format) => {
    if (format === 'csv') {
      exportToCSV(milestoneCompletionData.map(d => ({ Project: d.project, Completed: d.completed, Total: d.total })), 'milestone-completion')
    } else {
      exportToPDF(
        'Milestone Completion Rate',
        milestoneCompletionData.map(d => ({ Project: d.project, Completed: d.completed, Total: d.total })),
        ['Project', 'Completed', 'Total'],
        'milestone-completion'
      )
    }
  }

  const exportDonorContribution = (format) => {
    const data = donorContributionData.map(item => ({
      Quarter: item.name,
      'Number of Donors': item.donors,
      'Total Amount': formatCurrency(item.amount)
    }))
    if (format === 'csv') {
      exportToCSV(data, 'donor-contribution')
    } else {
      exportToPDF(
        'Donor Contribution Trends',
        donorContributionData.map(d => ({ Quarter: d.name, Donors: d.donors, Amount: formatCurrency(d.amount) })),
        ['Quarter', 'Donors', 'Amount'],
        'donor-contribution'
      )
    }
  }

  const exportAllReports = (format) => {
    if (format === 'csv') {
      // Create a workbook with multiple sheets
      const wb = XLSX.utils.book_new()
      
      const sheets = [
        { name: 'Project Performance', data: projectPerformanceData },
        { name: 'Financial Trends', data: financialTrendData.map(d => ({ month: d.month, requested: formatCurrency(d.requested), disbursed: formatCurrency(d.disbursed) })) },
        { name: 'Category Distribution', data: categoryDistributionData.map(d => ({ Category: d.name, Projects: d.value })) },
        { name: 'Status Distribution', data: statusDistributionData.map(d => ({ Status: d.name, Projects: d.value })) },
        { name: 'Funding Distribution', data: fundingDistributionData.map(d => ({ 'Funding Range': d.range, 'Number of Projects': d.count })) },
        { name: 'Milestone Completion', data: milestoneCompletionData.map(d => ({ Project: d.project, Completed: d.completed, Total: d.total })) },
        { name: 'Donor Contribution', data: donorContributionData.map(d => ({ Quarter: d.name, Donors: d.donors, Amount: formatCurrency(d.amount) })) }
      ]

      sheets.forEach(sheet => {
        const ws = XLSX.utils.json_to_sheet(sheet.data)
        XLSX.utils.book_append_sheet(wb, ws, sheet.name)
      })

      XLSX.writeFile(wb, 'all-reports.csv')
    } else {
      const doc = new jsPDF()
      
      // Add header to first page
      doc.setFillColor(16, 185, 129) // Green color
      doc.rect(0, 0, 210, 20, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')
      doc.text('UZAEMPOWER', 105, 12, { align: 'center' })
      doc.setTextColor(0, 0, 0)
      
      let yPos = 35

      const addSection = (title, data, headers) => {
        if (yPos > 250) {
          doc.addPage()
          // Add header to new page
          doc.setFillColor(16, 185, 129)
          doc.rect(0, 0, 210, 20, 'F')
          doc.setTextColor(255, 255, 255)
          doc.setFontSize(18)
          doc.setFont('helvetica', 'bold')
          doc.text('UZAEMPOWER', 105, 12, { align: 'center' })
          doc.setTextColor(0, 0, 0)
          yPos = 25
        }
        doc.setFontSize(14)
        doc.setFont('helvetica', 'normal')
        doc.text(title, 14, yPos)
        yPos += 10

        const tableData = data.map(row => 
          headers.map(header => {
            const key = typeof header === 'string' ? header : header.key
            const value = row[key] || ''
            return typeof value === 'object' ? JSON.stringify(value) : String(value)
          })
        )

        const tableHeaders = headers.map(h => typeof h === 'string' ? h : h.label || h.key)

        autoTable(doc, {
          head: [tableHeaders],
          body: tableData,
          startY: yPos,
          styles: { fontSize: 8 },
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

        yPos = doc.lastAutoTable.finalY + 10
      }

      addSection('Project Performance Overview', projectPerformanceData, ['name', 'completed', 'active', 'pending'])
      addSection('Financial Trends', financialTrendData, [
        { key: 'month', label: 'Month' },
        { key: 'requested', label: 'Requested' },
        { key: 'disbursed', label: 'Disbursed' }
      ])
      addSection('Category Distribution', categoryDistributionData.map(d => ({ Category: d.name, Projects: d.value })), ['Category', 'Projects'])
      addSection('Status Distribution', statusDistributionData.map(d => ({ Status: d.name, Projects: d.value })), ['Status', 'Projects'])
      addSection('Funding Distribution', fundingDistributionData.map(d => ({ Range: d.range, Count: d.count })), ['Range', 'Count'])
      addSection('Milestone Completion', milestoneCompletionData.map(d => ({ Project: d.project, Completed: d.completed, Total: d.total })), ['Project', 'Completed', 'Total'])
      addSection('Donor Contribution', donorContributionData.map(d => ({ Quarter: d.name, Donors: d.donors, Amount: formatCurrency(d.amount) })), ['Quarter', 'Donors', 'Amount'])

      // Add footer to all pages
      const pageCount = doc.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(128, 128, 128)
        doc.setFont('helvetica', 'italic')
        doc.text('Powered by UZAEMPOWER', 105, doc.internal.pageSize.height - 10, { align: 'center' })
      }

      doc.save('all-reports.pdf')
    }
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
              <h1 className="text-lg md:text-2xl text-gray-900">Welcome back Admin User</h1>
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

        <div className="h-full overflow-y-auto p-4 md:p-6">


          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4 md:space-y-6">
              {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white border border-gray-200 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Total Projects</p>
                    <FileCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl text-gray-900">{summaryData.totalProjects}</p>
                  <p className="text-xs text-gray-500 mt-1">All projects in system</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Pending Review</p>
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-2xl text-gray-900">{summaryData.pendingReview}</p>
                  <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Active Projects</p>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl text-gray-900">{summaryData.activeProjects}</p>
                  <p className="text-xs text-gray-500 mt-1">Currently active</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Total Funds</p>
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-lg text-gray-900">{formatCurrency(summaryData.totalFunds)}</p>
                  <p className="text-xs text-gray-500 mt-1">Total requested</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Total Disbursed</p>
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-lg text-gray-900">{formatCurrency(summaryData.totalDisbursed)}</p>
                  <p className="text-xs text-gray-500 mt-1">Funds released</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Pending Tranches</p>
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-2xl text-gray-900">{summaryData.pendingTranches}</p>
                  <p className="text-xs text-gray-500 mt-1">Awaiting release</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Active Alerts</p>
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="text-2xl text-gray-900">{summaryData.alertsCount}</p>
                  <p className="text-xs text-gray-500 mt-1">Require attention</p>
                </div>
                <div className="bg-white border border-gray-200 p-4 md:p-6">
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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
            <div className="space-y-4 md:space-y-6">
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
              <div className="bg-white border border-gray-200 overflow-x-auto -mx-4 md:mx-0">
                <div className="min-w-full inline-block align-middle">
                  <table className="w-full text-sm min-w-[600px]">
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
            <div className="space-y-4 md:space-y-6">
              {/* Report Actions */}
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg text-gray-900">System Reports</h2>
                  <div className="relative export-dropdown-container">
                    <button 
                      onClick={() => toggleExportDropdown('all')}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Export All Reports
                    </button>
                    {exportDropdowns['all'] && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg z-50">
                        <button
                          onClick={() => { exportAllReports('csv'); setExportDropdowns({}) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Export as CSV
                        </button>
                        <button
                          onClick={() => { exportAllReports('pdf'); setExportDropdowns({}) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Export as PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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

              {/* Project Performance Bar Chart */}
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-gray-900">Project Performance Overview</h3>
                  <div className="relative export-dropdown-container">
                    <button 
                      onClick={() => toggleExportDropdown('performance')}
                      className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    {exportDropdowns['performance'] && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg z-50">
                        <button
                          onClick={() => { exportProjectPerformance('csv'); setExportDropdowns({}) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Export as CSV
                        </button>
                        <button
                          onClick={() => { exportProjectPerformance('pdf'); setExportDropdowns({}) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Export as PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                      labelStyle={{ color: '#374151' }}
                    />
                    <Legend />
                    <Bar dataKey="completed" fill="#10b981" name="Completed" />
                    <Bar dataKey="active" fill="#3b82f6" name="Active" />
                    <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Financial Trends Area Chart */}
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-gray-900">Financial Trends</h3>
                  <div className="relative export-dropdown-container">
                    <button 
                      onClick={() => toggleExportDropdown('financial')}
                      className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    {exportDropdowns['financial'] && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg z-50">
                        <button
                          onClick={() => { exportFinancialTrends('csv'); setExportDropdowns({}) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Export as CSV
                        </button>
                        <button
                          onClick={() => { exportFinancialTrends('pdf'); setExportDropdowns({}) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Export as PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={financialTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="requested" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Requested" />
                    <Area type="monotone" dataKey="disbursed" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Disbursed" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Distribution Pie Chart */}
                <div className="bg-white border border-gray-200 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg text-gray-900">Projects by Category</h3>
                    <div className="relative export-dropdown-container">
                      <button 
                        onClick={() => toggleExportDropdown('category')}
                        className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                      {exportDropdowns['category'] && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg z-50">
                          <button
                            onClick={() => { exportCategoryDistribution('csv'); setExportDropdowns({}) }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Export as CSV
                          </button>
                          <button
                            onClick={() => { exportCategoryDistribution('pdf'); setExportDropdowns({}) }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Export as PDF
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                        formatter={(value) => `${value} projects`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Status Distribution Pie Chart */}
                <div className="bg-white border border-gray-200 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg text-gray-900">Projects by Status</h3>
                    <div className="relative export-dropdown-container">
                      <button 
                        onClick={() => toggleExportDropdown('status')}
                        className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                      {exportDropdowns['status'] && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg z-50">
                          <button
                            onClick={() => { exportStatusDistribution('csv'); setExportDropdowns({}) }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Export as CSV
                          </button>
                          <button
                            onClick={() => { exportStatusDistribution('pdf'); setExportDropdowns({}) }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Export as PDF
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                        formatter={(value) => `${value} projects`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Funding Distribution Histogram */}
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-gray-900">Funding Distribution (Histogram)</h3>
                  <div className="relative export-dropdown-container">
                    <button 
                      onClick={() => toggleExportDropdown('funding')}
                      className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    {exportDropdowns['funding'] && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg z-50">
                        <button
                          onClick={() => { exportFundingDistribution('csv'); setExportDropdowns({}) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Export as CSV
                        </button>
                        <button
                          onClick={() => { exportFundingDistribution('pdf'); setExportDropdowns({}) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Export as PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={fundingDistributionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#6b7280" fontSize={12} />
                    <YAxis dataKey="range" type="category" stroke="#6b7280" fontSize={12} width={80} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                      formatter={(value) => `${value} projects`}
                    />
                    <Bar dataKey="count" fill="#10b981" name="Number of Projects" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Milestone Completion Bar Chart */}
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-gray-900">Milestone Completion Rate</h3>
                  <div className="relative export-dropdown-container">
                    <button 
                      onClick={() => toggleExportDropdown('milestone')}
                      className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    {exportDropdowns['milestone'] && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg z-50">
                        <button
                          onClick={() => { exportMilestoneCompletion('csv'); setExportDropdowns({}) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Export as CSV
                        </button>
                        <button
                          onClick={() => { exportMilestoneCompletion('pdf'); setExportDropdowns({}) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Export as PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={milestoneCompletionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="project" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                    />
                    <Legend />
                    <Bar dataKey="completed" fill="#10b981" name="Completed" />
                    <Bar dataKey="total" fill="#e5e7eb" name="Total" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Donor Contribution Line Chart */}
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-gray-900">Donor Contribution Trends</h3>
                  <div className="relative export-dropdown-container">
                    <button 
                      onClick={() => toggleExportDropdown('donor')}
                      className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    {exportDropdowns['donor'] && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg z-50">
                        <button
                          onClick={() => { exportDonorContribution('csv'); setExportDropdowns({}) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Export as CSV
                        </button>
                        <button
                          onClick={() => { exportDonorContribution('pdf'); setExportDropdowns({}) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Export as PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={donorContributionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="#6b7280" fontSize={12} tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                      formatter={(value, name) => {
                        if (name === 'amount') return formatCurrency(value)
                        return value
                      }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="donors" stroke="#3b82f6" strokeWidth={2} name="Number of Donors" />
                    <Line yAxisId="right" type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} name="Total Amount" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

