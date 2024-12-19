package com.fitness.tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitness.tracker.model.Meal;
import com.fitness.tracker.repository.MealRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MealService {

    @Autowired
    private MealRepository mealRepository;

    // Create
    public Meal createMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    // Read
    public List<Meal> getAllMeals(Long userId) {
        return mealRepository.findByUserId(userId);
    }

    public Meal getMealById(Long id) {
        Optional<Meal> meal = mealRepository.findById(id);
        return meal.orElse(null);  // Return null if meal not found
    }

    // Update
    public Meal updateMeal(Long id, Meal mealDetails) {
        Optional<Meal> mealOptional = mealRepository.findById(id);
        if (mealOptional.isPresent()) {
            Meal meal = mealOptional.get();
            meal.setMealName(mealDetails.getMealName());
            meal.setCalories(mealDetails.getCalories());
            meal.setMealDate(mealDetails.getMealDate());
            return mealRepository.save(meal);
        }
        return null;  // Return null if meal not found
    }

    // Delete
    public void deleteMeal(Long id) {
        mealRepository.deleteById(id);
    }
}
