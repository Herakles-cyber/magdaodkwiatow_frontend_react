import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import styles from './NavMobile.module.css'
import ProductDropdownMobile from './ProductDropdownMobile'

const NavMobile = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const navRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = event => {
			if (menuOpen && navRef.current && !navRef.current.contains(event.target)) {
				setMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [menuOpen])

	return (
		<nav className={styles.navbar} ref={navRef}>
			<div className={styles.topBar}>
				<Link to='/' className={styles.logo} onClick={() => setMenuOpen(false)}>
					🌱 GardenShop
				</Link>
				<button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)} aria-label='Menu'>
					<FaBars className={styles.burgerIcon} />
				</button>
			</div>

			<div className={`${styles.menu} ${menuOpen ? styles.menuOpen : styles.menuClosed}`}>
				<ProductDropdownMobile onClose={() => setMenuOpen(false)} />
				<Link to='/zaloguj' className={styles.link} onClick={() => setMenuOpen(false)}>
					Zaloguj
				</Link>
				<Link to='/kontakt' className={styles.link} onClick={() => setMenuOpen(false)}>
					Kontakt
				</Link>
			</div>
		</nav>
	)
}

export default NavMobile
