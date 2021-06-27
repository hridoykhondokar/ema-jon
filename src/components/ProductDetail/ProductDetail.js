import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams()
    const product = fakeData.find(pd => pd.key === productKey);
    useEffect(() => {

    })
    return (
        <div>
           <Product showBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;