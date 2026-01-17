import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/core/Navbar'
import Footer from '../components/core/Footer'
import PageHeader from '../components/ui/PageHeader'
import RecipeFilter from '../components/ui/RecipeFilter'
import api from '../config/api'

function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    searchTerm: '',
    priceFilter: 'all',
    sortBy: 'newest',
  })

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      setLoading(true)
      const response = await api.get('/recipes/get')
      setRecipes(response.data.recipes || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch recipes')
    } finally {
      setLoading(false)
    }
  }

  const filteredAndSortedRecipes = useMemo(() => {
    let filtered = [...recipes]

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (recipe) =>
          recipe.title?.toLowerCase().includes(searchLower) ||
          recipe.description?.toLowerCase().includes(searchLower) ||
          recipe.ingredients?.some((ing) => ing.toLowerCase().includes(searchLower))
      )
    }

    // Apply price filter
    if (filters.priceFilter !== 'all') {
      filtered = filtered.filter((recipe) => {
        const price = recipe.price || 0
        switch (filters.priceFilter) {
          case 'low':
            return price < 10
          case 'medium':
            return price >= 10 && price <= 25
          case 'high':
            return price > 25
          default:
            return true
        }
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'price-low':
          return (a.price || 0) - (b.price || 0)
        case 'price-high':
          return (b.price || 0) - (a.price || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [recipes, filters])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PageHeader
            title="Our Recipes"
            subtitle="Discover our collection of classic and timeless recipes"
          />

          {!loading && recipes.length > 0 && (
            <RecipeFilter
              onFilterChange={setFilters}
              recipesCount={filteredAndSortedRecipes.length}
            />
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-amber-900 font-serif text-lg">Loading recipes...</p>
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 border-2 border-amber-800">
                <p className="text-amber-900 font-serif text-lg mb-4">
                  No recipes available yet.
                </p>
                <p className="text-amber-800 font-serif italic">
                  Check back soon for new recipes!
                </p>
              </div>
            </div>
          ) : filteredAndSortedRecipes.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 border-2 border-amber-800">
                <p className="text-amber-900 font-serif text-lg mb-4">
                  No recipes match your filters.
                </p>
                <p className="text-amber-800 font-serif italic">
                  Try adjusting your search or filters.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedRecipes.map((recipe) => (
                <Link
                  key={recipe._id}
                  to={`/recipes/${recipe._id}`}
                  className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-800 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {recipe.imageUrl && (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-2xl font-serif font-bold text-amber-900 mb-3">
                    {recipe.title}
                  </h3>
                  <p className="text-amber-800 font-serif mb-4 line-clamp-3">
                    {recipe.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-serif font-semibold text-amber-900 mb-2">
                      Ingredients:
                    </h4>
                    <ul className="list-disc list-inside text-amber-800 font-serif text-sm space-y-1">
                      {recipe.ingredients?.slice(0, 3).map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                      {recipe.ingredients?.length > 3 && (
                        <li className="text-amber-700 italic">
                          +{recipe.ingredients.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-amber-200">
                    <span className="text-xl font-serif font-bold text-amber-900">
                      ${recipe.price?.toFixed(2)}
                    </span>
                    <span className="text-xs text-amber-700 font-serif italic">
                      {new Date(recipe.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Recipes
