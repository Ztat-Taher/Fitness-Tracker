import React from 'react';
import { FaRunning, FaWeightHanging, FaUtensils } from 'react-icons/fa';
import "./Home.css"

const Homepage = () => {
  return (
    <div className="home-container">

      <section className="hero">
        <div className="hero-text">
          <h1>Track Your Fitness Journey</h1>
          <p>Your personalized fitness tracker for workouts, meals, and progress.</p>
          <a href="/logout" className="cta-btn">Start Now</a>
        </div>
        <img src="https://via.placeholder.com/600x400" alt="Fitness Tracker" className="hero-img" />
      </section>

      <section id="features" className="features">
        <h2>Features</h2>
        <div className="feature-card">
          <FaRunning className="icon" />
          <h3>Track Workouts</h3>
          <p>Log your exercises, set goals, and monitor your progress.</p>
        </div>
        <div className="feature-card">
          <FaWeightHanging className="icon" />
          <h3>Track Meals</h3>
          <p>Log your meals, track calories, and maintain your diet plan.</p>
        </div>
        <div className="feature-card">
          <FaUtensils className="icon" />
          <h3>Meal Plans</h3>
          <p>Get meal suggestions tailored to your fitness goals.</p>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About Us</h2>
        <p>FitTrack is the ultimate fitness companion designed to help you stay motivated and healthy. Track your workouts, meals, and progress all in one place.</p>
      </section>
    </div>
  );
};

export default Homepage;
