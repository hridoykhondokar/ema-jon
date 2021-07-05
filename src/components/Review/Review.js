import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewCard from '../ReieewCard/ReviewCard';
import Card from '../Card/Card';
import './Review.css';
import HappyImages from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [card, setCard] = useState([]);

    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory()

    const handlePlaceOrder = () =>{
        history.push("/shipment")
    }

    const removeProduct = (productKey) => {
        const newCard = card.filter(pd => pd.key !== productKey);
        setCard(newCard);
       removeFromDatabaseCart(productKey)
   };

    useEffect(() => {
        const saveCart= getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const cartProduct = productKey.map(key => {
            const product = fakeData.find(data => data.key === key)
            product.quantity = saveCart[key];
            return product 
        });
        setCard(cartProduct);
    }, []);

    let thankyou; 
    if(orderPlaced){
    thankyou = <img src ={HappyImages} alt=""/>
    
    }
    
    return (
        <div className='twin-container'>

         <div className="product-container">
         {
                card.map(pd => <ReviewCard 
                    key={pd.key} 
                    product={pd}
                    removeProduct = {removeProduct} 
                    >
                       
                    </ReviewCard>)
            }
            { thankyou }
         </div>
            
            <div className="card-container">
               <Card card ={card} >
               <button onClick ={handlePlaceOrder} className="main-btn"> Proceed Checkout</button>
               </Card>
           </div>
        </div>
    );
};

export default Review;