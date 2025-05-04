package com.yourjourney.app.service;

import com.yourjourney.app.Appuser.User;
import com.yourjourney.app.model.Trip;
import com.yourjourney.app.repository.TripRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TripService {

    private TripRepository tripRepository;

    private User getAuthenticatedUser(Authentication authentication){
        return (User) authentication.getPrincipal();
    }

    public List<Trip> findAllByUser(Authentication authentication){
        User user = getAuthenticatedUser(authentication);
        return tripRepository.findAllByUser(user);
    }

    public Trip findById (Long id){
        return tripRepository.findById(id).orElseThrow(NoSuchFieldError::new);
    }

    public Trip saveTrip(Trip trip, Authentication authentication){
        User user = getAuthenticatedUser(authentication);
        trip.setUser(user);
        return tripRepository.save(trip);
    }

    public void delete(Long id) {
        Trip trip = this.findById(id);
        tripRepository.delete(trip);
    }
}
