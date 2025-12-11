// Simple authentication API functions

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? '/api/backend'  // Use Next.js proxy in production
  : 'https://uza-backend.onrender.com/api/v1'  // Direct connection in development

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{success: boolean, data?: {user, token, refreshToken}, message?: string}>}
 */
export async function login(email, password) {
  try {
    const url = `${API_BASE_URL}/auth/login`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password,
      }),
    })

    // Read response as text first
    const responseText = await response.text()
    
    // Try to parse as JSON
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      // If not JSON, return error
      return {
        success: false,
        message: responseText || `Login failed (${response.status})`,
      }
    }

    // Check if request was successful
    if (!response.ok) {
      // Log error details for debugging
      console.error('Login failed:', {
        status: response.status,
        statusText: response.statusText,
        data: data,
        responseText: responseText.substring(0, 200)
      })
      
      return {
        success: false,
        message: data.message || data.error || `Login failed (${response.status})`,
      }
    }

    // Check if response has required data
    if (!data.success || !data.data || !data.data.user || !data.data.token) {
      return {
        success: false,
        message: data.message || 'Invalid response from server',
      }
    }

    // Return success with data
    return {
      success: true,
      data: {
        user: data.data.user,
        token: data.data.token,
        refreshToken: data.data.refreshToken,
      },
      message: data.message || 'Login successful',
    }
  } catch (error) {
    // Handle network errors
    console.error('Login error:', error)
    return {
      success: false,
      message: error.message || 'Network error. Please check your connection and try again.',
    }
  }
}

/**
 * Store authentication data in localStorage
 */
export function storeAuthData(user, token, refreshToken) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken || '')
    localStorage.setItem('user', JSON.stringify({
      ...user,
      token: token,
    }))
  } catch (error) {
    console.error('Error storing auth data:', error)
  }
}

/**
 * Get stored user data
 */
export function getStoredUser() {
  if (typeof window === 'undefined') return null
  
  try {
    const userData = localStorage.getItem('user')
    if (userData) {
      return JSON.parse(userData)
    }
  } catch (error) {
    console.error('Error reading stored user:', error)
  }
  return null
}

/**
 * Clear authentication data
 */
export function clearAuthData() {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  } catch (error) {
    console.error('Error clearing auth data:', error)
  }
}

/**
 * Get dashboard route based on user role
 */
export function getDashboardRoute(role) {
  const roleLower = role?.toLowerCase()
  
  if (roleLower === 'admin') {
    return '/uzasempower/login/admin/dashboard'
  } else if (roleLower === 'donor') {
    return '/uzasempower/login/donor/dashboard'
  } else if (roleLower === 'beneficiary') {
    return '/uzasempower/login/beneficiary/dashboard'
  }
  
  // Default fallback
  return '/uzasempower/login/beneficiary/dashboard'
}

