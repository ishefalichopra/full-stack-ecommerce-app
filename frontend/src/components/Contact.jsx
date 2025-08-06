import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Contact.css";

function Contact({ searchTerm, onSearchChange, cartCount }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    let errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Email is invalid";
    }
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Simulate submission (can later connect to backend here)
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        cartCount={cartCount}
      />
      <main className="contact-wrapper">
        <h1>Contact Us</h1>
        <p>Have questions or need help? We're here for you!</p>

        {submitted && <div className="success-message">Thank you! We'll be in touch soon.</div>}

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          {errors.name && <p className="form-error">{errors.name}</p>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
          ></textarea>
          {errors.message && <p className="form-error">{errors.message}</p>}

          <button type="submit">Send Message</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
