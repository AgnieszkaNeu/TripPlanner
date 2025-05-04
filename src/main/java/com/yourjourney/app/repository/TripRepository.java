package com.yourjourney.app.repository;

import com.yourjourney.app.Appuser.User;
import com.yourjourney.app.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findAllByUser(User user);
}
