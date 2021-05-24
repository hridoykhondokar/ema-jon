import React from 'react';

const Card = (props) => {
    const card = props.card
    const totalPrice = card.reduce((total, prd) => total + prd.price, 0);

    const tax  = totalPrice / 5;
    const Shipping = totalPrice / 2;

    return (
        <div>
            <h2>Order Summary</h2>
            <h5>Items ordered : {card.length}</h5>
            <p>Items : {card.length}</p>
            <p>Shipping & Handling : ${Shipping}</p>
            <p>Total before tax : ${totalPrice} </p>
            <p>Estimated Tax : ${tax}</p>
            <p>Order Total : $ {totalPrice + tax + Shipping}</p>
            


        </div>
    );
};

export default Card;