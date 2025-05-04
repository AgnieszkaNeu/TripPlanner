package com.yourjourney.app.controller;

import com.yourjourney.app.model.Trip;
import com.yourjourney.app.service.TripService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class TripController {

    private TripService tripService;

    @GetMapping("/trip")
    public ResponseEntity<List<Trip>> findAllByUser(Authentication authentication){
        return ResponseEntity.status(HttpStatus.OK).body(tripService.findAllByUser(authentication));
    }

    @GetMapping("/trip/{id}")
    public ResponseEntity<Trip> findById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(tripService.findById(id));
    }

    @PostMapping("/trip")
    public ResponseEntity<Trip> save(@RequestBody Trip trip, Authentication authentication){
        return ResponseEntity.status(HttpStatus.CREATED).body(tripService.saveTrip(trip, authentication));
    }

    @DeleteMapping("/trip/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        tripService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
