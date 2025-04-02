// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react'
import { useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState(() => {
		const storedCart = localStorage.getItem('cart')
		return storedCart ? JSON.parse(storedCart) : []
	})

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cartItems))
	}, [cartItems])

	const addToCart = product => {
		setCartItems(prev => [...prev, product])
	}
	const removeFromCart = id => {
		setCartItems(prev => prev.filter(item => item.id !== id))
	}

	const increaseQuantity = id => {
		setCartItems(prev => prev.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
	}

	const decreaseQuantity = id => {
		setCartItems(prev =>
			prev.map(item => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
		)
	}

	const value = {
		cartItems,
		addToCart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
