import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="relative bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-300">
      {/* Vintage decorative border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 dark:from-amber-600 dark:via-amber-500 dark:to-amber-600"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 dark:from-amber-600 dark:via-amber-500 dark:to-amber-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left Image */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-2 bg-amber-800 dark:bg-amber-600 rounded-lg transform rotate-2 opacity-20 dark:opacity-30"></div>
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop&q=80"
                alt="Vintage restaurant interior"
                className="relative rounded-lg shadow-2xl border-4 border-amber-800 dark:border-amber-600 sepia hover:sepia-0 transition-all duration-500"
                style={{ filter: 'sepia(30%) contrast(1.1)' }}
              />
              <div className="absolute -bottom-4 -right-4 bg-amber-900 dark:bg-amber-700 text-amber-50 dark:text-amber-100 px-4 py-2 rounded-lg shadow-lg border-2 border-amber-700 dark:border-amber-600 transform rotate-3">
                <p className="text-sm font-serif italic">Est. 1920</p>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="text-center md:col-span-1">
            <div className="mb-6">
              <div className="inline-block mb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-600"></div>
                  <span className="text-amber-800 dark:text-amber-400 text-2xl">✦</span>
                  <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-600"></div>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-900 dark:text-amber-200 mb-4 tracking-wide">
                <span className="block text-amber-800 dark:text-amber-300">Welcome to</span>
                <span className="block text-amber-900 dark:text-amber-200 italic">Our Restaurant</span>
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-600"></div>
                <span className="text-amber-800 dark:text-amber-400 text-2xl">✦</span>
                <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-600"></div>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-amber-900 dark:text-amber-200 mb-8 font-serif italic leading-relaxed">
              "Where tradition meets taste, and every meal tells a story"
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/recipes"
                className="bg-amber-800 dark:bg-amber-600 text-amber-50 dark:text-amber-100 px-8 py-3 rounded-sm font-serif text-lg hover:bg-amber-900 dark:hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-amber-900 dark:border-amber-700 uppercase tracking-wider"
              >
                Explore Recipes
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-amber-800 dark:border-amber-600 text-amber-900 dark:text-amber-200 px-8 py-3 rounded-sm font-serif text-lg hover:bg-amber-800 dark:hover:bg-amber-600 hover:text-amber-50 dark:hover:text-amber-100 transition-all duration-300 uppercase tracking-wider"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-2 bg-amber-800 dark:bg-amber-600 rounded-lg transform -rotate-2 opacity-20 dark:opacity-30"></div>
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop&q=80"
                alt="Classic cuisine"
                className="relative rounded-lg shadow-2xl border-4 border-amber-800 dark:border-amber-600 sepia hover:sepia-0 transition-all duration-500"
                style={{ filter: 'sepia(30%) contrast(1.1)' }}
              />
              <div className="absolute -top-4 -left-4 bg-amber-900 dark:bg-amber-700 text-amber-50 dark:text-amber-100 px-4 py-2 rounded-lg shadow-lg border-2 border-amber-700 dark:border-amber-600 transform -rotate-3">
                <p className="text-sm font-serif italic">Fine Dining</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative images row */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-amber-800 dark:bg-amber-600 rounded opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-300"></div>
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&q=80"
              alt="Vintage dish"
              className="w-full h-32 object-cover rounded-lg border-2 border-amber-800 dark:border-amber-600 shadow-lg sepia hover:sepia-0 transition-all duration-500"
              style={{ filter: 'sepia(40%) contrast(1.1)' }}
            />
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-amber-800 dark:bg-amber-600 rounded opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-300"></div>
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop&q=80"
              alt="Classic meal"
              className="w-full h-32 object-cover rounded-lg border-2 border-amber-800 dark:border-amber-600 shadow-lg sepia hover:sepia-0 transition-all duration-500"
              style={{ filter: 'sepia(40%) contrast(1.1)' }}
            />
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-amber-800 dark:bg-amber-600 rounded opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-300"></div>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop&q=80"
              alt="Traditional food"
              className="w-full h-32 object-cover rounded-lg border-2 border-amber-800 dark:border-amber-600 shadow-lg sepia hover:sepia-0 transition-all duration-500"
              style={{ filter: 'sepia(40%) contrast(1.1)' }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

