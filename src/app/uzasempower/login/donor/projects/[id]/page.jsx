'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, MapPin, Calendar, DollarSign, Users, CheckCircle, AlertCircle } from 'lucide-react'

export default function ProjectDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`)
        const data = await response.json()
        if (data.success) {
          setProject(data.data.project)
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-RW', { 
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0 
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading project details...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Project not found</p>
          <button
            onClick={() => router.push('/uzasempower/login/donor/dashboard')}
            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-opensans" style={{ fontFamily: '"Open Sans", sans-serif', fontOpticalSizing: 'auto', fontStyle: 'normal', fontVariationSettings: '"wdth" 100' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.push('/uzasempower/login/donor/dashboard')}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl text-gray-900">Project Details</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Project Header Card */}
        <div className="bg-white border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl text-gray-900 mb-2">{project.title || 'Project Title'}</h2>
              <p className="text-sm text-gray-600">{project.description || 'No description available'}</p>
            </div>
            <span className={`px-3 py-1 text-sm ${project.status === 'active' ? 'bg-green-100 text-green-800' : project.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
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
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm text-gray-900">{project.category || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Requested Amount</p>
                <p className="text-sm text-gray-900">{formatCurrency(project.requestedAmount || 0)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Total Disbursed</p>
                <p className="text-sm text-gray-900">{formatCurrency(project.totalDisbursed || 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Beneficiary Information */}
        {project.beneficiary && (
          <div className="bg-white border border-gray-100 p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Beneficiary Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="text-sm text-gray-900">{project.beneficiary.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm text-gray-900">{project.beneficiary.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm text-gray-900">{project.beneficiary.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm text-gray-900">{project.beneficiary.location || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Project Status */}
        <div className="bg-white border border-gray-100 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Project Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Funding Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 h-2">
                  <div 
                    className="bg-green-500 h-2"
                    style={{ width: `${project.requestedAmount ? ((project.totalDisbursed || 0) / project.requestedAmount * 100) : 0}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-900">
                  {project.requestedAmount ? Math.round(((project.totalDisbursed || 0) / project.requestedAmount) * 100) : 0}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <p className="text-sm text-gray-900">{project.status || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Created</p>
              <p className="text-sm text-gray-900">
                {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

