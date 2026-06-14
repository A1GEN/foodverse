import {

  Routes,
  Route

} from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import LoadingScreen from "./components/LoadingScreen/LoadingScreen"
import { useState } from "react"

import Home from "./pages/Home/Home"

import Favorites from "./pages/Favorites/Favorites"

import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Profile from "./pages/Profile/Profile"
import Admin from "./pages/Admin/Admin"
import ProtectedAdmin from "./routes/ProtectedAdmin"

import CreateRecipe from "./pages/CreateRecipe/CreateRecipe"
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails"
import Cart from "./pages/Cart/Cart"
import Catalog from "./pages/Catalog/Catalog"
import Recipes from "./pages/Recipes/Recipes"
import Checkout from "./pages/Checkout/Checkout"
import Product from "./pages/Product/Product"
import Success from "./pages/Success/Success"

function App() {

  const [loading, setLoading] = useState(true)

  return (

    <>

      <Navbar />

      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/favorites" element={<Favorites />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<ProtectedAdmin><Admin /></ProtectedAdmin>} />

        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/success" element={<Success />} />

      </Routes>

      <Footer />

    </>

  )

}

export default App