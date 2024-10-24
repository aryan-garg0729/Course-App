import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const useCart = () => {
        const [cart, setCart] = useState(() => {
            // Retrieve cart data from local storage or initialize as an empty array
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        });

        useEffect(() => {
            // Save cart data to local storage whenever it changes
            localStorage.setItem('cart', JSON.stringify(cart));
        }, [cart]);

        return [cart, setCart];
    };
    const [cart, setCart] = useCart();
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    };

    return (
        <div className="max-w-2xl mx-auto my-9 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty</p>
            ) : (
                cart.map((item) => (
                    <div key={item._id} className="flex justify-between items-center border-b border-gray-200 py-4">
                        <Link className='hover:text-purple-500' to={`/course/${item._id}`} state={{course:item}}>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-gray-700">Price: ₹{item.price}</p>
                        </Link>
                        <button
                            onClick={() => removeFromCart(item._id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                        >
                            Remove
                        </button>
                    </div>
                ))
            )}
        </div>

    );
};

export default Cart