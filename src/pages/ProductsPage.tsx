// src/pages/ProductsPage.jsx
import React from 'react'
import { useLocation } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import styles from './ProductsPage.module.css' // Opcjonalne style

const ProductsPage = () => {
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const searchQuery = searchParams.get('szukaj')?.toLowerCase() || ''

	// Filtrowanie produktów na podstawie nazwy, opisu lub słów kluczowych
	const filteredProducts = products.filter(product => {
		const nameMatch = product.name.toLowerCase().includes(searchQuery)
		const descriptionMatch = product.description ? product.description.toLowerCase().includes(searchQuery) : false
		const keywordsMatch = product.keywords
			? product.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery))
			: false

		return searchQuery === '' || nameMatch || descriptionMatch || keywordsMatch
	})

	return (
		<div className={styles.productsPage}>
			<h1>Produkty</h1>
			<div className={styles.productsGrid}>
				{filteredProducts.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
				{filteredProducts.length === 0 && <p>Brak produktów spełniających kryteria wyszukiwania.</p>}
			</div>
		</div>
	)
}

export default ProductsPage
