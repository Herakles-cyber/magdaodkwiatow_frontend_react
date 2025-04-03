// src/components/CartPanel.jsx
import { useCart } from '../context/CartContext'
import styles from './CartPanel.module.css'
import { FaTrash } from 'react-icons/fa'
import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CartPanel = ({ isOpen, onClose }) => {
	const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart()

	const panelRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = event => {
			if (isOpen && panelRef.current && !panelRef.current.contains(event.target)) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen, onClose])

	const updateQuantity = (id, newQty) => {
		if (newQty >= 1) {
			increaseQuantity(id) // lub zrób osobną funkcję w context
		}
	}

	const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

	return (
		<div ref={panelRef} className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
			<div className={styles.header}>
				<h2>Koszyk</h2>
				<button onClick={onClose} className={styles.close}>
					&times;
				</button>
			</div>

			<div className={styles.content}>
				{' '}
				{cartItems.length === 0 ? (
					<p>Twój koszyk jest pusty.</p>
				) : (
					<>
						{' '}
						<ul>
							{' '}
							{cartItems.map(item => (
								<li key={item.id} className={styles.item}>
									{' '}
									<div className={styles.itemInfo}>
										{' '}
										<span className={styles.itemName}>
											{' '}
											{item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}{' '}
										</span>{' '}
										<div className={styles.quantityControls}>
											{' '}
											<button onClick={() => decreaseQuantity(item.id)}>-</button>{' '}
											<input
												type='number'
												min='1'
												value={item.quantity}
												onChange={e => updateQuantity(item.id, Number(e.target.value))}
											/>{' '}
											<button onClick={() => increaseQuantity(item.id)}>+</button>{' '}
										</div>{' '}
									</div>{' '}
									<button onClick={() => removeFromCart(item.id)} className={styles.remove}>
										{' '}
										<FaTrash />{' '}
									</button>{' '}
								</li>
							))}{' '}
						</ul>{' '}
						<div className={styles.summary}>
							{' '}
							<span>Do zapłaty: {total.toFixed(2)} zł</span>{' '}
						</div>{' '}
						<div className={styles.order}>
							<Link to='/finalizacja' className={styles.orderButton} onClick={onClose}>
								Zrealizuj zamówienie
							</Link>
						</div>
					</>
				)}{' '}
			</div>
		</div>
	)
}

export default CartPanel
