// ItemCard.js

import React from 'react';

const ItemCard = ({ item, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={item.imageUrl?.regular} // Optional chaining to handle undefined item.imageUrl
        alt={item.title}
        className="h-64 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{item.title}</h2>
        <p className="text-gray-700 mb-2">{item.description}</p>
        <p className="text-gray-600">{item.tags.join(', ')}</p>
        <p className="mt-2 text-lg font-bold">${item.price}</p>
        <button
          onClick={onClick}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
