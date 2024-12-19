package com.fitness.tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.fitness.tracker.model.Meal;

public interface MealRepository extends JpaRepository<Meal, Long> {
    List<Meal> findByUserId(long userId);
}

