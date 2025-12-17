// Simple authentication API functions

// Always use the Next.js proxy to avoid CORS issues
const API_BASE_URL = '/api/backend'

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
        email: email.trim().toLowerCase(),
        password: password,
      }),
    })

    // Read response as text first
    let responseText = ''
    try {
      responseText = await response.text()
      console.log('Response text length:', responseText.length)
      console.log('Response text preview:', responseText.substring(0, 200))
    } catch (readError) {
      console.error('Error reading response text:', readError)
      responseText = ''
    }
    
    // Try to parse as JSON
    let data = {}
    try {
      if (responseText && responseText.trim()) {
        data = JSON.parse(responseText)
        console.log('Parsed data:', data)
      } else {
        console.warn('Response text is empty or whitespace only')
      }
    } catch (parseError) {
      // If not JSON, log and use text as error message
      console.error('Failed to parse response as JSON:', parseError)
      console.error('Response text that failed to parse:', responseText.substring(0, 200))
      // If response is not OK and not JSON, return the text or a generic error
      if (!response.ok) {
        return {
          success: false,
          message: responseText || `Login failed (${response.status} ${response.statusText})`,
        }
      }
    }

    // Check if request was successful
    if (!response.ok) {
      // Log error details for debugging - log each property separately to ensure visibility
      console.error('=== LOGIN FAILED ===')
      console.error('Status:', response.status)
      console.error('Status Text:', response.statusText)
      console.error('URL:', url)
      console.error('Response Text:', responseText ? responseText.substring(0, 500) : '(empty response)')
      console.error('Data object:', data)
      console.error('Data type:', typeof data)
      console.error('Data keys:', data && typeof data === 'object' ? Object.keys(data) : 'N/A')
      try {
        const headersObj = Object.fromEntries(response.headers.entries())
        console.error('Headers:', headersObj)
      } catch (e) {
        console.error('Could not read headers:', e)
      }
      console.error('==================')
      
      // Extract error message - check multiple possible locations
      let errorMessage = null
      
      // First, try to get message from parsed data object
      if (data && typeof data === 'object') {
        errorMessage = data.message || data.error || (Array.isArray(data.errors) ? data.errors[0] : null)
      } else if (data && typeof data === 'string') {
        errorMessage = data
      }
      
      // If still no message, try parsing responseText again (in case data wasn't parsed correctly)
      if (!errorMessage && responseText && responseText.trim()) {
        try {
          const parsed = JSON.parse(responseText)
          if (parsed && typeof parsed === 'object') {
            errorMessage = parsed.message || parsed.error || (Array.isArray(parsed.errors) ? parsed.errors[0] : null)
          }
        } catch (e) {
          // If not JSON, use the text itself (truncated)
          if (responseText.length > 0) {
            errorMessage = responseText.substring(0, 200)
          }
        }
      }
      
      // Fallback to status-specific messages if still no message
      if (!errorMessage) {
        switch (response.status) {
          case 400:
            errorMessage = 'Invalid email or password'
            break
          case 401:
            errorMessage = 'Invalid email or password. Please check your credentials and try again.'
            break
          case 403:
            errorMessage = 'Account is inactive or access denied'
            break
          case 404:
            errorMessage = 'Login endpoint not found'
            break
          case 500:
            errorMessage = 'Server error. Please try again later.'
            break
          case 503:
            errorMessage = 'Service unavailable. Please try again later.'
            break
          default:
            errorMessage = `Login failed (${response.status} ${response.statusText || 'Unknown error'})`
        }
      }
      
      // Log the final error message clearly
      console.log('✅ Final extracted error message:', errorMessage)
      console.log('✅ Returning error response with message:', errorMessage)
      
      return {
        success: false,
        message: errorMessage,
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

