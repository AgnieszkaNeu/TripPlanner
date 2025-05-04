package com.yourjourney.app.repository;

import com.yourjourney.app.model.Destination;
import com.yourjourney.app.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
    List<Destination> findAllByTrip(Trip trip);
}
