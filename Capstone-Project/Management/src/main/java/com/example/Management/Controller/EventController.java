package com.example.Management.Controller;

import com.example.Management.Client.FullResponse;
import com.example.Management.Model.Event;
import com.example.Management.Model.Guest;
import com.example.Management.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/event")
public class EventController {
    @Autowired
    private EventService eventService;

//    Display the list of events.
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok().body(eventService.getAllEvents());
    }


//    Delete an event
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

//    Create an event
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {

        return ResponseEntity.ok().body(eventService.createEvent(event));
    }

//    Display events filtered by category
    @GetMapping("/eventType")
    public ResponseEntity<List<Event>> getEventsByType(@RequestParam String eventType) {
        return ResponseEntity.ok().body(eventService.getEventsByType(eventType));
    }

//    Display events on a particular date
    @GetMapping("/eventDate")
    public ResponseEntity<List<Event>> getEventsByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok().body(eventService.getEventsByDate(date));
    }

// Add guest to an event
    @PutMapping("addGuest")
    public ResponseEntity<Event> addGuestToEvent(@RequestParam Long eventId, @RequestParam List<Guest> guest) {
        return ResponseEntity.ok().body(eventService.addGuestToEvent(eventId, guest));
    }

//Display full details of an event
    @GetMapping("/{eventId}")
    public ResponseEntity<FullResponse> eventDetails(@RequestParam Long eventId){
        return ResponseEntity.ok().body(eventService.eventDetails(eventId));
    }

//    Display details of an event with information of a particular vendor To send purchase order
    @GetMapping("/{eventId}/{vendorId}")
    public ResponseEntity<FullResponse> sendOrder(@RequestParam Long eventId, @RequestParam Long vendorId){
        return ResponseEntity.ok().body(eventService.sendOrder(eventId, vendorId));
    }

    @GetMapping("/clientId")
    public ResponseEntity<List<Event>> getEventsByClientId(@RequestParam Long userId) {
        return ResponseEntity.ok().body(eventService.getEventsByClientId(userId));
    }
}
