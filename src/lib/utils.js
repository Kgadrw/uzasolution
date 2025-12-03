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


