import React from 'react';
import './Home.css'; // Custom styles for the page
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section with Smooth Fade-in Animation */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h1>Welcome to Empowering Sustainability</h1>
        <p>Join us in revolutionizing waste management with blockchain technology.</p>
        <motion.button 
          className="cta-button"
          whileHover={{ scale: 1.1, backgroundColor: "#ffa726" }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <section className="features">
        <motion.div
          className="feature-card"
          whileHover={{ scale: 1.05 }} // Optional: Scale up slightly on hover
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <h2>Track Plastic Waste</h2>
          <p>Use blockchain to monitor plastic waste across the globe.</p>
        </motion.div>
        <motion.div
          className="feature-card"
          whileHover={{ scale: 1.05 }} // Optional: Scale up slightly on hover
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <h2>Earn Rewards for Recycling</h2>
          <p>Receive incentives for contributing to sustainable recycling practices.</p>
        </motion.div>
        <motion.div
          className="feature-card"
          whileHover={{ scale: 1.05 }} // Optional: Scale up slightly on hover
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <h2>Transparent Supply Chains</h2>
          <p>Ensure waste is recycled ethically and transparently using blockchain.</p>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
