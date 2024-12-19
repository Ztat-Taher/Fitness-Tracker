import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import LoginPage from './components/Auth/LoginPage';
import SignUpPage from './components/Auth/SignUpPage';
import ProfilePage from './components/Profile/ProfilePage';
import WorkoutPage from './components/Workouts/WorkoutPage';
import MealPage from './components/Meals/MealPage';
import LogoutPage from './components/Auth/Logout';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import UserDashboard from './components/Dashboard/UserDashboard';
import HomePage from './components/Shared/Home';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/workouts" element={<WorkoutPage />} />
        <Route path="/meals" element={<MealPage />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/user" element={<UserDashboard/>} />
      </Routes>
    </>
  );
};

export default App;
