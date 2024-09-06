package com.example.Management.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Date date;
    private String type;
    private Long userId;
    private List<Long> vendorIds;
    private Long venueId;
    @Transient
    private List<Guest> guestList;
    private Boolean paymentStatus;
    @Enumerated(EnumType.STRING)
    private EventStatus status;

}
