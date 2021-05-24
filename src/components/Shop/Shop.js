import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Card from '../Card/Card';

const Shop = () => {
   const first10 = fakeData.slice(0, 10);
   const [products, setProducts] = useState(first10);

   const [card, setCard] = useState([])
   
   const handleClick = (product) => { 
       const newCard = [...card, product]
       setCard(newCard)
   }

    return (
        <div className='shop-container'>
           <div className="product-container">
               {
               products.map(product => <Product
                 handleClick={handleClick}
                 product={product}>
                 </Product>)
                }
           </div>
           <div className="card-container">
               <Card card ={card}></Card>
           </div>
            
        </div>
    );
};

export default Shop;