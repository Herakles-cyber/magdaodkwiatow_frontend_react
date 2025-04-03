import { useParams } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import './ProductCategoryStyles.css'

// Mapowanie slugów z URL do wewnętrznych kategorii
const slugToCategory = {
	nasiona: 'nasiona',
	odziez: 'odziez',
	'ksiazki-i-ebooki': 'ksiazki-i-ebooki',
}

// Mapowanie slugów na ładne nazwy do nagłówków
const slugToLabel = {
	nasiona: 'Nasiona',
	odziez: 'Odzież',
	'ksiazki-i-ebooki': 'Książki i e-booki',
}

const ProductCategory = () => {
	const categoryNames = {
		nasiona: 'Nasiona',
		odziez: 'Odzież',
		ksiazki: 'Książki i e-booki',
	}

	const { category } = useParams()
	const realCategory = slugToCategory[category] || category
	const filtered = products.filter(product => product.category === realCategory)

	return (
		<div className='categoryPage'>
			<h2>Produkty: {slugToLabel[category] || category}</h2>
			{filtered.length > 0 ? (
				<div className={`grid ${filtered.length === 1 ? 'single' : ''}`}>
					{filtered.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			) : (
				<p>Brak produktów w tej kategorii.</p>
			)}
		</div>
	)
}

export default ProductCategory
