import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react'
import { Product } from '../data/products'

export interface CartItem extends Product {
	quantity: number
}

interface CartContextType {
	cartItems: CartItem[]
	addToCart: (item: CartItem) => void
	removeFromCart: (id: number) => void
	increaseQuantity: (id: number) => void
	decreaseQuantity: (id: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
	children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
	const [cartItems, setCartItems] = useState<CartItem[]>(() => {
		const storedCart = localStorage.getItem('cart')
		return storedCart ? JSON.parse(storedCart) : []
	})

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cartItems))
	}, [cartItems])

	const addToCart = (product: CartItem) => {
		setCartItems(prevItems => {
			const existingItem = prevItems.find(item => item.id === product.id)
			if (existingItem) {
				return prevItems.map(item =>
					item.id === product.id
						? { ...item, quantity: item.quantity + product.quantity }
						: item
				)
			}
			return [...prevItems, product]
		})
	}

	const removeFromCart = (id: number) => {
		setCartItems(prev => prev.filter(item => item.id !== id))
	}

	const increaseQuantity = (id: number) => {
		setCartItems(prev =>
			prev.map(item =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item
			)
		)
	}

	const decreaseQuantity = (id: number) => {
		setCartItems(prev =>
			prev.map(item =>
				item.id === id && item.quantity > 1
					? { ...item, quantity: item.quantity - 1 }
					: item
			)
		)
	}

	const value: CartContextType = {
		cartItems,
		addToCart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = (): CartContextType => {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
