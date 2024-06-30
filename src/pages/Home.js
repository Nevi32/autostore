import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetails from '../components/ItemDetails';

const UNSPLASH_ACCESS_KEY = '3Tl7VVHOUH4pRxykZDtEte3U6yIDcHvl_4VzesT3IOw';

const fetchImages = async (query) => {
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`);
  const data = await response.json();
  return data.results;
};

const Home = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchAllImages = async () => {
      let query = '';
      if (category === 'birthday-cakes') {
        query = 'birthday cakes';
      } else if (category === 'wedding-cakes') {
        query = 'wedding cakes';
      } else if (category === 'graduation-cakes') {
        query = 'graduation cakes';
      } else {
        query = 'cakes';
      }
      const images = await fetchImages(query);
      setItems(images);
      setLoading(false);
    };

    fetchAllImages();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 my-8">
      <h2 className="text-3xl font-bold mb-4">
        {category ? category.replace('-', ' ').toUpperCase() : 'ALL CAKES'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded p-4 cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <img src={item.urls.small} alt={item.alt_description} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2">{item.alt_description}</h3>
            <p className="mt-1">Gluten-free, Pure Organic, No Additives</p>
          </div>
        ))}
      </div>
      {selectedItem && <ItemDetails item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};

export default Home;

