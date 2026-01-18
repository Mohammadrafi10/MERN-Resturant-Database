import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import api from '../../config/api'
import { toast } from 'react-toastify'
import { checkAuthSilently, clearAuthStatus } from '../../utils/authCheck'
import { isDarkMode, toggleDarkMode } from '../../utils/darkMode'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const checkAuthStatus = () => {
    // Check auth status from localStorage (no API call)
    const isAuthenticated = checkAuthSilently()
    setIsLoggedIn(isAuthenticated)
  }

  useEffect(() => {
    // Check if user is logged in on mount and route changes
    checkAuthStatus()
    // Initialize dark mode state
    setDarkMode(isDarkMode())
    
    // Listen for dark mode changes
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains('dark'))
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [location.pathname])

  const handleDarkModeToggle = () => {
    const newState = toggleDarkMode()
    setDarkMode(newState)
  }

  const handleLogout = async () => {
    try {
      // Call logout endpoint to blacklist the token and clear cookie
      await api.post('/users/logout')
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      // Clear auth status from localStorage
      clearAuthStatus()
      setIsLoggedIn(false)
      toast.success('Logged out successfully')
      navigate('/login')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="relative bg-amber-50 dark:bg-gray-900 border-b-2 border-amber-800 dark:border-amber-600 shadow-md">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 dark:from-amber-600 dark:via-amber-500 dark:to-amber-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="flex items-center space-x-2 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-800 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center border-2 border-amber-900">
                    <span className="text-amber-50 text-xl font-serif">R</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-serif font-bold text-amber-900 dark:text-amber-200 tracking-wide">
                    Restaurant
                  </span>
                  <span className="text-xs text-amber-700 dark:text-amber-400 font-serif italic -mt-1">
                    Est. 1920
                  </span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-10 sm:flex sm:items-center sm:space-x-1">
              <Link
                to="/"
                className="relative text-amber-900 dark:text-amber-200 inline-flex items-center px-4 py-2 text-sm font-serif font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center space-x-1">
                  <span>Home</span>
                  <span className="text-amber-700 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800 dark:bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                to="/recipes"
                className="relative text-amber-900 dark:text-amber-200 inline-flex items-center px-4 py-2 text-sm font-serif font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center space-x-1">
                  <span>Recipes</span>
                  <span className="text-amber-700 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800 dark:bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                to="/contact"
                className="relative text-amber-900 dark:text-amber-200 inline-flex items-center px-4 py-2 text-sm font-serif font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center space-x-1">
                  <span>Contact</span>
                  <span className="text-amber-700 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800 dark:bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              {isLoggedIn && (
                <Link
                  to="/my-recipes"
                  className="relative text-amber-900 dark:text-amber-200 inline-flex items-center px-4 py-2 text-sm font-serif font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-all duration-300 group"
                >
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>My Recipes</span>
                    <span className="text-amber-700 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800 dark:bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              )}
              {/* Dark Mode Toggle Button */}
              <button
                onClick={handleDarkModeToggle}
                className="relative text-amber-900 dark:text-amber-200 inline-flex items-center px-4 py-2 text-sm font-serif font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-all duration-300 group"
                aria-label="Toggle dark mode"
              >
                <span className="relative z-10 flex items-center space-x-1">
                  {darkMode ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </span>
              </button>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="relative text-amber-900 dark:text-amber-200 inline-flex items-center px-4 py-2 text-sm font-serif font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-all duration-300 group"
                >
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>Logout</span>
                    <span className="text-amber-700 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800 dark:bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="relative text-amber-900 dark:text-amber-200 inline-flex items-center px-4 py-2 text-sm font-serif font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-all duration-300 group"
                >
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>Login</span>
                    <span className="text-amber-700 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800 dark:bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile menu button and dark mode toggle */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={handleDarkModeToggle}
              className="inline-flex items-center justify-center p-2 rounded-sm text-amber-900 dark:text-amber-200 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-800 dark:focus:ring-amber-600 border border-amber-800 dark:border-amber-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-sm text-amber-900 dark:text-amber-200 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-800 dark:focus:ring-amber-600 border border-amber-800 dark:border-amber-600 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-amber-800 dark:border-amber-600 bg-amber-50 dark:bg-gray-900">
          <div className="pt-2 pb-4 space-y-1 px-4">
            <Link
              to="/"
              className="text-amber-900 dark:text-amber-200 block px-4 py-3 text-base font-serif font-medium hover:bg-amber-100 dark:hover:bg-gray-800 hover:text-amber-800 dark:hover:text-amber-300 transition-colors border-l-2 border-transparent hover:border-amber-800 dark:hover:border-amber-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <span>✦</span>
                <span>Home</span>
              </span>
            </Link>
            <Link
              to="/recipes"
              className="text-amber-900 dark:text-amber-200 block px-4 py-3 text-base font-serif font-medium hover:bg-amber-100 dark:hover:bg-gray-800 hover:text-amber-800 dark:hover:text-amber-300 transition-colors border-l-2 border-transparent hover:border-amber-800 dark:hover:border-amber-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <span>✦</span>
                <span>Recipes</span>
              </span>
            </Link>
            <Link
              to="/contact"
              className="text-amber-900 dark:text-amber-200 block px-4 py-3 text-base font-serif font-medium hover:bg-amber-100 dark:hover:bg-gray-800 hover:text-amber-800 dark:hover:text-amber-300 transition-colors border-l-2 border-transparent hover:border-amber-800 dark:hover:border-amber-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <span>✦</span>
                <span>Contact</span>
              </span>
            </Link>
            {isLoggedIn && (
              <Link
                to="/my-recipes"
                className="text-amber-900 dark:text-amber-200 block px-4 py-3 text-base font-serif font-medium hover:bg-amber-100 dark:hover:bg-gray-800 hover:text-amber-800 dark:hover:text-amber-300 transition-colors border-l-2 border-transparent hover:border-amber-800 dark:hover:border-amber-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-2">
                  <span>✦</span>
                  <span>My Recipes</span>
                </span>
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="w-full text-left text-amber-900 dark:text-amber-200 block px-4 py-3 text-base font-serif font-medium hover:bg-amber-100 dark:hover:bg-gray-800 hover:text-amber-800 dark:hover:text-amber-300 transition-colors border-l-2 border-transparent hover:border-amber-800 dark:hover:border-amber-600"
              >
                <span className="flex items-center space-x-2">
                  <span>✦</span>
                  <span>Logout</span>
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                className="text-amber-900 dark:text-amber-200 block px-4 py-3 text-base font-serif font-medium hover:bg-amber-100 dark:hover:bg-gray-800 hover:text-amber-800 dark:hover:text-amber-300 transition-colors border-l-2 border-transparent hover:border-amber-800 dark:hover:border-amber-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center space-x-2">
                  <span>✦</span>
                  <span>Login</span>
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

