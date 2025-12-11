import { NextResponse } from 'next/server'

const BACKEND_URL = 'https://uza-backend.onrender.com/api/v1'

export async function GET(request, { params }) {
  return handleRequest(request, params, 'GET')
}

export async function POST(request, { params }) {
  return handleRequest(request, params, 'POST')
}

export async function PUT(request, { params }) {
  return handleRequest(request, params, 'PUT')
}

export async function PATCH(request, { params }) {
  return handleRequest(request, params, 'PATCH')
}

export async function DELETE(request, { params }) {
  return handleRequest(request, params, 'DELETE')
}

async function handleRequest(request, params, method) {
  try {
    const { path } = params
    const pathString = Array.isArray(path) ? path.join('/') : path
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()
    const url = `${BACKEND_URL}/${pathString}${queryString ? `?${queryString}` : ''}`
    
    // Get headers
    const headers = {
      'Content-Type': 'application/json',
    }
    
    // Forward authorization header if present
    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      headers['Authorization'] = authHeader
    }
    
    // Prepare request options
    const options = {
      method,
      headers,
    }
    
    // Add body for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        const body = await request.text()
        if (body) {
          options.body = body
        }
      } catch (e) {
        // No body
      }
    }
    
    // Make request to backend
    const response = await fetch(url, options)
    
    // Get response data
    const data = await response.json().catch(() => ({}))
    
    // Return response with proper status
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Proxy request failed' 
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

