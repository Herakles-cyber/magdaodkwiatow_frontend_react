import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import styles from './Header.module.css'
import { LuShoppingCart, LuMenu, LuX } from 'react-icons/lu'
import { IoKeyOutline } from 'react-icons/io5'

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false)
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const dropdownTimeoutRef = useRef(null)

	// REFERENCJE
	const navRef = useRef(null)
	const burgerRef = useRef(null)

	const toggleMenu = () => setMenuOpen(!menuOpen)

	// obsługa doropdawn by zamykał się po 2 sec
	const showDropdown = () => {
		clearTimeout(dropdownTimeoutRef.current)
		setIsDropdownVisible(true)
	}

	const hideDropdown = () => {
		dropdownTimeoutRef.current = setTimeout(() => {
			setIsDropdownVisible(false)
		}, 500) // 2 sekundy opóźnienia
	}

	// OBSŁUGA KLIKNIĘCIA POZA MENU
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				navRef.current &&
				!navRef.current.contains(event.target) &&
				burgerRef.current &&
				!burgerRef.current.contains(event.target)
			) {
				setMenuOpen(false)
			}
		}

		if (menuOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [menuOpen])

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				{/* Logo po lewej */}
				<div className={styles.logoWrapper}>
					<Link to='/' className={styles.logo}>
						Sklep Ogrodniczy
					</Link>
				</div>

				{/* Ikony mobilne obok siebie */}
				<div className={styles.mobileIcons}>
					<div className={styles.mobileCart}>
						<Link to='/koszyk' className={styles.link} onClick={() => setMenuOpen(false)}>
							<LuShoppingCart className={styles.cartIcon} />
						</Link>
					</div>
					<button ref={burgerRef} className={styles.burger} onClick={toggleMenu}>
						{menuOpen ? <LuX /> : <LuMenu />}
					</button>
				</div>

				{/* Nawigacja desktop + rozwijana mobilna */}
				<nav ref={navRef} className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
					{/* <Link to='/produkty' className={styles.link} onClick={() => setMenuOpen(false)}>
						Produkty
					</Link> */}
					<div
						className={`${styles.dropdown} ${isDropdownVisible ? styles.active : ''}`}
						onMouseEnter={showDropdown}
						onMouseLeave={hideDropdown}>
						<button className={styles.dropBtn}>Produkty</button>
						<div className={styles.dropdownContent}>
							<Link to='/produkty/nasiona' onClick={() => setMenuOpen(false)}>
								Nasiona
							</Link>
							<Link to='/produkty/ebooki' onClick={() => setMenuOpen(false)}>
								E-booki
							</Link>
							<Link to='/produkty/gadzety' onClick={() => setMenuOpen(false)}>
								Gadżety
							</Link>
						</div>
					</div>

					<Link to='/kontakt' className={styles.link} onClick={() => setMenuOpen(false)}>
						Kontakt
					</Link>
					<Link to='/blog' className={styles.link} onClick={() => setMenuOpen(false)}>
						Blog
					</Link>
				</nav>

				{/* Wyszukiwanie – desktop (obok koszyka) */}
				<form
					className={styles.searchDesktop}
					onSubmit={e => {
						e.preventDefault()
						const query = e.target.elements.query.value
						if (query.trim()) {
							setMenuOpen(false)
							window.location.href = `/produkty?szukaj=${encodeURIComponent(query)}`
						}
					}}>
					<input type='text' name='query' placeholder='Szukaj...' className={styles.input} />
					<button type='submit' className={styles.searchBtn}>
						🔍
					</button>
				</form>

				{/* Koszyk dla desktopu */}
				<div className={styles.desktopCart}>
					<Link to='/logowanie' className={styles.link}>
						<IoKeyOutline className={styles.keyIcon} />
					</Link>
					<Link to='/koszyk' className={styles.link}>
						<LuShoppingCart className={styles.cartIcon} />
					</Link>
				</div>
			</div>
		</header>
	)
}
