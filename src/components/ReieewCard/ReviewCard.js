import React from 'react';
import './ReviewCard.css';

const ReviewCard = (props) => {
    const {name, quantity, key, price} = props.product;
    return (
        <div>
           <div className="review-items">
           <h4 className="product-name">{name}</h4>
            <p>Quantity : {quantity}</p>
            <p><small>${price}</small></p>
            <br />
            <button onClick = {() => props.removeProduct(key)} className="main-btn">Remove</button>
           </div>

        </div>
    );
};

export default ReviewCard;