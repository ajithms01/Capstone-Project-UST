package com.example.ClientService.feign;

import com.example.ClientService.resources.Event;
import com.example.ClientService.resources.Guest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "Management", url = "http://localhost:9999/api/event", fallback = EventClientFallback.class)
public interface EventClient {


    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event);

    @PutMapping("addGuest")
    public ResponseEntity<Event> addGuestToEvent(@RequestParam Long eventId, @RequestParam List<Guest> guest);

    @GetMapping("/clientId")
    public ResponseEntity<List<Event>> getEventsByClientId(@RequestParam Long userId);
}