import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Your Cart</h1>
      <div className="bg-white shadow-md rounded p-4">
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              {item.alt_description} - ${item.price.toFixed(2)}
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</p>
        </div>
        <Link to="/order">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Proceed to Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;


