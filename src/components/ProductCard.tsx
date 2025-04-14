import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import styles from './ProductCard.module.css'
import { Product } from '../data/products'

interface ProductCardProps {
	product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { addToCart } = useCart()
	const [quantity, setQuantity] = useState<number>(1)

	const decreaseQuantity = () => {
		setQuantity(prev => Math.max(1, prev - 1))
	}

	const increaseQuantity = () => {
		setQuantity(prev => prev + 1)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10)
		setQuantity(value > 0 ? value : 1)
	}

	return (
		<div className={`${styles.card} card`}>
			<Link to={`/produkt/${product.id}`} className={styles.linkPart}>
				<img src={product.image} alt={product.name} className={styles.image} />
				<h3 className={styles.name}>{product.name}</h3>
				<p className={styles.price}>{product.price.toFixed(2)} zł</p>
			</Link>

			<div className={styles.quantityControls}>
				<button className={styles.quantityButton} onClick={decreaseQuantity}>
					-
				</button>
				<input type='number' className={styles.quantityInput} value={quantity} onChange={handleInputChange} min={1} />
				<button className={styles.quantityButton} onClick={increaseQuantity}>
					+
				</button>
			</div>

			<button onClick={() => addToCart({ ...product, quantity })} className={styles.button}>
				Dodaj do koszyka
			</button>
		</div>
	)
}

export default ProductCard
