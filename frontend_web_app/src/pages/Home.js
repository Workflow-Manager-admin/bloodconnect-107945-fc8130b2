import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Home page (landing/hero) for BloodConnect. Briefly introduces service and prompts users.
 */
function Home() {
  return (
    <section className="bc-hero" aria-label="BloodConnect Hero Section">
      <div className="bc-hero-title">BloodConnect</div>
      <div className="bc-hero-tagline">
        Bridging the gap between donors and those in need.<br />
        <span style={{fontWeight: 300, fontSize: '1.07rem', color: '#ffeaea'}}>
          Donate blood, request donations, save lives.
        </span>
      </div>
      <div className="bc-hero-btns">
        <Link to="/register" className="bc-btn bc-btn-primary" style={{marginRight: 12}}>Become a Donor</Link>
        <Link to="/request-donation" className="bc-btn bc-btn-primary" style={{background: '#fff', color:'#d32f2f', border: '2px solid #d32f2f'}}>Request Blood</Link>
      </div>
    </section>
  );
}

export default Home;
