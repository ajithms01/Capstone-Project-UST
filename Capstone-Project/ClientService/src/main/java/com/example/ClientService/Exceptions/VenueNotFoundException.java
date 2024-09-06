package com.example.ClientService.Exceptions;

public class VenueNotFoundException extends RuntimeException {

    public VenueNotFoundException(String message) {
        super(message);
    }

    public VenueNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
