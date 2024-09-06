package com.example.ClientService.repository;

import com.example.ClientService.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface VenueRepository extends JpaRepository<Venue,Long> {

    @Query("SELECT v FROM Venue v WHERE v.location = :location AND :date NOT MEMBER OF v.bookedDates")
    List<Venue> findVenuesByLocationAndDate(String location,Date date);
}
