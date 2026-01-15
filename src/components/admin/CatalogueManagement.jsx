'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react'
import { api } from '@/lib/api/config'
import Image from 'next/image'
import { ensureCloudinaryUrl } from '@/lib/utils'

export default function CatalogueManagement() {
  const router = useRouter()
  const [catalogues, setCatalogues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCatalogues()
  }, [])

  const fetchCatalogues = async () => {
    try {
      setLoading(true)
      const response = await api.get('/catalogues')
      if (response.success && response.data) {
        const cataloguesList = Array.isArray(response.data) 
          ? response.data 
          : (response.data.catalogues || response.data.data || [])
        setCatalogues(cataloguesList)
      }
    } catch (error) {
      console.error('Error fetching catalogues:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (catalogue) => {
    router.push(`/uzasempower/login/admin/catalogues/${catalogue._id || catalogue.id}`)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this catalogue?')) {
      return
    }

    try {
      await api.delete(`/catalogues/${id}`)
      fetchCatalogues()
    } catch (error) {
      console.error('Error deleting catalogue:', error)
      alert('Failed to delete catalogue. Please try again.')
    }
  }

  const openAddModal = () => {
    router.push('/uzasempower/login/admin/catalogues/new')
  }

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 p-6">
        <p className="text-gray-500">Loading catalogues...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="bg-white border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-gray-900">Catalogue Management</h2>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#FBAF43] text-white px-4 py-2 text-sm font-medium cursor-pointer hover:bg-[#DDA63A] transition-colors rounded-full"
          >
            <Plus className="w-4 h-4" />
            Add Catalogue
          </button>
        </div>
      </div>

      {/* Catalogues List */}
      <div className="bg-white border border-gray-200">
        {catalogues.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No catalogues found. Click "Add Catalogue" to create one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-600">Image</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600">Title</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600">Description</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600">Status</th>
                  <th className="px-4 py-3 text-right text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {catalogues.map((catalogue) => (
                  <tr key={catalogue._id || catalogue.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="relative w-16 h-16 bg-gray-100">
                        {catalogue.image ? (
                          <Image
                            src={ensureCloudinaryUrl(catalogue.image)}
                            alt={catalogue.title}
                            fill
                            className="object-cover"
                            unoptimized={catalogue.image?.startsWith('blob:')}
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-900 font-medium">{catalogue.title}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-[#FBAF43] uppercase">
                        {catalogue.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600 text-xs line-clamp-2 max-w-xs">
                        {catalogue.description}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs ${
                        catalogue.isActive !== false 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {catalogue.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(catalogue)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(catalogue._id || catalogue.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

