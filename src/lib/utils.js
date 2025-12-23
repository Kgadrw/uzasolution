import { NextResponse } from 'next/server'

export function successResponse(data, status = 200) {
  return NextResponse.json(data, { status })
}

export function errorResponse(message, status = 400, errors = null) {
  const response = { error: message }
  if (errors) {
    response.errors = errors
  }
  return NextResponse.json(response, { status })
}

export function formatCurrency(amount, currency = 'RWF') {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function sanitizeFileName(fileName) {
  return fileName
    .replace(/[^a-z0-9.-]/gi, '_')
    .toLowerCase()
    .substring(0, 255)
}

export function generateProjectId() {
  return `PROJ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function calculateKPIs(transactions, budget, disbursed) {
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalRevenue = transactions
    .filter(t => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0)

  const margin = totalRevenue > 0 
    ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 
    : 0

  const runway = totalExpenses > 0 
    ? Math.floor((disbursed - totalExpenses) / (totalExpenses / 30)) // days
    : 0

  return {
    totalExpenses,
    totalRevenue,
    margin: Math.round(margin * 10) / 10,
    runway: Math.max(0, runway),
    remainingBalance: disbursed - totalExpenses,
  }
}

/**
 * Ensures a URL is a valid Cloudinary URL
 * @param {string} url - The URL to check/format
 * @returns {string} - The Cloudinary URL or original URL if invalid
 */
export function ensureCloudinaryUrl(url) {
  if (!url) return url
  
  // If it's already a Cloudinary URL, return as is
  if (url.includes('res.cloudinary.com') || url.includes('cloudinary.com')) {
    return url
  }
  
  // If it's a blob URL (local preview), return as is
  if (url.startsWith('blob:')) {
    return url
  }
  
  // If it's a relative path, return as is (might be local)
  if (url.startsWith('/')) {
    return url
  }
  
  // Otherwise, assume it's already a valid URL
  return url
}

/**
 * Gets a Cloudinary image URL with optional transformations
 * @param {string} url - The Cloudinary URL
 * @param {object} options - Transformation options (width, height, quality, etc.)
 * @returns {string} - The transformed Cloudinary URL
 */
export function getCloudinaryImageUrl(url, options = {}) {
  if (!url) return url
  
  // If not a Cloudinary URL, return as is
  if (!url.includes('res.cloudinary.com')) {
    return url
  }
  
  // If it's a blob URL (local preview), return as is
  if (url.startsWith('blob:')) {
    return url
  }
  
  // Parse Cloudinary URL and add transformations
  // Format: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/{transformations}/{public_id}.{format}
  const urlParts = url.split('/upload/')
  if (urlParts.length !== 2) {
    return url // Invalid Cloudinary URL format
  }
  
  const transformations = []
  
  if (options.width) transformations.push(`w_${options.width}`)
  if (options.height) transformations.push(`h_${options.height}`)
  if (options.quality) transformations.push(`q_${options.quality}`)
  if (options.crop) transformations.push(`c_${options.crop}`)
  if (options.format) transformations.push(`f_${options.format}`)
  
  const transformationString = transformations.length > 0 
    ? `${transformations.join(',')}/` 
    : ''
  
  return `${urlParts[0]}/upload/${transformationString}${urlParts[1]}`
}


