import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Navbar for BloodConnect — provides navigation links, site name, and theme toggle.
 * Uses brand color scheme (primary: #d32f2f, secondary: #fff, accent: #000).
 * @param {string} theme - Current theme ("light" | "dark")
 * @param {function} toggleTheme - Function to toggle theme
 */
function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="bc-navbar" role="navigation" aria-label="Primary navigation">
      <div className="nav-left">
        <NavLink to="/" className="nav-link" style={{ fontWeight: 700, fontSize: '1.26rem', letterSpacing: '1px' }}>
          BloodConnect
        </NavLink>
      </div>
      <div className="nav-links" aria-label="Main site links">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/register" className="nav-link">Register</NavLink>
        <NavLink to="/login" className="nav-link">Login</NavLink>
        <NavLink to="/profile" className="nav-link">Profile</NavLink>
        <NavLink to="/request-donation" className="nav-link">Request Donation</NavLink>
        <NavLink to="/appointments" className="nav-link">Appointments</NavLink>
        <NavLink to="/map" className="nav-link">Map</NavLink>
        <NavLink to="/admin" className="nav-link">Admin Dashboard</NavLink>
      </div>
      <button
        className="theme-toggle"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        onClick={toggleTheme}
        tabIndex={0}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </nav>
  )
}

export default Navbar;
