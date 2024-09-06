package com.example.ClientService.service;

import com.example.ClientService.Exceptions.VenueNotFoundException;
import com.example.ClientService.Exceptions.VenueServiceException;
import com.example.ClientService.model.Vendor;
import com.example.ClientService.model.Venue;
import com.example.ClientService.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class VenueService {
    @Autowired
    private VenueRepository venueRepository;

    public List<Venue> getVenuesByLocationAndDate(Date date, String location) {
        try {
            List<Venue> venues = venueRepository.findVenuesByLocationAndDate(location, date);
            if (venues.isEmpty()) {
                throw new VenueNotFoundException("No venues found for the specified location and date");
            }
            return venues;
        } catch (Exception e) {
            throw new VenueServiceException("An unexpected error occurred while retrieving venues", e);
        }
    }

    public Venue addVenue(Venue venue) {
        try {
            return venueRepository.save(venue);
        } catch (DataIntegrityViolationException e) {
            throw new VenueServiceException("Venue data violates a unique constraint", e);
        } catch (Exception e) {
            throw new VenueServiceException("An unexpected error occurred while adding the venue", e);
        }
    }

    public Venue getVenueById(Long venueId) {
        try {
            return venueRepository.findById(venueId)
                    .orElseThrow(() -> new VenueNotFoundException("Venue not found with the provided ID"));
        } catch (Exception e) {
            throw new VenueServiceException("An unexpected error occurred while retrieving the venue by ID", e);
        }
    }

    public Venue addDate(Long venueId, Date date) {
        try {
            Venue venue = venueRepository.findById(venueId)
                    .orElseThrow(() -> new VenueNotFoundException("Venue not found with the provided ID"));
            venue.getBookedDates().add(date);
            return venueRepository.save(venue);
        } catch (Exception e) {
            throw new VenueServiceException("An unexpected error occurred while adding the date to the venue", e);
        }
    }

    public List<Venue> pushVenues(List<Venue> venues) {
        return venueRepository.saveAll(venues);
    }
}
