package com.yourjourney.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Trip trip;

    private String name;

    @Column(name="startdate")
    private LocalDateTime startDate;

    @Column(name="enddate")
    private LocalDateTime endDate;

    public Destination(Trip trip, String name, LocalDateTime startDate, LocalDateTime endDate){
        this.trip = trip;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
