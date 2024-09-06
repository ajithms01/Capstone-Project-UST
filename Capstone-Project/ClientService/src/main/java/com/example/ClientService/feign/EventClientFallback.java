package com.example.ClientService.feign;

import com.example.ClientService.resources.Event;
import com.example.ClientService.resources.Guest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collections;
import java.util.List;

@Component
public class EventClientFallback implements EventClient {

    @Override
    public ResponseEntity<List<Event>> getEventsByClientId(@RequestParam Long userId){
        // Return default value or handle error appropriately
        return (ResponseEntity<List<Event>>) Collections.emptyList();
    }

    @Override
    public ResponseEntity<Event> createEvent(Event event) {
        // Handle fallback for create event
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
    }
    @Override
    public ResponseEntity<Event> addGuestToEvent(@RequestParam Long eventId, @RequestParam List<Guest> guest){
        // Handle fallback for adding guest to event
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
    }

}
