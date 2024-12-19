import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faFire, faCalendarAlt, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Meals.css';

const MealPage = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [mealDate, setMealDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editedMeal, setEditedMeal] = useState({});
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/meals/user/${userId}`);
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals', error);
      }
    };

    fetchMeals();
  }, [userId]);

  const handleAddMeal = async () => {
    try {
      const newMeal = {
        mealName,
        calories: parseInt(calories),
        mealDate,
        user: { id: parseInt(userId) },
      };

      const response = await axios.post('http://localhost:8080/api/meals', newMeal);
      setMeals([...meals, response.data]);
      setMealName('');
      setCalories('');
      setMealDate('');
    } catch (error) {
      console.error('Error adding meal', error);
      alert('Failed to add meal. Ensure all fields are correctly filled.');
    }
  };

  const handleEditMeal = (meal) => {
    setEditedMeal(meal);
    setMealName(meal.mealName);
    setCalories(meal.calories);
    setMealDate(meal.mealDate);
    setShowModal(true);
  };

  const handleSaveEditedMeal = async () => {
    try {
      const updatedMeal = { ...editedMeal, mealName, calories: parseInt(calories), mealDate };
      const response = await axios.put(`http://localhost:8080/api/meals/${editedMeal.id}`, updatedMeal);
      setMeals(meals.map(meal => (meal.id === editedMeal.id ? response.data : meal)));
      setShowModal(false);
      alert('Meal updated successfully!');
    } catch (error) {
      console.error('Error updating meal', error);
      alert('Failed to update meal. Please try again.');
    }
  };

  const handleDeleteMeal = async (mealId) => {
    try {
      await axios.delete(`http://localhost:8080/api/meals/${mealId}`);
      setMeals(meals.filter(meal => meal.id !== mealId));
    } catch (error) {
      console.error('Error deleting meal', error);
      alert('Failed to delete meal. Please try again.');
    }
  };

  return (
    <div className="meal-container">
      <div className="meal-card">
        <h3 className="meal-title">Meal Tracker</h3>
        <div className="meal-form">
          <input
            type="text"
            placeholder="Meal Name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          <input
            type="date"
            value={mealDate}
            onChange={(e) => setMealDate(e.target.value)}
          />
          <button onClick={handleAddMeal}>Add Meal</button>
        </div>
      </div>

      <div className="meal-list">
        <h4>Your Meals</h4>
        {meals.map((meal) => (
          <div key={meal.id} className="meal-item">
            <h5>
              <FontAwesomeIcon icon={faHamburger} /> {meal.mealName}
            </h5>
            <p>
              <FontAwesomeIcon icon={faFire} /> {meal.calories} calories
            </p>
            <p>
              <FontAwesomeIcon icon={faCalendarAlt} /> {meal.mealDate}
            </p>
            <div className="meal-actions">
              <button className="edit-button" onClick={() => handleEditMeal(meal)}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteMeal(meal.id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="meal-modal">
          <div className="modal-content">
            <h5>Edit Meal</h5>
            <input
              type="text"
              name="mealName"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
            <input
              type="number"
              name="calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
            <input
              type="date"
              name="mealDate"
              value={mealDate}
              onChange={(e) => setMealDate(e.target.value)}
            />
            <div className="modal-actions">
              <button className="save-button" onClick={handleSaveEditedMeal}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPage;
