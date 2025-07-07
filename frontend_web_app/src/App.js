import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page imports (placeholders)
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RequestDonation from './pages/RequestDonation';
import Appointments from './pages/Appointments';
import Map from './pages/Map';
import AdminDashboard from './pages/AdminDashboard';

// PUBLIC_INTERFACE
function App() {
  // Default to dark theme according to requirements
  const [theme, setTheme] = useState('dark');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="App">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="bc-main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/request-donation" element={<RequestDonation />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/map" element={<Map />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
