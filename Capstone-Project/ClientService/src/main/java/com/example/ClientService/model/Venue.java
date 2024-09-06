package com.example.ClientService.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "venueId")
    private Long venueId;
    private String venueName;
    private String location;
    private float rent;
    private Long capacity;
    @ElementCollection
    private List<Date> bookedDates;
    private String address;
}
