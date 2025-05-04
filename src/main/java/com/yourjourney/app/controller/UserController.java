package com.yourjourney.app.controller;

import com.yourjourney.app.Appuser.User;
import com.yourjourney.app.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class UserController {

    UserService userService;

    @GetMapping("/user")
    public ResponseEntity<User> getAuthenticatedUser(Authentication authentication){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAuthenticatedUser(authentication));
    }

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(user));
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
