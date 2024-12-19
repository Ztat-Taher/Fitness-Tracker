import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faClock, faFire, faCalendarAlt, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Workouts.css';

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutType, setWorkoutType] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [workoutDate, setWorkoutDate] = useState('');
  const [editWorkout, setEditWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/workouts/user/${userId}`);
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workouts', error);
      }
    };

    fetchWorkouts();
  }, [userId]);

  const handleAddWorkout = async () => {
    try {
      const newWorkout = {
        workoutType,
        durationMinutes: parseInt(durationMinutes),
        caloriesBurned: parseInt(caloriesBurned),
        workoutDate,
        user: { id: parseInt(userId) },
      };

      const response = await axios.post('http://localhost:8080/api/workouts', newWorkout);
      setWorkouts([...workouts, response.data]);
      setWorkoutType('');
      setDurationMinutes('');
      setCaloriesBurned('');
      setWorkoutDate('');
    } catch (error) {
      console.error('Error adding workout', error);
      alert('Failed to add workout. Ensure all fields are correctly filled.');
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      await axios.delete(`http://localhost:8080/api/workouts/${workoutId}`);
      setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
    } catch (error) {
      console.error('Error deleting workout', error);
      alert('Failed to delete workout. Please try again.');
    }
  };

  const handleEditWorkout = (workout) => {
    setEditWorkout(workout);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/workouts/${editWorkout.id}`,
        editWorkout
      );
      setWorkouts(
        workouts.map((workout) => (workout.id === editWorkout.id ? response.data : workout))
      );
      setShowModal(false);
    } catch (error) {
      console.error('Error editing workout', error);
      alert('Failed to edit workout. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditWorkout({ ...editWorkout, [name]: value });
  };

  return (
    <div className="workout-container">
      <div className="workout-card">
        <h3 className="workout-title">Workout Tracker</h3>
        <div className="workout-form">
          <input
            type="text"
            placeholder="Workout Type"
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
          />
          <input
            type="number"
            placeholder="Calories Burned"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
          />
          <input
            type="date"
            value={workoutDate}
            onChange={(e) => setWorkoutDate(e.target.value)}
          />
          <button onClick={handleAddWorkout}>Add Workout</button>
        </div>
      </div>

      <div className="workout-list">
        <h4>Your Workouts</h4>
        {workouts.map((workout) => (
          <div key={workout.id} className="workout-item">
            <h5>
              <FontAwesomeIcon icon={faDumbbell} /> {workout.workoutType}
            </h5>
            <p>
              <FontAwesomeIcon icon={faClock} /> {workout.durationMinutes} minutes
            </p>
            <p>
              <FontAwesomeIcon icon={faFire} /> {workout.caloriesBurned} calories
            </p>
            <p>
              <FontAwesomeIcon icon={faCalendarAlt} /> {workout.workoutDate}
            </p>
            <div className="workout-actions">
              <button className="edit-button" onClick={() => handleEditWorkout(workout)}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteWorkout(workout.id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h5>Edit Workout</h5>
            <input
              type="text"
              name="workoutType"
              value={editWorkout.workoutType}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="durationMinutes"
              value={editWorkout.durationMinutes}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="caloriesBurned"
              value={editWorkout.caloriesBurned}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="workoutDate"
              value={editWorkout.workoutDate}
              onChange={handleInputChange}
            />
            <div className="modal-actions">
              <button className="save-button" onClick={handleSaveEdit}>
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

export default WorkoutPage;
