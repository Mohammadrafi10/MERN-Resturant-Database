/**
 * Authentication check utility
 * Uses localStorage to check authentication status without API calls
 */

const AUTH_KEY = 'isAuthenticated'

/**
 * Check if user is authenticated
 * Returns true if authenticated, false otherwise
 * No API calls - uses localStorage for fast, silent checks
 */
export const checkAuthSilently = () => {
  try {
    const authStatus = localStorage.getItem(AUTH_KEY)
    return authStatus === 'true'
  } catch (error) {
    // If localStorage is not available, return false
    return false
  }
}

/**
 * Set authentication status in localStorage
 * Call this after successful login or signup
 */
export const setAuthStatus = (isAuthenticated) => {
  try {
    if (isAuthenticated) {
      localStorage.setItem(AUTH_KEY, 'true')
    } else {
      localStorage.removeItem(AUTH_KEY)
    }
  } catch (error) {
    console.error('Failed to set auth status:', error)
  }
}

/**
 * Clear authentication status
 * Call this on logout
 */
export const clearAuthStatus = () => {
  try {
    localStorage.removeItem(AUTH_KEY)
  } catch (error) {
    console.error('Failed to clear auth status:', error)
  }
}
