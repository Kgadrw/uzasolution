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
          // Log request details for debugging (only in development)
          if (process.env.NODE_ENV === 'development') {
            try {
              const bodyObj = JSON.parse(body)
              console.log('Proxy request:', { url, method, body: bodyObj })
            } catch (e) {
              console.log('Proxy request:', { url, method, body })
            }
          }
        }
      } catch (e) {
        console.error('Error reading request body:', e)
      }
    }
    
    // Make request to backend
    let response
    try {
      response = await fetch(url, options)
    } catch (fetchError) {
      console.error('Fetch error:', fetchError)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to connect to backend server. Please try again later.' 
        },
        { status: 503 }
      )
    }
    
    // Get response data - handle both JSON and text responses
    let data = {}
    let responseText = ''
    
    try {
      // Read response as text first (can only read once)
      responseText = await response.text()
      
      const contentType = response.headers.get('content-type') || ''
      
      if (responseText && responseText.trim()) {
        if (contentType.includes('application/json')) {
          try {
            data = JSON.parse(responseText)
          } catch (parseError) {
            console.error('Error parsing JSON response:', parseError)
            console.error('Response text:', responseText.substring(0, 500))
            data = { 
              success: false, 
              message: 'Invalid JSON response from server' 
            }
          }
        } else {
          // Not JSON, treat as plain text
          data = { 
            success: false, 
            message: responseText || 'Request failed' 
          }
        }
      } else {
        // Empty response
        data = { 
          success: false, 
          message: `Empty response from server (${response.status})` 
        }
      }
    } catch (readError) {
      console.error('Error reading response:', readError)
      data = { 
        success: false, 
        message: `Failed to read response: ${readError.message}` 
      }
    }
    
    // Log error responses for debugging
    if (!response.ok || !data.success) {
      console.error('Backend error response:', {
        status: response.status,
        statusText: response.statusText,
        url,
        method,
        data,
        responseText: responseText.substring(0, 500),
        contentType: response.headers.get('content-type')
      })
      
      // Ensure data has at least a message
      if (!data || Object.keys(data).length === 0) {
        data = {
          success: false,
          message: `Request failed with status ${response.status}`,
        }
      } else if (!data.message && !data.error) {
        data.message = data.message || `Request failed with status ${response.status}`
      }
    }
    
    // Return response with proper status
    return NextResponse.json(data || { success: false, message: 'Empty response from server' }, {
      status: response.status || 500,
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

