package com.yourjourney.app.service;

import com.yourjourney.app.dto.DestinationDto;
import com.yourjourney.app.exception.ElementNotFoundException;
import com.yourjourney.app.mapper.DestinationMapper;
import com.yourjourney.app.model.Destination;
import com.yourjourney.app.model.Trip;
import com.yourjourney.app.repository.DestinationRepository;
import com.yourjourney.app.repository.TripRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DestinationService {

    private DestinationRepository destinationRepository;
    private TripRepository tripRepository;
    private DestinationMapper destinationMapper;

    public List<Destination> getAllByTrip (Long tripId){
        Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new ElementNotFoundException(tripId));
        return destinationRepository.findAllByTrip(trip);
    }

    public Destination findById(Long id){
        return destinationRepository.findById(id).orElseThrow(() -> new ElementNotFoundException(id));
    }

    public Destination saveDestination(DestinationDto destinationDto){
        Destination destination = destinationMapper.dtoToModel(destinationDto);
        return destinationRepository.save(destination);
    }

    public void deleteById(Long id) {
        destinationRepository.deleteById(id);
    }

    public void changeDestinationDetails(DestinationDto destinationDto, Long id) {
        Destination destination = destinationRepository.findById(id).orElseThrow(() -> new ElementNotFoundException(id));
        if(destinationDto.name()!=""){
            destination.setName(destinationDto.name());
        }
        if(destinationDto.startDate()!=null){
            destination.setStartDate(destinationDto.startDate());
        }
        if(destinationDto.endDate()!=null){
            destination.setEndDate(destinationDto.endDate());
        }
        destinationRepository.save(destination);
    }
}
