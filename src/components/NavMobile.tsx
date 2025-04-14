import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaShoppingCart } from 'react-icons/fa'
import styles from './NavMobile.module.css'
import ProductDropdownMobile from './ProductDropdownMobile'
import CartPanel from './CartPanel'
import { useCart } from '../context/CartContext'

const NavMobile: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [cartOpen, setCartOpen] = useState(false)
	const navRef = useRef<HTMLElement | null>(null)

	const { cartItems } = useCart()
	const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
				setMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [menuOpen])

	return (
		<nav className={styles.navbar} ref={navRef}>
			<div className={styles.navbarInner}>
				<div className={styles.topBar}>
					<Link to='/' className={styles.logo} onClick={() => setMenuOpen(false)}>
						Magdaodkwiatow
					</Link>

					<div className={styles.icons}>
						<button className={styles.cart} aria-label='Koszyk' onClick={() => setCartOpen(true)}>
							<FaShoppingCart className={styles.icon} />
							{cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
						</button>

						<button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)} aria-label='Menu'>
							<FaBars className={styles.icon} />
						</button>
					</div>
				</div>

				<div className={`${styles.menu} ${menuOpen ? styles.menuOpen : styles.menuClosed}`}>
					<div className={styles.searchWrapper}>
						<form
							className={styles.searchForm}
							onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
								e.preventDefault()
								const query = (e.currentTarget.elements.namedItem('query') as HTMLInputElement).value
								if (query.trim()) {
									setMenuOpen(false)
									window.location.href = `/produkty?szukaj=${encodeURIComponent(query)}`
								}
							}}>
							<input type='text' name='query' placeholder='Szukaj produktów...' className={styles.searchInput} />
							<button type='submit' className={styles.searchButton}>
								🔍
							</button>
						</form>
					</div>
					<ProductDropdownMobile onClose={() => setMenuOpen(false)} />
					<Link to='/zaloguj' className={styles.link} onClick={() => setMenuOpen(false)}>
						Zaloguj
					</Link>
					<Link to='/kontakt' className={styles.link} onClick={() => setMenuOpen(false)}>
						Kontakt
					</Link>
				</div>
				<CartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />
			</div>
		</nav>
	)
}

export default NavMobile
