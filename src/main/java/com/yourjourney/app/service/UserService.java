package com.yourjourney.app.service;

import com.yourjourney.app.exception.ElementNotFoundException;
import com.yourjourney.app.Appuser.User;
import com.yourjourney.app.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserService {

    private UserRepository userRepository;

    public User getAuthenticatedUser(Authentication authentication){
        return (User) authentication.getPrincipal();
    }

    public User findById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new ElementNotFoundException(id));
    }

    public User createUser(User newUser){
        return userRepository.save(newUser);
    }

    public void deleteUser(Long id){
        User user = this.findById(id);
        userRepository.delete(user);
    }
}
