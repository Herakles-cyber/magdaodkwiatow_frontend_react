// src/components/CartPanel.jsx
import { useCart } from '../context/CartContext'
import styles from './CartPanel.module.css'

const CartPanel = ({ isOpen, onClose }) => {
	const { cartItems } = useCart()

	return (
		<div className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
			<div className={styles.header}>
				<h2>Koszyk</h2>
				<button onClick={onClose} className={styles.close}>
					&times;
				</button>
			</div>

			<div className={styles.content}>
				{cartItems.length === 0 ? (
					<p>Twój koszyk jest pusty.</p>
				) : (
					<ul>
						{cartItems.map(item => (
							<li key={item.id} className={styles.item}>
								{item.name} × {item.quantity}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default CartPanel
