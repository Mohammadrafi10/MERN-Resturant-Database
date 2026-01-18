/**
 * Dark mode utility functions
 * Manages dark mode state using localStorage and class manipulation
 */

const DARK_MODE_KEY = 'darkMode'

/**
 * Check if dark mode is enabled
 * @returns {boolean} True if dark mode is enabled
 */
export const isDarkMode = () => {
  if (typeof window === 'undefined') return false
  
  // Check localStorage first
  const stored = localStorage.getItem(DARK_MODE_KEY)
  if (stored !== null) {
    return stored === 'true'
  }
  
  // Fallback to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Enable dark mode
 */
export const enableDarkMode = () => {
  if (typeof window === 'undefined') return
  document.documentElement.classList.add('dark')
  localStorage.setItem(DARK_MODE_KEY, 'true')
}

/**
 * Disable dark mode
 */
export const disableDarkMode = () => {
  if (typeof window === 'undefined') return
  document.documentElement.classList.remove('dark')
  localStorage.setItem(DARK_MODE_KEY, 'false')
}

/**
 * Toggle dark mode
 * @returns {boolean} New dark mode state
 */
export const toggleDarkMode = () => {
  if (typeof window === 'undefined') return false
  
  const currentState = document.documentElement.classList.contains('dark')
  if (currentState) {
    disableDarkMode()
    return false
  } else {
    enableDarkMode()
    return true
  }
}

/**
 * Initialize dark mode on page load
 */
export const initDarkMode = () => {
  if (typeof window === 'undefined') return
  
  if (isDarkMode()) {
    enableDarkMode()
  } else {
    disableDarkMode()
  }
}
