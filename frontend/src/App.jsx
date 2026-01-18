import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import router from './routes/routes'
import { initDarkMode, isDarkMode } from './utils/darkMode'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Initialize dark mode on app load
    initDarkMode()
    setDarkMode(isDarkMode())
    
    // Listen for dark mode changes
    const handleStorageChange = () => {
      setDarkMode(isDarkMode())
    }
    
    // Listen for class changes on document element
    const observer = new MutationObserver(() => {
      setDarkMode(isDarkMode())
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      observer.disconnect()
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
    </>
  )
}

export default App
