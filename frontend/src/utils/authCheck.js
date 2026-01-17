/**
 * Silent authentication check utility
 * Uses fetch API to avoid axios console logging for expected 401 responses
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

/**
 * Silently check if user is authenticated
 * Returns true if authenticated, false otherwise
 * Does not log 401 errors to console
 */
export const checkAuthSilently = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.status === 200
  } catch (error) {
    // Only log actual network errors, not 401s
    if (error.name !== 'TypeError') {
      console.error('Auth check error:', error)
    }
    return false
  }
}
