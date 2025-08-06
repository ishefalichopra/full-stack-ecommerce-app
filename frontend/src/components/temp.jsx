import React, { useState } from 'react';

const AddProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    images: [''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: [e.target.value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Product added!');
        onProductAdded?.(data); // optional refresh
      } else {
        alert('❌ Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="price">Price:</label>
      <input
        id="price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <input
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="image">Image URL:</label>
      <input
        id="image"
        name="images"
        value={formData.images[0]}
        onChange={handleImageChange}
        required
      />

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
