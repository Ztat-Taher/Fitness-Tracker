package com.fitness.tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitness.tracker.model.Workout;
import com.fitness.tracker.repository.WorkoutRepository;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    // Create
    public Workout createWorkout(Workout workout) {
        return workoutRepository.save(workout);
    }

    // Read
    public List<Workout> getAllWorkouts(Long userId) {
        return workoutRepository.findByUserId(userId);
    }

    public Workout getWorkoutById(Long id) {
        Optional<Workout> workout = workoutRepository.findById(id);
        return workout.orElse(null);  // Return null if workout not found
    }

    // Update
    public Workout updateWorkout(Long id, Workout workoutDetails) {
        Optional<Workout> workoutOptional = workoutRepository.findById(id);
        if (workoutOptional.isPresent()) {
            Workout workout = workoutOptional.get();
            workout.setWorkoutType(workoutDetails.getWorkoutType());
            workout.setDurationMinutes(workoutDetails.getDurationMinutes());
            workout.setCaloriesBurned(workoutDetails.getCaloriesBurned());
            workout.setWorkoutDate(workoutDetails.getWorkoutDate());
            return workoutRepository.save(workout);
        }
        return null;  // Return null if workout not found
    }

    // Delete
    public void deleteWorkout(Long id) {
        workoutRepository.deleteById(id);
    }
}

