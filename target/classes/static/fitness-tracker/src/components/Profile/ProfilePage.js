import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faUserTag, faEdit } from '@fortawesome/free-solid-svg-icons';
import './Profile.css'

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const userId = localStorage.getItem('userId'); // Retrieve logged-in user's ID

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleEditProfile = () => {
    setEditedUser({ ...user });
    setShowModal(true); // Open the modal
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/${userId}`, editedUser);
      setUser(response.data); // Update user data on success
      setShowModal(false); // Close the modal
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h3 className="profile-title">User Profile</h3>
        <div className="profile-details">
          <p>
            <FontAwesomeIcon icon={faUser} /> <strong>Name:</strong> {user.name}
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> {user.email}
          </p>
          <p>
            <FontAwesomeIcon icon={faUserTag} /> <strong>Role:</strong> {user.role}
          </p>
        </div>
        <button className="edit-button" onClick={handleEditProfile}>
          <FontAwesomeIcon icon={faEdit} /> Edit Profile
        </button>
      </div>

      {showModal && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <h5>Edit Profile</h5>
            <form>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={editedUser.password}
                onChange={handleInputChange}
              />
            </form>
            <div className="profile-modal-actions">
              <button className="save-button" onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
