// API Configuration
// Use Next.js proxy in production to avoid CORS issues
const USE_PROXY = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
export const API_BASE_URL = USE_PROXY 
  ? '/api/backend'  // Use Next.js proxy
  : 'https://uza-backend.onrender.com/api/v1'  // Direct connection in development

// Get authentication token from localStorage
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        return userData.token || userData.accessToken
      } catch (e) {
        return null
      }
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
  }

  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    // Try to parse response as JSON
    let data
    try {
      const text = await response.text()
      if (text) {
        data = JSON.parse(text)
      } else {
        data = {}
      }
    } catch (parseError) {
      console.error('Error parsing response:', parseError)
      data = { 
        success: false, 
        message: `Server error (${response.status})` 
      }
    }

    if (!response.ok) {
      const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`
      throw new Error(errorMessage)
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
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

