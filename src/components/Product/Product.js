
import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    let showBtn = props.showBtn;
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name"><Link to={"/product/" + key}>{name}</Link> </h4>
                <br />
                <p>by : {seller}</p>
                <p>$ {price}</p>
                <p>Only {stock} left in stock -Order soon</p>
                { 
                showBtn === true &&
                <button className="main-btn" onClick={() => props.handleClick(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to card
                </button>
                }
            </div>

        </div>
    );
};

export default Product;