import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/core/Navbar'
import Footer from '../components/core/Footer'
import api from '../config/api'

function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetchRecipe()
  }, [id])

  const fetchRecipe = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/recipes/${id}`)
      setRecipe(response.data.recipe)
      setNotFound(false)
    } catch (error) {
      if (error.response?.status === 404) {
        setNotFound(true)
      } else {
        toast.error(error.response?.data?.message || 'Failed to fetch recipe')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-amber-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center py-12">
              <p className="text-amber-900 dark:text-amber-200 font-serif text-lg">Loading recipe...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (notFound || !recipe) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-amber-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center py-12">
              <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-amber-800 dark:border-amber-600">
                <h2 className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-200 mb-4">
                  Recipe Not Found
                </h2>
                <p className="text-amber-800 dark:text-amber-300 font-serif mb-6">
                  The recipe you're looking for doesn't exist or has been removed.
                </p>
                <Link
                  to="/recipes"
                  className="inline-block bg-amber-800 dark:bg-amber-600 text-amber-50 dark:text-amber-100 font-serif font-medium py-2 px-6 rounded-md hover:bg-amber-900 dark:hover:bg-amber-700 transition-colors"
                >
                  Back to Recipes
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-amber-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-6">
            <Link
              to="/recipes"
              className="text-amber-900 dark:text-amber-200 font-serif font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-colors inline-flex items-center"
            >
              ← Back to Recipes
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-amber-800 dark:border-amber-600">
            {recipe.imageUrl && (
              <div className="mb-8">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-96 object-cover rounded-md"
                />
              </div>
            )}

            <div className="mb-6">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-amber-200 dark:bg-amber-700 text-amber-900 dark:text-amber-100 font-serif font-medium rounded-full text-base capitalize">
                  {recipe.category || 'main'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 dark:text-amber-200 mb-4">
                {recipe.title}
              </h1>
              <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 font-serif">
                <span className="text-2xl font-bold text-amber-900 dark:text-amber-200">
                  ${recipe.price?.toFixed(2)}
                </span>
                <span className="text-sm italic">
                  Created: {new Date(recipe.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-200 mb-3">
                Description
              </h2>
              <p className="text-amber-800 dark:text-amber-300 font-serif text-lg leading-relaxed whitespace-pre-line">
                {recipe.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-200 mb-4">
                Ingredients
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {recipe.ingredients?.map((ingredient, idx) => (
                  <li key={idx} className="text-amber-800 dark:text-amber-300 font-serif text-lg">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-amber-200 dark:border-amber-700">
              <div className="flex items-center justify-between text-sm text-amber-700 dark:text-amber-400 font-serif">
                <span>
                  {recipe.updatedAt && recipe.updatedAt !== recipe.createdAt && (
                    <span>Last updated: {new Date(recipe.updatedAt).toLocaleDateString()}</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default RecipeDetail
