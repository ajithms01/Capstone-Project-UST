package com.example.ClientService.resources;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    private Long id;
    private String name;
    private Date date;
    private String type;
    private Long userId;
    private List<Long> vendorIds;
    private Long venueId;
    private List<Guest> guestList;
    private Boolean paymentStatus;
    private EventStatus status;
}
