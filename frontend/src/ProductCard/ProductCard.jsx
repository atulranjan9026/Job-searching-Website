import React from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'

const product = {
    image: 'https://m.media-amazon.com/images/I/317tonuF5gL._QL70_FMwebp_.jpg',
    title: 'Dulux 5580864 White Solvent Wall Paint  (20 L)',
    // description: 'This is a sample product description.',
    price: '5,440'
  };

const ProductCard  = () => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-details">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">₹ {product.price}</p>
        <Link to={"https://www.amazon.in/Berger-Instruments-Interior-Acrylic-Paint/dp/B075W1TJ1F/ref=sr_1_8?sr=8-8"} className="add-to-cart-button">Add to Cart</Link>
      </div>
    </div>
  )
}

export default ProductCard 