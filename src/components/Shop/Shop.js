import React, { useEffect, useState } from 'react';
import './Shop.css';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Card from '../Card/Card';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
   const first10 = fakeData.slice(0, 10);
   const [products, setProducts] = useState(first10);

   const [card, setCard] = useState([]);

   useEffect(() => {
    const saveCard = getDatabaseCart() ;
    const productKey = Object.keys(saveCard);
    const cardProduct = productKey.map(existingKey => {
        const product = fakeData.find(data => data.key === existingKey);
        product.quantity = saveCard[existingKey];
        return product;
    })
    setCard(cardProduct);
}, []);
   
const handleClick = (product) => { 
    const toBeAddedKey = product.key;
    const sameProduct  = card.find(pd => pd.key === toBeAddedKey);
    let count = 1 ;
    let newCard;
    if(sameProduct){
        count = sameProduct.quantity + 1;
        sameProduct.quantity = count;
        const other = card.filter(pd => pd.key !== toBeAddedKey);
        newCard =[...other, product];
    }
    else{
       product.quantity = 1; 
       newCard  = [...card, product];
    }
       setCard(newCard);
       addToDatabaseCart(product.key, count);
   };

   

    return (
        <div className='twin-container'>
           <div className="product-container">
               {
               products.map(product => <Product
               key={product.key}
                showBtn ={true}
                 handleClick={handleClick}
                 product={product}>
                 </Product>)
                }
           </div>
           <div className="card-container">
               
               <Card card ={card}>
                    <Link to="/review"><button className="main-btn"> Review Order</button></Link>
               </Card>
           </div>
            
        </div>
    );
};

export default Shop;