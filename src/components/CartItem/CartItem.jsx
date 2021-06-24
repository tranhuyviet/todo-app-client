import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { setCartItems } from '../../Apollo/cache';
import { GET_TODO } from '../../Apollo/Graphql/queries';
import './CartItem.css';

const CartItem = ({ item }) => {
    const { data, loading, error } = useQuery(GET_TODO, { variables: { _id: item._id } });
    const cartItems = useReactiveVar(setCartItems);

    const cartItem = cartItems.find((it) => it._id === item._id);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    console.log('ITEM', cartItem);
    console.log('DATA', data);

    const handleQuantityDecrement = () => {
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            setCartItems([...cartItems]);
        } else {
            const removedCartItem = cartItems.filter((it) => it._id !== item._id);
            setCartItems([...removedCartItem]);
        }
    };

    const handleQuantityIncrement = () => {
        cartItem.quantity += 1;
        setCartItems([...cartItems]);
    };

    return (
        <div className="cartItem">
            <h2 className={`${data.getTodo.status === true ? 'active' : ''}`}>{data.getTodo.title}</h2>
            <div className="quantityContainer">
                <button onClick={handleQuantityDecrement}>-</button>
                <h3 className="quantity">{item.quantity}</h3>
                <button onClick={handleQuantityIncrement}>+</button>
            </div>
        </div>
    );
};

export default CartItem;
