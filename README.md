# Restaurant Recipe Management System

A full-stack web application for managing and sharing restaurant recipes. Built with React, Node.js, Express, and MongoDB.

## Features

### 🔐 Authentication & Security
- User registration and login with JWT authentication
- HttpOnly cookies for secure token storage
- Token blacklist system for immediate revocation
- Rate limiting on login attempts (5 attempts per 15 minutes)
- Password hashing with bcrypt
- User ownership verification for recipe operations

### 📝 Recipe Management
- **Create Recipes**: Add recipes with title, description, ingredients, price, and images
- **View All Recipes**: Browse all public recipes in a beautiful grid layout
- **My Recipes**: Personal recipe collection with full CRUD operations
- **Recipe Details**: Detailed view for each recipe with full information
- **Image Upload**: Base64 image support for recipe photos

### 🎨 User Interface
- Modern, responsive design with Tailwind CSS
- Elegant amber color scheme
- Mobile-friendly navigation
- Toast notifications for user feedback
- Loading states and error handling

### 📧 Contact System
- Contact form with validation
- Contact information display
- Social media links

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cookie Parser** - Cookie management
- **Express Rate Limit** - Rate limiting

## Project Structure

```
resturant db/
├── backend/
│   ├── configs/          # Database configuration
│   ├── controller/       # Route controllers
│   ├── middlewares/      # Auth, rate limiting, error handling
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── validators/      # Input validation
│   └── server.js        # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── core/   # Core components (Navbar, Footer, etc.)
│   │   │   └── ui/     # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── routes/     # Route configuration
│   │   ├── config/     # API configuration
│   │   └── constants/  # Static data
│   └── vite.config.js  # Vite configuration
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "resturant db"
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create backend environment file**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Create frontend environment file (optional)**
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:4000
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Server will run on `http://localhost:4000`

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

   The Vite proxy automatically routes `/api/*` requests to the backend.

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout (protected)
- `GET /api/users/me` - Get current user info (protected)
- `PUT /api/users/change-password` - Change password (protected)

### Recipes
- `GET /api/recipes/get` - Get all recipes (public)
- `GET /api/recipes/:id` - Get recipe by ID (public)
- `GET /api/recipes/my-recipes` - Get user's recipes (protected)
- `POST /api/recipes/create` - Create new recipe (protected)
- `PUT /api/recipes/:id` - Update recipe (protected, owner only)
- `DELETE /api/recipes/:id` - Delete recipe (protected, owner only)

## Security Features

- **HttpOnly Cookies**: Tokens stored in httpOnly cookies (XSS protection)
- **Token Blacklist**: Immediate token revocation on logout
- **Rate Limiting**: Prevents brute force attacks
- **Password Hashing**: Bcrypt with salt rounds
- **Ownership Verification**: Users can only modify their own recipes
- **CORS Protection**: Configured for same-origin requests
- **Input Validation**: Server-side validation for all inputs

## Environment Variables

### Backend (.env)
```
PORT=4000
MONGO_URI=mongodb://localhost:27017/restaurant-db
JWT_SECRET=your-super-secret-jwt-key-change-this
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env) - Optional
```
VITE_API_URL=http://localhost:4000
```

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```
Output will be in `frontend/dist/`

### Backend
```bash
cd backend
npm start
```
Make sure to set `NODE_ENV=production` in your production environment.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created with ❤️ for restaurant recipe management

## Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- Tailwind CSS for the beautiful styling utilities
