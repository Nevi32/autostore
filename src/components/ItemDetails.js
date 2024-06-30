import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const UNSPLASH_ACCESS_KEY = '3Tl7VVHOUH4pRxykZDtEte3U6yIDcHvl_4VzesT3IOw';

const fetchItemDetails = async (id) => {
  const response = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${UNSPLASH_ACCESS_KEY}`);
  const data = await response.json();
  return data;
};

const ItemDetails = ({ item, onClose }) => {
  const [itemDetails, setItemDetails] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      const details = await fetchItemDetails(item.id);
      setItemDetails(details);
    };
    fetchData();
  }, [item]);

  if (!itemDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md max-w-lg relative">
        <button className="absolute top-0 right-0 m-4" onClick={onClose}>Close</button>
        <img src={itemDetails.urls.regular} alt={itemDetails.alt_description} className="w-full h-64 object-cover rounded" />
        <h1 className="text-2xl font-bold mt-4">{itemDetails.alt_description}</h1>
        <p className="mt-2">Gluten-free, Pure Organic, No Additives</p>
        <p className="mt-2 text-lg font-bold">Price: $9.99</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={() => {
            addToCart({ ...itemDetails, price: 9.99 });
            onClose();
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;

