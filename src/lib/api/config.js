// API Configuration
// Use Next.js proxy in production to avoid CORS issues
const USE_PROXY = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
export const API_BASE_URL = USE_PROXY 
  ? '/api/backend'  // Use Next.js proxy
  : 'https://uza-backend.onrender.com/api/v1'  // Direct connection in development

// Get authentication token from localStorage
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    // First try to get token from user object
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        if (userData.token || userData.accessToken) {
          return userData.token || userData.accessToken
        }
      } catch (e) {
        console.error('Error parsing user data:', e)
      }
    }
    
    // Fallback: try to get token directly from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      return token
    }
  }
  return null
}

// API fetch helper with authentication
export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken()
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
    console.log('API Request with token:', endpoint, 'Token:', token.substring(0, 20) + '...')
  } else {
    console.warn('API Request without token:', endpoint)
  }

  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

  try {
    let response
    try {
      response = await fetch(url, {
        ...options,
        headers,
      })
    } catch (fetchError) {
      // Network error or CORS error
      console.error('Fetch network error:', fetchError)
      throw new Error('Network error. Please check your internet connection and try again.')
    }

    // Check if response exists
    if (!response) {
      throw new Error('No response received from server')
    }

    // Try to parse response as JSON
    let data = {}
    let responseText = ''
    
    try {
      responseText = await response.text()
      
      if (responseText && responseText.trim()) {
        // Try to parse as JSON
        try {
          data = JSON.parse(responseText)
        } catch (parseError) {
          // If parsing fails, it might be plain text
          const trimmedText = responseText.trim()
          if (trimmedText.startsWith('{') || trimmedText.startsWith('[')) {
            // Looks like JSON but failed to parse
            console.error('Failed to parse JSON response:', parseError)
            console.error('Response text:', responseText.substring(0, 200))
            data = { 
              success: false, 
              message: `Server error (${response.status}): Invalid JSON response` 
            }
          } else {
            // Plain text response
            data = { 
              success: false, 
              message: trimmedText || `Server error (${response.status})` 
            }
          }
        }
      } else {
        // Empty response
        data = { 
          success: false, 
          message: `Empty response from server (${response.status})` 
        }
      }
    } catch (error) {
      console.error('Error reading response:', error)
      data = { 
        success: false, 
        message: `Failed to read response: ${error.message}` 
      }
    }

    if (!response.ok) {
      // Log full error details for debugging
      const errorDetails = {
        status: response?.status || 'unknown',
        statusText: response?.statusText || 'unknown',
        url: url || 'unknown',
        responseText: responseText ? responseText.substring(0, 500) : 'No response text',
        parsedData: data || {},
        hasData: !!data,
        dataKeys: data ? Object.keys(data) : [],
      }
      
      try {
        if (response?.headers) {
          errorDetails.headers = Object.fromEntries(response.headers.entries())
        } else {
          errorDetails.headers = 'No headers available'
        }
      } catch (e) {
        errorDetails.headers = `Could not read headers: ${e.message}`
      }
      
      // Log more details
      console.error('API Error Response:', errorDetails)
      console.error('Response object:', {
        ok: response?.ok,
        status: response?.status,
        statusText: response?.statusText,
        type: response?.type,
        url: response?.url,
      })
      console.error('Response text length:', responseText?.length || 0)
      console.error('Parsed data:', data)
      
      // Provide more detailed error messages
      let errorMessage = data?.message || data?.error || (Array.isArray(data?.errors) && data.errors[0]) || null
      
      // If no message, provide status-based messages
      if (!errorMessage) {
        if (response.status === 401) {
          errorMessage = 'Invalid email or password'
        } else if (response.status === 403) {
          errorMessage = 'Access denied'
        } else if (response.status === 404) {
          errorMessage = 'Resource not found'
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again later or contact support if the problem persists.'
        } else if (response.status === 0) {
          errorMessage = 'Network error. Please check your internet connection.'
        } else {
          errorMessage = `Request failed with status ${response.status}`
        }
      }
      
      throw new Error(errorMessage)
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection and try again.')
    }
    
    // If it's already an Error object, throw it as is
    if (error instanceof Error) {
      throw error
    }
    // Otherwise, wrap it in an Error
    throw new Error(error.message || 'Request failed')
  }
}

// API methods
export const api = {
  get: (endpoint, options = {}) => apiFetch(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options = {}) => 
    apiFetch(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),
  put: (endpoint, data, options = {}) =>
    apiFetch(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (endpoint, options = {}) => apiFetch(endpoint, { ...options, method: 'DELETE' }),
}

