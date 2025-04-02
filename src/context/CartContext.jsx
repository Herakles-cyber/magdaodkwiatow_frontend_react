// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([{ id: 1, name: 'Przykładowy produkt', quantity: 1 }])

	const addToCart = product => {
		setCartItems(prev => [...prev, product])
	}

	const value = {
		cartItems,
		addToCart,
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
