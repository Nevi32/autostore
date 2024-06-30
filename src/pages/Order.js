import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

const Order = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalAmount);
  }, [cart]);

  const handleOrder = () => {
    const userDetails = `Name: ${name}\nContact: ${contact}`;
    const orderDetails = cart.map(item => `${item.alt_description} - $${item.price}\nImage URL: ${item.urls.small}`).join('\n');
    const message = `New Order from ${name}, Contact: ${contact}\nOrder Details:\n${orderDetails}\nTotal Amount: $${total}`;

    fetch('https://ntfy.sh/FloBakery', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: message,
    })
      .then(response => {
        if (response.ok) {
          alert('Order sent successfully!');
          clearCart();
          setIsOrderPlaced(true);
        } else {
          alert('Failed to send order.');
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && contact) {
      handleOrder();
    } else {
      alert('Please provide your full name and contact information.');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Order Summary</h1>
      <div className="bg-white shadow-md rounded p-4">
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="mb-2">
              {item.alt_description} - ${item.price}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-bold">Total: ${total}</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
              Contact Information
            </label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isOrderPlaced}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;
