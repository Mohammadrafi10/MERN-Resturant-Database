import { useState, useCallback } from 'react'

/**
 * Recipe filter and search component.
 * Provides search by title/description and price range filtering.
 */
function RecipeFilter({ onFilterChange, recipesCount }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all') // 'all', 'low', 'medium', 'high'
  const [categoryFilter, setCategoryFilter] = useState('all') // 'all', 'sweet', 'main', 'ice cream', 'dessert'
  const [sortBy, setSortBy] = useState('newest') // 'newest', 'oldest', 'price-low', 'price-high'

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value
    setSearchTerm(value)
    onFilterChange({
      searchTerm: value,
      priceFilter,
      categoryFilter,
      sortBy,
    })
  }, [priceFilter, categoryFilter, sortBy, onFilterChange])

  const handlePriceFilterChange = useCallback((e) => {
    const value = e.target.value
    setPriceFilter(value)
    onFilterChange({
      searchTerm,
      priceFilter: value,
      categoryFilter,
      sortBy,
    })
  }, [searchTerm, categoryFilter, sortBy, onFilterChange])

  const handleCategoryFilterChange = useCallback((e) => {
    const value = e.target.value
    setCategoryFilter(value)
    onFilterChange({
      searchTerm,
      priceFilter,
      categoryFilter: value,
      sortBy,
    })
  }, [searchTerm, priceFilter, sortBy, onFilterChange])

  const handleSortChange = useCallback((e) => {
    const value = e.target.value
    setSortBy(value)
    onFilterChange({
      searchTerm,
      priceFilter,
      categoryFilter,
      sortBy: value,
    })
  }, [searchTerm, priceFilter, categoryFilter, onFilterChange])

  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setPriceFilter('all')
    setCategoryFilter('all')
    setSortBy('newest')
    onFilterChange({
      searchTerm: '',
      priceFilter: 'all',
      categoryFilter: 'all',
      sortBy: 'newest',
    })
  }, [onFilterChange])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-amber-800 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-xl font-serif font-bold text-amber-900">
          Filter & Search
        </h2>
        <span className="text-sm text-amber-700 font-serif">
          {recipesCount} recipe{recipesCount !== 1 ? 's' : ''} found
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-amber-900 font-serif font-medium mb-2">
            Search Recipes
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by title or description..."
              className="w-full px-4 py-2 pl-10 border-2 border-amber-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-amber-900 font-serif"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="categoryFilter" className="block text-amber-900 font-serif font-medium mb-2">
            Category
          </label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
            className="w-full px-4 py-2 border-2 border-amber-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-amber-900 font-serif"
          >
            <option value="all">All Categories</option>
            <option value="main">Main</option>
            <option value="sweet">Sweet</option>
            <option value="ice cream">Ice Cream</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Price Filter */}
        <div>
          <label htmlFor="priceFilter" className="block text-amber-900 font-serif font-medium mb-2">
            Price Range
          </label>
          <select
            id="priceFilter"
            value={priceFilter}
            onChange={handlePriceFilterChange}
            className="w-full px-4 py-2 border-2 border-amber-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-amber-900 font-serif"
          >
            <option value="all">All Prices</option>
            <option value="low">Under $10</option>
            <option value="medium">$10 - $25</option>
            <option value="high">Over $25</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 pt-4 border-t border-amber-200">
        {/* Sort By */}
        <div className="flex items-center gap-2">
          <label htmlFor="sortBy" className="text-amber-900 font-serif font-medium">
            Sort by:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="px-4 py-2 border-2 border-amber-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-amber-900 font-serif"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {(searchTerm || priceFilter !== 'all' || categoryFilter !== 'all' || sortBy !== 'newest') && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-amber-200 text-amber-900 font-serif font-medium rounded-md hover:bg-amber-300 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default RecipeFilter
