import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './NotFound';
import AddProductForm from './components/addProductForm';
import AddProduct from './pages/addProduct';
import { useEffect } from 'react';
import Login from "./pages/login";

import useFetch from './hooks/useFetch';
import { useLocation } from "react-router-dom";
import './App.css';

function App() {
  const { data: products = [], loading, error } = useFetch(
    'http://localhost:5000/api/products'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [productList, setProductList] = useState(products);
  const [role, setRole] = useState(localStorage.getItem("userRole"));
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, [location]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = product => {
    setCartItems(prev => [...prev, product]);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Delete failed. Status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Product deleted:", result);

      // Remove the deleted product from your list
      setProductList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };



  if (loading) {
    return <div className="status">Loading products...</div>;
  }

  if (error) {
    return <div className="status error">Error: {error}</div>;
  }

  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={cartItems.length}
        role={role}
        isLoggedIn={!!localStorage.getItem("token")}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <div>
              {role === "admin" ? (
                <AddProductForm onProductAdded={() => window.location.reload()} />
              ) : (
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                  {localStorage.getItem("token")
                    ? "You do not have permission to add products."
                    : "Please log in to add products."}
                </p>
              )}

              {productList.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
              ).length > 0 ? (
                <ProductList
                  products={productList.filter(product =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )}
                  onAddToCart={handleAddToCart}
                  onDelete={role === "admin" ? handleDelete : null}
                  isAdmin={role === "admin"}
                />

              ) : (
                <div className="status">No products found</div>
              )}
            </div>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <div style={{ padding: '2rem', marginTop: '70px', marginBottom: '60px' }}>
              <h1>Shopping Cart</h1>
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul>
                  {cartItems.map((item, idx) => (
                    <li key={idx}>
                      {item.title} – ₹{item.price}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          }
        />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
