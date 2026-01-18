import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/core/Navbar'
import Footer from '../components/core/Footer'
import PageHeader from '../components/ui/PageHeader'
import api from '../config/api'

function MyRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    price: '',
    imageUrl: '',
    category: 'main',
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check authentication by trying to fetch recipes
    // If 401, user will be redirected by api interceptor
    fetchMyRecipes()
  }, [navigate])

  const fetchMyRecipes = async () => {
    try {
      setLoading(true)
      const response = await api.get('/recipes/my-recipes')
      setRecipes(response.data.recipes || [])
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        navigate('/login')
      } else {
        toast.error(error.response?.data?.message || 'Failed to fetch your recipes')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB')
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setImagePreview(base64String)
        setFormData({ ...formData, imageUrl: base64String })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    setFormData({ ...formData, ingredients: newIngredients })
  }

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] })
  }

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index)
    setFormData({ ...formData, ingredients: newIngredients })
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      ingredients: [''],
      price: '',
      imageUrl: '',
      category: 'main',
    })
    setImageFile(null)
    setImagePreview('')
    setEditingRecipe(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }
    if (!formData.description.trim()) {
      toast.error('Description is required')
      return
    }
    const validIngredients = formData.ingredients.filter(ing => ing.trim())
    if (validIngredients.length === 0) {
      toast.error('At least one ingredient is required')
      return
    }
    if (!formData.price || parseFloat(formData.price) < 0) {
      toast.error('Valid price is required')
      return
    }

    try {
      setSubmitting(true)
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        ingredients: validIngredients,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl,
        category: formData.category,
      }

      if (editingRecipe) {
        await api.put(`/recipes/${editingRecipe._id}`, payload)
        toast.success('Recipe updated successfully!')
      } else {
        await api.post('/recipes/create', payload)
        toast.success('Recipe created successfully!')
      }

      resetForm()
      fetchMyRecipes()
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        navigate('/login')
      } else {
        toast.error(error.response?.data?.message || 'Failed to save recipe')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe)
    setFormData({
      title: recipe.title || '',
      description: recipe.description || '',
      ingredients: recipe.ingredients && recipe.ingredients.length > 0 
        ? recipe.ingredients 
        : [''],
      price: recipe.price?.toString() || '',
      imageUrl: recipe.imageUrl || '',
      category: recipe.category || 'main',
    })
    setImagePreview(recipe.imageUrl || '')
    setImageFile(null)
    setShowForm(true)
  }

  const handleDelete = async () => {
    if (!showDeleteConfirm) return

    try {
      await api.delete(`/recipes/${showDeleteConfirm}`)
      toast.success('Recipe deleted successfully!')
      setShowDeleteConfirm(null)
      fetchMyRecipes()
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        navigate('/login')
      } else {
        toast.error(error.response?.data?.message || 'Failed to delete recipe')
      }
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-amber-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PageHeader
            title="My Recipes"
            subtitle="Your personal collection of recipes"
          />

          {/* Create/Edit Form */}
          <div className="mb-8">
            <button
              onClick={() => {
                if (showForm) {
                  resetForm()
                } else {
                  setShowForm(true)
                }
              }}
              className="bg-amber-800 text-amber-50 font-serif font-medium py-2 px-6 rounded-md hover:bg-amber-900 transition-colors duration-300"
            >
              {showForm ? 'Cancel' : '+ Create New Recipe'}
            </button>
          </div>

          {showForm && (
            <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-amber-800 dark:border-amber-600">
              <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-200 mb-6">
                {editingRecipe ? 'Edit Recipe' : 'Create New Recipe'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-amber-900 font-serif font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-amber-800 dark:border-amber-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 dark:focus:ring-amber-600 focus:border-transparent text-amber-900 dark:text-amber-100 bg-white dark:bg-gray-700 font-serif"
                    placeholder="Recipe title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-amber-900 font-serif font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-amber-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-amber-900 font-serif resize-none"
                    placeholder="Recipe description"
                    required
                  />
                </div>

                <div>
                  <label className="block text-amber-900 font-serif font-medium mb-2">
                    Ingredients *
                  </label>
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-amber-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-amber-900 font-serif"
                        placeholder={`Ingredient ${index + 1}`}
                      />
                      {formData.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="mt-2 px-4 py-2 bg-amber-200 dark:bg-amber-700 text-amber-900 dark:text-amber-100 rounded-md hover:bg-amber-300 dark:hover:bg-amber-600 transition-colors font-serif"
                  >
                    + Add Ingredient
                  </button>
                </div>

                <div>
                  <label className="block text-amber-900 font-serif font-medium mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border-2 border-amber-800 dark:border-amber-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 dark:focus:ring-amber-600 focus:border-transparent text-amber-900 dark:text-amber-100 bg-white dark:bg-gray-700 font-serif"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-amber-900 font-serif font-medium mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-amber-800 dark:border-amber-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 dark:focus:ring-amber-600 focus:border-transparent text-amber-900 dark:text-amber-100 bg-white dark:bg-gray-700 font-serif"
                    required
                  >
                    <option value="main">Main</option>
                    <option value="sweet">Sweet</option>
                    <option value="ice cream">Ice Cream</option>
                    <option value="dessert">Dessert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-amber-900 font-serif font-medium mb-2">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border-2 border-amber-800 dark:border-amber-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 dark:focus:ring-amber-600 focus:border-transparent text-amber-900 dark:text-amber-100 bg-white dark:bg-gray-700 font-serif"
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-xs h-48 object-cover rounded-md border-2 border-amber-800 dark:border-amber-600"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-amber-800 dark:bg-amber-600 text-amber-50 dark:text-amber-100 font-serif font-medium py-3 px-6 rounded-md hover:bg-amber-900 dark:hover:bg-amber-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Saving...' : editingRecipe ? 'Update Recipe' : 'Create Recipe'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-200 text-gray-800 font-serif font-medium py-3 px-6 rounded-md hover:bg-gray-300 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Recipes Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-amber-900 dark:text-amber-200 font-serif text-lg">Loading your recipes...</p>
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-amber-800 dark:border-amber-600">
                <p className="text-amber-900 dark:text-amber-200 font-serif text-lg mb-4">
                  You haven't created any recipes yet.
                </p>
                <p className="text-amber-800 dark:text-amber-300 font-serif italic">
                  Start creating your first recipe!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-amber-800 dark:border-amber-600 hover:shadow-xl transition-shadow duration-300"
                >
                  {recipe.imageUrl && (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-200 mb-3">
                    {recipe.title}
                  </h3>
                  <p className="text-amber-800 dark:text-amber-300 font-serif mb-4 line-clamp-3">
                    {recipe.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-serif font-semibold text-amber-900 dark:text-amber-200 mb-2">
                      Ingredients:
                    </h4>
                    <ul className="list-disc list-inside text-amber-800 dark:text-amber-300 font-serif text-sm space-y-1">
                      {recipe.ingredients?.slice(0, 3).map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                      {recipe.ingredients?.length > 3 && (
                        <li className="text-amber-700 dark:text-amber-400 italic">
                          +{recipe.ingredients.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-amber-200 dark:bg-amber-700 text-amber-900 dark:text-amber-100 font-serif font-medium rounded-full text-sm capitalize">
                      {recipe.category || 'main'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-amber-200 dark:border-amber-700">
                    <span className="text-xl font-serif font-bold text-amber-900 dark:text-amber-200">
                      ${recipe.price?.toFixed(2)}
                    </span>
                    <span className="text-xs text-amber-700 dark:text-amber-400 font-serif italic">
                      {new Date(recipe.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(recipe)}
                      className="flex-1 bg-amber-600 dark:bg-amber-700 text-amber-50 dark:text-amber-100 font-serif font-medium py-2 px-4 rounded-md hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(recipe._id)}
                      className="flex-1 bg-red-600 dark:bg-red-700 text-white font-serif font-medium py-2 px-4 rounded-md hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full mx-4 border-2 border-amber-800 dark:border-amber-600">
            <h3 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-200 mb-4">
              Confirm Delete
            </h3>
            <p className="text-amber-800 dark:text-amber-300 font-serif mb-6">
              Are you sure you want to delete this recipe? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 dark:bg-red-700 text-white font-serif font-medium py-2 px-4 rounded-md hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-serif font-medium py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default MyRecipes
