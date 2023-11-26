import React from 'react';
import { Link } from 'react-router-dom';
import "./contact.css"
const ContactUsPage = () => {
  const openNavbar = () => {
    // Define your openNavbar function here
  };

  const handleSubmit = (event) => {
    // Define your form submission handling logic here
    event.preventDefault();
    // Example: Get form data
    const formData = new FormData(event.target);
    // Perform actions with form data
  };

  return (
    <div>
      {/* Header section */}
      

      {/* Banner section */}
      <section className="banner">
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230822131732/images.png" alt="Welcome to our Contact Us page" />
        <h1>Get in Touch With Us</h1>
        <p>We are here to answer any questions you may have.</p>
      </section>

      {/* Contact form */}
      <section className="contact-form">
        <div className="form-container">
          <h2>Your Details</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="phone">Phone: </label>
            <input type="tel" id="phone" name="phone" />

            <label htmlFor="message">Message: </label>
            <textarea id="message" name="message" rows="4" required></textarea>

            <button type="submit" className="submit-button">Submit</button>
          </form>
          <div className="policy">
            <h2>Privacy Policy</h2>
            <p>We value your privacy. Please review our <a href="/privacy-policy">Privacy Policy</a> for more information.</p>
          </div>
        </div>
      </section>

      {/* Company contact info */}
      <section className="contact-info">
        <h2>Contact Information</h2>
        <address>
          The Vision<br />
          123 Main Street<br />
          City, State Zip Code<br />
          Phone: <Link href="">123-456-7890</Link><br />
          Email: <Link  href="">visionthenews@gmail.com</Link>
        </address>
      </section>

      {/* Footer section */}
      
    </div>
  );
};

export default ContactUsPage;
