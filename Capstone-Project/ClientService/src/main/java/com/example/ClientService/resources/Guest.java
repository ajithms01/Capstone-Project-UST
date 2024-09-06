package com.example.ClientService.resources;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Guest {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long guestId;
    private String guestName;
    private String guestEmail;
    private String guestPhone;
    private Long eventId;

}