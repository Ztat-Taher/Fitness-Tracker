package com.fitness.tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitness.tracker.model.User;
import com.fitness.tracker.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Create
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Read
    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);  // Return null if user not found
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);  // Custom query from UserRepository
    }

    // Update
    public User updateUser(Long id, User userDetails) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword());
            user.setRole(userDetails.getRole());
            user.setCalorieGoal(userDetails.getCalorieGoal());
            user.setWeightGoal(userDetails.getWeightGoal());
            return userRepository.save(user);
        }
        return null;  // Return null if user not found
    }

    // Delete
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

	public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
