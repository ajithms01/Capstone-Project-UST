package com.example.ClientService.service;

import com.example.ClientService.Exceptions.UserNotFoundException;
import com.example.ClientService.dtos.ClientLoginDto;
import com.example.ClientService.model.User;
import com.example.ClientService.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User updateProfile(Long userId, User updatedUser) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId)); // Custom exception
        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        return userRepository.save(existingUser);
    }


    public User getClientById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }



    public User saveClient(User user) {
        return userRepository.save(user);
    }


    public User getUserInfo(String username) {
        return userRepository.findByUsername(username);
    }
}
