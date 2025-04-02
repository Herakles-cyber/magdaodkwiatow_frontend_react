// src/components/TestAddToCart.jsx
import { useCart } from '../context/CartContext'

const TestAddToCart = () => {
	const { addToCart } = useCart()

	const handleAdd = () => {
		addToCart({ id: Date.now(), name: 'Testowy produkt', quantity: 1 })
	}

	return (
		<div style={{ padding: '2rem', textAlign: 'center', minHeight: '200vh', }}>
			<h2>Test dodawania do koszyka</h2>
			<button
				style={{
					// minHeight: '200vh',
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
