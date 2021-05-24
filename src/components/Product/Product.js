
import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br />
                <p>by : {seller}</p>
                <p>$ {price}</p>
                <p>Only {stock} left in stock -Order soon</p>
                <button onClick={() => props.handleClick(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to card
                </button>
            </div>

        </div>
    );
};

export default Product;