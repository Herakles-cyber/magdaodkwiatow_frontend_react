import { useParams } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import './ProductCategoryStyles.css'

// Mapowanie slugów z URL na wewnętrzne kategorie (z danych)
const slugToCategory: Record<string, string> = {
	nasiona: 'nasiona',
	odziez: 'odziez',
	'ksiazki-i-ebooki': 'ksiazki-i-ebooki',
}

// Mapowanie slugów na ładne nazwy do nagłówków
const slugToLabel: Record<string, string> = {
	nasiona: 'Nasiona',
	odziez: 'Odzież',
	'ksiazki-i-ebooki': 'Książki i e-booki',
}

const ProductCategory: React.FC = () => {
	const { category = '' } = useParams<{ category?: string }>()
	const realCategory = slugToCategory[category] || category

	const filtered = products.filter(
		product => product.category.toLowerCase() === realCategory.toLowerCase()
	)

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
