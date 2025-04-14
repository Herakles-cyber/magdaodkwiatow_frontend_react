// src/components/TestAddToCart.tsx
import { useCart, CartItem } from '../context/CartContext'

const TestAddToCart: React.FC = () => {
	const { addToCart } = useCart()

	const handleAdd = () => {
		const testProduct: CartItem = {
			id: Date.now(),
			name: 'Testowy produkt',
			price: 0,
			image: '',
			category: '',
			quantity: 1,
		}
		addToCart(testProduct)
	}

	return (
		<div style={{ padding: '2rem', textAlign: 'center', minHeight: '200vh' }}>
			<h2>Test dodawania do koszyka</h2>
			<button
				style={{
					padding: '0.75rem 1.5rem',
					backgroundColor: '#2f855a',
					color: 'white',
					border: 'none',
					borderRadius: '8px',
					cursor: 'pointer',
					fontSize: '1rem',
				}}
				onClick={handleAdd}>
				Dodaj testowy produkt
			</button>
		</div>
	)
}

export default TestAddToCart
