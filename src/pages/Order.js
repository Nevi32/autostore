import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Order = () => {
  const { cart, clearCart } = useContext(CartContext);

  const handleOrder = () => {
    const orderDetails = cart.map(item => `${item.alt_description} - $${item.price.toFixed(2)} - ${item.urls.small}`).join('\n');
    fetch('https://ntfy.sh/FloBakery', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: `Order Details:\n${orderDetails}`,
    })
      .then(response => {
        if (response.ok) {
          alert('Order sent successfully!');
          clearCart();
        } else {
          alert('Failed to send order.');
        }
      });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Order Summary</h1>
      <div className="bg-white shadow-md rounded p-4">
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="mb-2">
              {item.alt_description} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <button
          onClick={handleOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Order;
