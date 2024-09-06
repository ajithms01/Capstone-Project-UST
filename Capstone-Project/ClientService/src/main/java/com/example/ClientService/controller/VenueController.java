package com.example.ClientService.controller;

import com.example.ClientService.model.Vendor;
import com.example.ClientService.model.Venue;
import com.example.ClientService.service.GeminiApiService;
import com.example.ClientService.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/venue")
public class VenueController {
    @Autowired
    private VenueService venueService;

    @Autowired
    private GeminiApiService geminiApiService;

    @GetMapping("/getGeminiData")
    public ResponseEntity<String> getGeminiData(@RequestParam String endpoint) {
        String response = geminiApiService.getDataFromGeminiApi(endpoint);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/addvenue")
    public ResponseEntity<Venue> addVenue(@RequestBody Venue venue){
        return ResponseEntity.ok(venueService.addVenue(venue));
    }

    @GetMapping("/getByLocation")
    public ResponseEntity<List<Venue>> getVenueByLocation(@RequestParam Date date, @RequestParam String location){
        return ResponseEntity.ok(venueService.getVenuesByLocationAndDate(date,location));
    }

    @GetMapping("/{venueId}")
    public ResponseEntity<Venue> getVenueById(@PathVariable Long venueId){
        return ResponseEntity.ok(venueService.getVenueById(venueId));
    }

    @PutMapping("/addDate")
    public ResponseEntity<Venue> addDate(@RequestParam Long venueId,@RequestParam Date date){
        return ResponseEntity.ok().body(venueService.addDate(venueId,date));
    }

    @PostMapping("list")
    public ResponseEntity<List<Venue>> addAllVenues(@RequestBody List<Venue> venues) {
        return ResponseEntity.ok(venueService.pushVenues(venues));
    }
}
