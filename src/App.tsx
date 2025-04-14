import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import NavMobile from './components/NavMobile'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'
import React from 'react'

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<CartProvider>
				<NavMobile />
				{/* <Header /> */}
				<main className='main'>
					<AppRoutes />
				</main>
				<Footer />
			</CartProvider>
		</BrowserRouter>
	)
}

export default App
