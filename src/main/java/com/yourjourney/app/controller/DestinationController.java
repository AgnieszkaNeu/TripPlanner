package com.yourjourney.app.controller;

import com.yourjourney.app.dto.DestinationDto;
import com.yourjourney.app.model.Destination;
import com.yourjourney.app.service.DestinationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class DestinationController {

    private DestinationService destinationService;

    @GetMapping("/destination")
    public ResponseEntity<List<Destination>> getAllByTrip(@RequestParam Long tripId){
        return ResponseEntity.ok().body(destinationService.getAllByTrip(tripId));
    }

    @GetMapping("/destination/{id}")
    public ResponseEntity<Destination> findById(@PathVariable Long id){
        return ResponseEntity.ok().body(destinationService.findById(id));
    }

    @PostMapping("/destination")
    public ResponseEntity<Destination> saveDestination(@RequestBody DestinationDto destinationDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(destinationService.saveDestination(destinationDto));
    }

    @DeleteMapping("/destination/{id}")
    public ResponseEntity<Destination> deleteById(@PathVariable Long id){
        destinationService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/destination/{id}")
    public ResponseEntity<String> changeDestinationDetails(@RequestBody DestinationDto destinationDto, @PathVariable Long id){
        destinationService.changeDestinationDetails(destinationDto, id);
        return ResponseEntity.ok().build();
    }
}
