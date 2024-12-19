import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/email/${email}`);
      const user = response.data;

      if (!user) {
        alert('User not found. Please check your email.');
        return;
      }

      if (user.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
      }

      if (user.role === 'ADMIN') {
        navigate(`/admin`);
        localStorage.setItem('adminId', user.id);
      } else if (user.role === 'USER') {
        navigate(`/profile`);
        localStorage.setItem('userId', user.id);
      } else {
        alert('Unknown role. Contact support.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Log in to your account</p>
        <div className="login-input-group">
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>
        </div>
        <button onClick={handleLogin} className="login-button">
          <FontAwesomeIcon icon={faSignInAlt} className="button-icon" />
          Login
        </button>
        <p className="login-footer">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
