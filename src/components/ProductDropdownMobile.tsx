import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductDropdownMobile.module.css'
import { FaChevronDown } from 'react-icons/fa'

interface ProductDropdownMobileProps {
	onClose: () => void
}

const ProductDropdownMobile: React.FC<ProductDropdownMobileProps> = ({ onClose }) => {
	const [open, setOpen] = useState(false)

	const links: { path: string; text: string }[] = [
		{ path: '/produkty/nasiona', text: 'Nasiona' },
		{ path: '/produkty/ksiazki-i-ebooki', text: 'Książki i e-booki' },
		{ path: '/produkty/odziez', text: 'Odzież' },
	]

	return (
		<div className={styles.dropdown}>
			<div className={styles.label} onClick={() => setOpen(!open)}>
				Produkty
				<FaChevronDown className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`} />
			</div>
			<div className={`${styles.menu} ${open ? styles.menuOpen : styles.menuClosed}`}>
				{links.map(link => (
					<Link key={link.path} to={link.path} className={styles.link} onClick={onClose}>
						{link.text}
					</Link>
				))}
			</div>
		</div>
	)
}

export default ProductDropdownMobile
