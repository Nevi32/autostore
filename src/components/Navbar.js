import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white text-lg font-bold">Flo's Bakery</span>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className={`lg:flex items-center space-x-4 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/category/birthday-cakes" className="text-white hover:text-gray-300">Birthday Cakes</Link>
            </li>
            <li>
              <Link to="/category/wedding-cakes" className="text-white hover:text-gray-300">Wedding Cakes</Link>
            </li>
            <li>
              <Link to="/category/graduation-cakes" className="text-white hover:text-gray-300">Graduation Cakes</Link>
            </li>
          </ul>
          <div className="relative mt-2 lg:mt-0">
            <Link to="/cart" className="text-white hover:text-gray-300">
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-600 text-white text-xs font-bold text-center rounded-full">{cart.length}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



