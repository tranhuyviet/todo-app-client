import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { setCartItems } from '../../Apollo/cache';
import CartItem from '../../components/CartItem/CartItem';

const CartPage = () => {
    const cartItems = useReactiveVar(setCartItems);
    console.log('CART ITEMS FROM CART PAGE: ', cartItems);
    return (
        <div>
            <h1>This is cart page</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 500 }}>
                    {cartItems.length === 0 ? (
                        <p>No item in cart</p>
                    ) : (
                        cartItems.map((item) => <CartItem key={item._id} item={item} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;
