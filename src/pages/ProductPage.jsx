import { useParams } from 'react-router-dom';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="productPage"><h2>Nie znaleziono produktu.</h2></div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  return (
    <div className="productPage">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} className="productImage" />
      <p className="productDescription">{product.description || 'Brak opisu produktu.'}</p>
      <p className="productPrice">{product.price.toFixed(2)} zł</p>

      <div className="quantityControls">
        <button className="quantityButton" onClick={decreaseQuantity}>-</button>
        <input 
          type="number"
          className="quantityInput"
          value={quantity}
          onChange={handleInputChange}
          min={1}
        />
        <button className="quantityButton" onClick={increaseQuantity}>+</button>
      </div>

      <button className="productAddButton" onClick={handleAddToCart}>
        Dodaj do koszyka
      </button>
    </div>
  );
}
