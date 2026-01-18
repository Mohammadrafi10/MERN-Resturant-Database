function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white border-t-2 border-amber-800 dark:border-amber-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-400 dark:text-amber-500">About Us</h3>
            <p className="text-gray-300 dark:text-gray-400">
              Your go-to destination for delicious recipes and culinary inspiration.
              We bring you the best dishes from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-400 dark:text-amber-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/recipes"
                  className="text-gray-300 dark:text-gray-400 hover:text-amber-400 dark:hover:text-amber-500 transition-colors"
                >
                  Recipes
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 dark:text-gray-400 hover:text-amber-400 dark:hover:text-amber-500 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-gray-300 dark:text-gray-400 hover:text-amber-400 dark:hover:text-amber-500 transition-colors"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-400 dark:text-amber-500">Contact</h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>Email: info@restaurant.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Food Street, City</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 dark:border-gray-800 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; {currentYear} Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

