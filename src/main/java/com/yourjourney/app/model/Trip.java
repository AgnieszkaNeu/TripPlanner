package com.yourjourney.app.model;

import com.yourjourney.app.Appuser.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String name;

    @Column(name="startdate")
    private LocalDate startDate;

    @Column(name= "enddate")
    private LocalDate endDate;
}
