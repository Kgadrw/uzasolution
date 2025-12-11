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
        console.error('Error reading request body:', e)
      }
    }
    
    // Make request to backend
    const response = await fetch(url, options)
    
    // Get response data - handle both JSON and text responses
    let data
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json()
      } catch (e) {
        console.error('Error parsing JSON response:', e)
        data = { success: false, message: 'Failed to parse response' }
      }
    } else {
      const text = await response.text()
      data = { success: false, message: text || 'Request failed' }
    }
    
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
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      url: request.url,
      method,
    })
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Proxy request failed',
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
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

