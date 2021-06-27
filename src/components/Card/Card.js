import React from 'react';


const Card = (props) => {
    const card = props.card;
    // const totalPrice = card.reduce((total, prd) => total + prd.price, 0);

    let totalPrice = 0;
    for (let i = 0; i < card.length; i++) {
        const pd = card[i];
        totalPrice = totalPrice + pd.price * pd.quantity;
        
    }

    const tax  = totalPrice / 10;
    const Shipping = totalPrice / 10;

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h2>Order Summary</h2>
            <h5>Items ordered : {card.length}</h5>
            <p>Shipping & Handling : ${formatNumber(Shipping)}</p>
            <p>Total before tax : ${formatNumber(totalPrice)} </p>
            <p>Estimated Tax : ${formatNumber(tax)}</p>
            <p>Order Total : $ {formatNumber(totalPrice + tax + Shipping)}</p>
             <br/>
             {
                props.children
             }


        </div>
    );
};

export default Card;