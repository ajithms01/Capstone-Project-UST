package com.example.ClientService.Exceptions;

public class VenueServiceException extends RuntimeException {

    public VenueServiceException(String message) {
        super(message);
    }

    public VenueServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
