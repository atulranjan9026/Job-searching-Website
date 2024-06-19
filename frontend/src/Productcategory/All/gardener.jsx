import React from 'react';
import "./all.css";
import { Link } from 'react-router-dom';

const gardener = () => {
  const products = [
    {
      id: 1,
      image: 'https://m.media-amazon.com/images/I/71-4IGXtwGL._SX425_.jpg',
      price: '549',
      link: 'https://www.amazon.in/GARDEN-Spectacular-Gardening-Tools-Gloves/dp/B07D7WGBBR/ref=sr_1_5?crid=18AXAD591RXXG&dib=eyJ2IjoiMSJ9.5ZrjmgYUmuT1KMi1SFhOuvJxy1tdLmxYiYbKPiFrccbeOlJf6gF7LzPIcJ3xHmzucpTS1th-bLPyxlqR_vGylwr9Jnt3WUjl-Bgs3SC3Ewlf0QkszNTCpI94ZmCSiE5btNMbI-32QZ-J3OAZmsk7p8_ci-jy4MsTtGFNfLrRcUJmJefqq2nbo6MPq6x1ZHfkn8KlITX17Sfwbd2mJEb2w_Sk2KCifaTyuHnqXhmt2vahkOAWc-JozIhdxzFp3LoNvs8tw8xZ7hVV6tubOwtmyr9duMRwtksCdXjiBUBkK8w.XNiA1UaDnPiEpQh6-vmIBTlw1wAmBZODrWXDdgcfVIg&dib_tag=se&keywords=gardener+tools&qid=1717668553&sprefix=gardener+%2Caps%2C585&sr=8-5',
      title: 'Kraft Seeds by 10CLUB Gardening Tools Kit - 7 Pcs (Cultivator, Fork, Trowels'
    },
    {
      id: 2,
      image: 'https://m.media-amazon.com/images/I/61Cayhvo0rL._SX342_.jpg',
      title: 'Lazy Gardener Aqua Plant Fertilizers for Money Plant',
      price: '597',
      link: 'https://www.amazon.in/Lazy-Gardener-Aqua-Plant-Food/dp/B0B51K3PVB/ref=sr_1_11?sr=8-11'
    },
    {
      id: 3,
      image: 'https://m.media-amazon.com/images/I/812u3yfN55L._SX342_.jpg',
      title: 'Lazy Gardener Organic Plant Food Greenstix & Bloomstix Combo',
      price: '997',
      link: 'https://www.amazon.in/Lazy-Gardener-GreenStix-BloomStix-Bloom-Booster/dp/B08LD9JN77/ref=sr_1_3_sspa?sr=8-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'
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

export default gardener;
