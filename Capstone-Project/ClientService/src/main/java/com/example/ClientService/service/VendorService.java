package com.example.ClientService.service;

import com.example.ClientService.Exceptions.VendorNotFoundException;
import com.example.ClientService.Exceptions.VendorServiceException;
import com.example.ClientService.dtos.VendorRegistrationDto;
import com.example.ClientService.model.Vendor;
import com.example.ClientService.model.VendorStatus;
import com.example.ClientService.repository.VendorRepository;
import com.example.ClientService.utils.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class VendorService {

    @Autowired
    private AppUtils appUtils;
    @Autowired
    private VendorRepository vendorRepository;


    public Vendor addVendor(VendorRegistrationDto vendorRegistrationDto) {
        try {
            Vendor newVendor = appUtils.mapToVendor(vendorRegistrationDto);
            return vendorRepository.save(newVendor);
        } catch (DataIntegrityViolationException e) {
            throw new VendorServiceException("Vendor data violates a unique constraint", e);
        } catch (Exception e) {
            throw new VendorServiceException("An unexpected error occurred while adding a vendor", e);
        }
    }

    public List<Vendor> getAvailableVendor(Date date) {
        try {
            List<Vendor> availableVendors = vendorRepository.findAvailableVendorsByDate(date);
            if (availableVendors.isEmpty()) {
                throw new VendorNotFoundException("No vendors available on the specified date");
            }
            return availableVendors;
        } catch (Exception e) {
            throw new VendorServiceException("An unexpected error occurred while retrieving available vendors", e);
        }
    }

    public List<Vendor> getVendorByType(String type) {
        try {
            List<Vendor> vendors = vendorRepository.findVendorsByType(type);
            if (vendors.isEmpty()) {
                throw new VendorNotFoundException("No vendors found for the specified type");
            }
            return vendors;
        } catch (Exception e) {
            throw new VendorServiceException("An unexpected error occurred while retrieving vendors by type", e);
        }
    }

    public List<Vendor> getVendorsByChoice(String location, Date date, String type) {
        try {
            List<Vendor> vendors;
            if (type == null) {
                vendors = vendorRepository.findVendorsByLocationAndDate(location, date);
            } else {
                vendors = vendorRepository.findVendorsByLocationAndDateAndType(location, date, type);
            }
            if (vendors.isEmpty()) {
                throw new VendorNotFoundException("No vendors found matching the specified criteria");
            }
            return vendors;
        } catch (Exception e) {
            throw new VendorServiceException("An unexpected error occurred while retrieving vendors by choice", e);
        }
    }

    public List<Vendor> getAllVendors() {
        try {
            List<Vendor> vendors = vendorRepository.findAll();
            if (vendors.isEmpty()) {
                throw new VendorNotFoundException("No vendors available");
            }
            return vendors;
        } catch (Exception e) {
            throw new VendorServiceException("An unexpected error occurred while retrieving all vendors", e);
        }
    }

    public Vendor createVendor(Vendor vendor) {
        try {
            return vendorRepository.save(vendor);
        } catch (DataIntegrityViolationException e) {
            throw new VendorServiceException("Vendor data violates a unique constraint", e);
        } catch (Exception e) {
            throw new VendorServiceException("An unexpected error occurred while creating a vendor", e);
        }
    }

    public void deleteVendor(Long id) {
        try {
            if (!vendorRepository.existsById(id)) {
                throw new VendorNotFoundException("Vendor not found with the provided ID");
            }
            vendorRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new VendorNotFoundException("Vendor not found with the provided ID", e);
        } catch (Exception e) {
            throw new VendorServiceException("An unexpected error occurred while deleting the vendor", e);
        }
    }

    public Vendor getVendorById(Long vendorId) {
        try {
            return vendorRepository.findById(vendorId)
                    .orElseThrow(() -> new VendorNotFoundException("Vendor not found with the provided ID"));
        } catch (Exception e) {
            throw new VendorServiceException("An unexpected error occurred while retrieving the vendor by ID", e);
        }
    }

    public Vendor addDate(Long vendorId, Date date) {
        try {
            Vendor vendor = vendorRepository.findById(vendorId)
                    .orElseThrow(() -> new VendorNotFoundException("Vendor not found with the provided ID"));
            vendor.getBookedDates().add(date);
            return vendorRepository.save(vendor);
        } catch (Exception e) {
            throw new VendorServiceException("An unexpected error occurred while adding the date to the vendor", e);
        }
    }

    public List<Vendor> getVendorsByStatus(VendorStatus status) {
        return vendorRepository.getVendorsByStatus(status);
    }

    public Vendor approveVendor(Long vendorId) {
        try {
            Vendor vendor = vendorRepository.findById(vendorId)
                   .orElseThrow(() -> new VendorNotFoundException("Vendor not found with the provided ID"));
            vendor.setStatus(VendorStatus.APPROVED);
            return vendorRepository.save(vendor);
        } catch (Exception e) {
            throw new VendorServiceException("An unexpected error occurred while approving the vendor", e);
        }
    }
}
