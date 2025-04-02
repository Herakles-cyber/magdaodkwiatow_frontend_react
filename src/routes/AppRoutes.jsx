import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import UserAccountPage from '../pages/UserAccountPage'
import ContactPage from '../pages/ContactPage'
import BlogPage from '../pages/BlogPage'
import TestAddToCart from '../components/TestAddToCart'

export default function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/produkty' element={<ProductsPage />} />
			<Route path='/produkt/:id' element={<ProductPage />} />
			<Route path='/koszyk' element={<CartPage />} />
			<Route path='/checkout' element={<CheckoutPage />} />
			<Route path='/logowanie' element={<LoginPage />} />
			<Route path='/rejestracja' element={<RegisterPage />} />
			<Route path='/konto' element={<UserAccountPage />} />
			<Route path='/kontakt' element={<ContactPage />} />
			<Route path='/blog' element={<BlogPage />} />
			<Route path='/test-koszyk' element={<TestAddToCart />} />
		</Routes>
	)
}
