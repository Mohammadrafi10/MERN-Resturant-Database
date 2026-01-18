import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/core/Navbar'
import Footer from '../components/core/Footer'
import api from '../config/api'
import { setAuthStatus } from '../utils/authCheck'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/users/login', {
        email,
        password,
      })

      // Token is now stored in httpOnly cookie automatically
      // Set auth status in localStorage
      setAuthStatus(true)
      
      // Show success notification
      toast.success('Login successful! Welcome back!')

      // Navigate to home page on success
      navigate('/')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUpClick = () => {
    navigate('/signup')
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-amber-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 dark:text-amber-200 mb-4">
              Login
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-600"></div>
              <span className="text-amber-800 dark:text-amber-400 text-2xl">✦</span>
              <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-600"></div>
            </div>
            <p className="text-lg text-amber-900 dark:text-amber-200 font-serif italic">
              Welcome back to our restaurant
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            {error && (
              <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-800 dark:border-red-600 rounded-md">
                <p className="text-red-900 dark:text-red-200 font-serif text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-amber-800 dark:border-amber-600">
              <div className="mb-6">
                <label htmlFor="email" className="block text-amber-900 dark:text-amber-200 font-serif font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-amber-800 dark:border-amber-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 dark:focus:ring-amber-600 focus:border-transparent text-amber-900 dark:text-amber-100 bg-white dark:bg-gray-700"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-amber-900 dark:text-amber-200 font-serif font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-amber-800 dark:border-amber-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 dark:focus:ring-amber-600 focus:border-transparent text-amber-900 dark:text-amber-100 bg-white dark:bg-gray-700"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-800 dark:bg-amber-600 text-amber-50 dark:text-amber-100 font-serif font-medium py-3 px-6 rounded-md hover:bg-amber-900 dark:hover:bg-amber-700 transition-colors duration-300 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                onClick={handleSignUpClick}
                className="text-amber-900 dark:text-amber-200 font-serif font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-colors duration-300 underline"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Login

