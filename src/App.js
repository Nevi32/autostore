import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ItemDetails from './components/ItemDetails';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import CartProvider from './context/CartContext';
import Order from './pages/Order';
import Navbar from './components/Navbar';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/category/:category" element={<Home />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;


