package com.yourjourney.app.mapper;

import com.yourjourney.app.dto.DestinationDto;
import com.yourjourney.app.exception.ElementNotFoundException;
import com.yourjourney.app.model.Destination;
import com.yourjourney.app.model.Trip;
import com.yourjourney.app.repository.TripRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class DestinationMapper {

    TripRepository tripRepository;

    public Destination dtoToModel(DestinationDto destinationDto){
        Trip trip = tripRepository.findById(destinationDto.tripId()).orElseThrow(() -> new ElementNotFoundException(destinationDto.tripId()));
        return new Destination(trip, destinationDto.name(), destinationDto.startDate(),destinationDto.endDate());
    }
}
