package com.example.Management.Feign;

import com.example.Management.Client.Vendor;
import com.example.Management.Client.Venue;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Date;

public class VenueClientFallback implements VenueClient{
    @Override
    public ResponseEntity<Venue> getVenueById(@PathVariable Long venueId){
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
    }

    @Override
    @PutMapping("/addDate")
    public ResponseEntity<Venue> addDate(@RequestParam Long venueId, @RequestParam Date date){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}

