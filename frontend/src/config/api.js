import axios from 'axios'
import { clearAuthStatus } from '../utils/authCheck'

/**
 * API Configuration
 * Creates a configured axios instance with interceptors for authentication and error handling
 */

// Get API base URL from environment or use proxy path
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests for authentication
  timeout: 10000, // 10 second timeout
})

/**
 * Request Interceptor
 * Adds any necessary request modifications before sending
 */
api.interceptors.request.use(
  (config) => {
    // Add any request modifications here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Response Interceptor
 * Handles responses and errors globally
 */
api.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response
  },
  (error) => {
    const { response } = error

    // Handle 401 Unauthorized errors
    if (response?.status === 401) {
      // Clear auth status from localStorage when we get a 401
      clearAuthStatus()
      
      const isAuthPage = ['/login', '/signup'].includes(window.location.pathname)

      // Only redirect if not already on auth pages
      if (!isAuthPage) {
        window.location.href = '/login'
      }
    }

    // Handle network errors
    if (!response) {
      console.error('Network error:', error.message)
    }

    // Reject the error so components can handle it
    return Promise.reject(error)
  }
)

export default api
