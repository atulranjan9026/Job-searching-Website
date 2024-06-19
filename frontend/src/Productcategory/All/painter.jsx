import React from 'react';
import "./all.css";
import { Link } from 'react-router-dom';

const Painter = () => {
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
      image: 'https://m.media-amazon.com/images/I/41jNhFVsLjL._SX425_.jpg',
      title: 'Apollo 9 Inches Application Roller with Tray Combo Set',
      price: '248',
      link: 'https://www.amazon.in/Apollo-Inches-Application-Roller-Combo/dp/B08CCVLDV8/ref=srd_d_vsims_T2_d_sccl_2_1/262-8035359-2386965?pd_rd_i=B08CCVLDV8&psc=1'
    },
    {
      id: 3,
      image: 'https://m.media-amazon.com/images/I/51CN5cccj9L._SX342_.jpg',
      title: 'DR. FIXIT Roofseal Classic, 4 Liter, Waterproofing Solution for Homes, Terraces, Roofs',
      price: '1,255',
      link: 'https://www.amazon.in/Roofseal-Classic-Waterproofing-Solution-Terraces/dp/B082BD6Q9S/ref=pd_sim_d_sccl_4_38/262-8035359-2386965?pd_rd_i=B082BD6Q9S&psc=1'
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

export default Painter;
