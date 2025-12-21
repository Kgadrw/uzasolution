'use client'

import React from 'react'

// Skeleton component for loading states
export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      {...props}
    />
  )
}

// Dashboard Skeleton Loader
export function DashboardSkeleton() {
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0 fixed h-screen">
        <div className="px-6 py-4 border-b border-gray-200 h-[80px]">
          <Skeleton className="h-8 w-8" />
        </div>
        <nav className="p-4 space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </nav>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 ml-64 overflow-hidden">
        {/* Header Skeleton */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 h-[80px] flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-6 space-y-6">
          {/* Summary Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-gray-100 p-6 rounded-lg">
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-3 w-40" />
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-lg">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 4 }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  )
}

