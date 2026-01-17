import axios from 'axios'

// Create axios instance with base configuration
// Use relative URL since Vite proxy will handle routing to backend
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important: Send cookies with requests
})

// Store original console.error
const originalConsoleError = console.error

// Request interceptor to suppress console errors for silent requests
api.interceptors.request.use(
  (config) => {
    // Store original console methods if this is a silent request
    if (config._silent) {
      // Temporarily suppress console.error for this request
      console.error = () => {}
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle response errors - especially auth errors
api.interceptors.response.use(
  (response) => {
    // Restore console.error if it was suppressed
    if (response.config?._silent) {
      console.error = originalConsoleError
    }
    return response
  },
  (error) => {
    // Restore console.error if it was suppressed
    if (error.config?._silent) {
      console.error = originalConsoleError
    }
    
    if (error.response?.status === 401) {
      // Skip redirect for /users/me endpoint (used for auth status checks)
      const isAuthCheck = error.config?.url?.includes('/users/me')
      
      if (!isAuthCheck) {
        // Token expired or invalid - cookie will be cleared by backend
        // Only redirect if not already on login/signup page
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
