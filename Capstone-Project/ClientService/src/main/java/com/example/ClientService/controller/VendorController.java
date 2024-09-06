package com.example.ClientService.controller;

import com.example.ClientService.dtos.VendorRegistrationDto;
import com.example.ClientService.model.Vendor;
import com.example.ClientService.model.VendorStatus;
import com.example.ClientService.model.Venue;
import com.example.ClientService.repository.VendorRepository;
import com.example.ClientService.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.expression.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/vendor")
public class VendorController {
    @Autowired
    private VendorService vendorService;

    @PostMapping("/information")
    public ResponseEntity<?> addVendorInformation(@RequestBody VendorRegistrationDto vendorRegistrationDto) {
        try {
            Vendor savedVendor = vendorService.addVendor(vendorRegistrationDto);
            return ResponseEntity.ok(savedVendor);
        } catch (DataIntegrityViolationException e) {
            // This exception typically occurs when there is a violation of a database constraint (e.g., unique constraints).
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already exists or violates a unique constraint");
        } catch (IllegalArgumentException e) {
            // This exception can be thrown if there are invalid arguments.
            return ResponseEntity.badRequest().body("Invalid vendor data provided");
        } catch (Exception e) {
            // Catch any other exceptions that might occur.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while adding vendor information");
        }
    }


    @PostMapping("/create")
    public ResponseEntity<?> createVendor(@RequestBody Vendor vendor) {
        try {
            Vendor savedVendor = vendorService.createVendor(vendor);
            return ResponseEntity.ok(savedVendor);
        } catch (DataIntegrityViolationException e) {
            // Handles cases where the vendor data violates database constraints (e.g., unique email).
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Vendor data violates a unique constraint (e.g., email already exists)");
        } catch (IllegalArgumentException e) {
            // Handles invalid arguments.
            return ResponseEntity.badRequest().body("Invalid vendor data provided");
        } catch (Exception e) {
            // Handles any other unexpected errors.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while creating the vendor");
        }
    }


    @GetMapping("/available")
    public ResponseEntity<?> getAvailableVendor(@RequestParam Date date) {
        try {
            List<Vendor> availableVendors = vendorService.getAvailableVendor(date);
            if (availableVendors.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No vendors available on the specified date");
            }
            return ResponseEntity.ok(availableVendors);
        } catch (ParseException e) {
            // Handles issues with the date format.
            return ResponseEntity.badRequest().body("Invalid date format provided");
        } catch (Exception e) {
            // Handles any other unexpected errors.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while retrieving available vendors");
        }
    }


    @GetMapping("/getBytype")
    public ResponseEntity<?> getVendorByType(@RequestParam String type) {
        try {
            List<Vendor> vendors = vendorService.getVendorByType(type);
            if (vendors.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No vendors found for the specified type");
            }
            return ResponseEntity.ok(vendors);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while retrieving vendors by type");
        }
    }

    @GetMapping("/getVendorByChoice")
    public ResponseEntity<List<Vendor>> getVendorsByChoice(@RequestParam String location, @RequestParam Date date, @RequestParam(required = false) String type) {
            List<Vendor> vendors = vendorService.getVendorsByChoice(location, date, type);
            return ResponseEntity.ok(vendors);

    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllVendors() {
        try {
            List<Vendor> vendors = vendorService.getAllVendors();
            if (vendors.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No vendors available");
            }
            return ResponseEntity.ok(vendors);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while retrieving all vendors");
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteVendor(@RequestParam Long id) {
        try {
            vendorService.deleteVendor(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vendor not found with the provided ID");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while deleting the vendor");
        }
    }

    @GetMapping("/getVendor/{vendorId}")
    public ResponseEntity<?> getVendorById(@PathVariable Long vendorId) {
        try {
            Vendor vendor = vendorService.getVendorById(vendorId);
            if (vendor == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vendor not found with the provided ID");
            }
            return ResponseEntity.ok(vendor);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while retrieving the vendor by ID");
        }
    }

    @PutMapping("/addDate")
    public ResponseEntity<?> addDate(@RequestParam Long vendorId, @RequestParam Date date) {
        try {
            Vendor updatedVendor = vendorService.addDate(vendorId, date);
            if (updatedVendor == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vendor not found with the provided ID");
            }
            return ResponseEntity.ok(updatedVendor);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while adding the date to the vendor");
        }
    }

    @PutMapping("/approveVendor/{vendorId}")
    public ResponseEntity<Vendor> approveVendor(@PathVariable Long vendorId){
        return ResponseEntity.ok().body(vendorService.approveVendor(vendorId));
    }

    @GetMapping("/status")
    public ResponseEntity<List<Vendor>> getVendorsByStatus(@RequestParam VendorStatus status) {
        return ResponseEntity.ok().body(vendorService.getVendorsByStatus(status));
    }

}
