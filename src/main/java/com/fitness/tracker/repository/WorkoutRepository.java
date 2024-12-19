package com.fitness.tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.fitness.tracker.model.Workout;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUserId(long userId);
}
