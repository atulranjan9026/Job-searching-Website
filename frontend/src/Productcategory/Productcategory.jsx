import React from 'react';
import { Link } from 'react-router-dom';
import "./seeker.css";

const seeker = () => {
    const products = [
        {
            id: 1,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kw5lpczh7gBHL0Cq-QuEAp0p1LdWxTycKbyvh0n6N5I8BSEY84_n4bVnj5gU6ZhyJbk&usqp=CAU',
            title: 'Painter',
            link: '/painter'
        },
        {
            id: 2,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv0jvE9CjdCTD2Zb655YO0UwxAQRlE0vQ03g&s',
            title: 'Dulux 5580864 White Solvent Wall Paint  (20 L)',
            link: '/gardener'
        },
        {
            id: 3,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXWP_HSDy8A_2tLzmQMhtk-JYTwcKzji8idwQOqUZ5_0CnQU6JjkDVStQJ4Vfu1T6dHQk&usqp=CAU',
            title: 'Dulux 5580864 White Solvent Wall Paint  (20 L)',
            link: '/electrician'
        },
        
        {
            id: 4,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5VPGbhX5xQxcP5oLpAjz2QSPW-lDrKIq3JQ&s',
            title: 'Dulux 5580864 White Solvent Wall Paint  (20 L)',
            link: '/driver'
        },
        {
            id: 5,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnaOGf8dmJdYAsoZ5m7tIAK47UHLsbXPI8w3Dmv85bg0UGEV4eXLcliQoU2DjqHKNlw94&usqp=CAU',
            link: '/cook'
        }
    ];

    return (
        <div>
        <h1 className='product-title'>Product</h1>
        <div className="product-list">
            {products.map((product) => (
                        <Link to={product.link} className="add-to-cart-button">
                <div key={product.id} className="seeker-card">

                    <img src={product.image} alt={product.title} className="product-image" />
                    <div className="product-details">
                        
                    </div>
                </div>
                        </Link>
            ))}
        </div>
        </div>
    );
}

export default seeker;
