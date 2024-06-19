import React from 'react';
import "./all.css";
import { Link } from 'react-router-dom';

const electrician = () => {
  const products = [
    {
      id: 1,
      image: 'https://m.media-amazon.com/images/I/317tonuF5gL._QL70_FMwebp_.jpg',
      title: 'Dulux 5580864 White Solvent Wall Paint  (20 L)',
      price: '5,440',
      link: 'https://www.amazon.in/Berger-Instruments-Interior-Acrylic-Paint/dp/B075W1TJ1F/ref=sr_1_8?sr=8-8'
    },
    {
      id: 2,
      image: 'https://m.media-amazon.com/images/I/317tonuF5gL._QL70_FMwebp_.jpg',
      title: 'Dulux 5580864 White Solvent Wall Paint  (20 L)',
      price: '5,440',
      link: 'https://www.amazon.in/Berger-Instruments-Interior-Acrylic-Paint/dp/B075W1TJ1F/ref=sr_1_8?sr=8-8'
    },
    {
      id: 3,
      image: 'https://m.media-amazon.com/images/I/317tonuF5gL._QL70_FMwebp_.jpg',
      title: 'Dulux 5580864 White Solvent Wall Paint  (20 L)',
      price: '5,440',
      link: 'https://www.amazon.in/Berger-Instruments-Interior-Acrylic-Paint/dp/B075W1TJ1F/ref=sr_1_8?sr=8-8'
    },
  ];

  return (
    <div className='allPages'>
      {products.map((product) => (
        <Link to={product.link} className="add-to-cart-button" key={product.id}>
          <div className="product-card">
            <img src={product.image} alt={product.title} className="allPages-image" />
            <div className="allPages-details">
              <h2 className="allPages-title">{product.title}</h2>
              <p className="allPages-price">₹ {product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default electrician;
