import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home'
import Recipes from '../pages/Recipes'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import MyRecipes from '../pages/MyRecipes'
import RecipeDetail from '../pages/RecipeDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/recipes',
    element: <Recipes />,
  },
  {
    path: '/recipes/:id',
    element: <RecipeDetail />,
  },
  {
    path: '/my-recipes',
    element: <MyRecipes />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
])

export default router

