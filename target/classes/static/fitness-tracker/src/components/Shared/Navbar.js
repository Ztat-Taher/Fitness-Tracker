import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const adminId = localStorage.getItem('adminId');

  // Conditionally render the navbar based on user's role
  const renderNavbar = () => {
    if (userId) {
      // If user is logged in as a regular user
      return (
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link to="/" className="navbar-brand text-white">
            <img 
              src='./../drawable/FITNESS TRACKER.png' 
              alt="Fitness Tracker Logo" 
              className="navbar-logo"
            />
            Fitness Tracker
          </Link>
          <div className="d-flex gap-3">
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/workouts" className="nav-link">Workouts</Link>
            <Link to="/meals" className="nav-link">Meals</Link>
            <Link to="/logout" className="nav-link">Logout</Link>
          </div>
        </div>
      );
    } else if (adminId) {
      // If user is logged in as an admin
      return (
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link to="/" className="navbar-brand text-white">Fitness Tracker</Link>
          <div className="d-flex gap-3">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/admin" className="nav-link">Admin Dashboard</Link>
            <Link to="/logout" className="nav-link">Logout</Link>
          </div>
        </div>
      );
    } else {
      // If no user is logged in, show login and signup links
      return (
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link to="/" className="navbar-brand text-white">Fitness Tracker</Link>
          <div className="d-flex gap-3">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </div>
        </div>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        {renderNavbar()}
      </div>
    </nav>
  );
};

export default Navbar;