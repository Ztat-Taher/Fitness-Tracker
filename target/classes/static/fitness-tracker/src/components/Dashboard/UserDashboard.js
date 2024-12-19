import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [meals, setMeals] = useState([]);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId'); // Retrieve logged-in user's ID

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        } else {
            fetchUserData();
        }
    }, [userId]);

    const fetchUserData = async () => {
        try {
            setLoading(true);

            // Fetch user details
            const userResponse = await axios.get(`http://localhost:8080/api/users/${userId}`);
            setUser(userResponse.data);

            // Fetch workouts
            const workoutsResponse = await axios.get(`http://localhost:8080/api/workouts/user/${userId}`);
            setWorkouts(workoutsResponse.data);

            // Fetch meals
            const mealsResponse = await axios.get(`http://localhost:8080/api/meals/user/${userId}`);
            setMeals(mealsResponse.data);

            // Fetch progress
            const progressResponse = await axios.get(`http://localhost:8080/api/progress/user/${userId}`);
            setProgress(progressResponse.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="user-dashboard">
            <header className="dashboard-header">
                <h1>Welcome, {user.name}!</h1>
            </header>

            <section className="dashboard-section">
                <h2>Workout Logs</h2>
                {workouts.length > 0 ? (
                    <ul className="workout-list">
                        {workouts.map(workout => (
                            <li key={workout.id}>
                                {workout.workoutType} - {workout.durationMinutes} minutes - {workout.caloriesBurned} calories burned
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No workouts logged yet.</p>
                )}
            </section>

            <section className="dashboard-section">
                <h2>Meal Logs</h2>
                {meals.length > 0 ? (
                    <ul className="meal-list">
                        {meals.map(meal => (
                            <li key={meal.id}>
                                {meal.mealName} - {meal.calories} calories
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No meals logged yet.</p>
                )}
            </section>

            <section className="dashboard-section">
                <h2>Progress</h2>
                {progress.length > 0 ? (
                    <div className="progress-graph">
                        <p>Weight and calorie tracking graph will go here.</p>
                    </div>
                ) : (
                    <p>No progress data available yet.</p>
                )}
            </section>
        </div>
    );
};

export default UserDashboard;
