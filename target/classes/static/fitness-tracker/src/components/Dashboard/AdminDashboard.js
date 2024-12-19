import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // CSS file for styling
import { FaUserEdit, FaUserPlus, FaTrash, FaDumbbell, FaUtensils } from 'react-icons/fa';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const adminId = localStorage.getItem('adminId');

  useEffect(() => {
    if (!adminId) {
      navigate('/login');
    } else {
      fetchAdminData();
    }
  }, [adminId]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      const usersResponse = await axios.get('http://localhost:8080/api/users');
      setUsers(usersResponse.data);

      const allWorkouts = [];
      const allMeals = [];

      await Promise.all(
        usersResponse.data.map(async (user) => {
          const userWorkouts = await axios.get(`http://localhost:8080/api/workouts/user/${user.id}`);
          allWorkouts.push(...userWorkouts.data);

          const userMeals = await axios.get(`http://localhost:8080/api/meals/user/${user.id}`);
          allMeals.push(...userMeals.data);
        })
      );

      setWorkouts(allWorkouts);
      setMeals(allMeals);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (userId) => {
    localStorage.setItem('userId', userId);
    navigate(`/profile`);
  };

  const handleAddUser = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewUser({ name: '', email: '', password: '' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users', newUser);
      setUsers([...users, response.data]);
      handleModalClose();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <section className="dashboard-section">
        <h2>Manage Users</h2>
        <div className="user-cards-container">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <div className="user-card-actions">
                <button className="btn btn-primary" onClick={() => handleEditUser(user.id)}>
                  <FaUserEdit /> Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
          <div className="user-card add-user-card" onClick={handleAddUser}>
            <FaUserPlus className="add-icon" />
            <h3>Add User</h3>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="overview-card">
          <FaDumbbell className="overview-icon" />
          <p>Total Workouts: {workouts.length}</p>
        </div>
        <div className="overview-card">
          <FaUtensils className="overview-icon" />
          <p>Total Meals Logged: {meals.length}</p>
        </div>
      </section>

      {showModal && (
        <div className="admin-modal">
          <div className="modal-content">
            <h2>Add New User</h2>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">Add User</button>
              <button type="button" onClick={handleModalClose} className="btn btn-secondary">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
