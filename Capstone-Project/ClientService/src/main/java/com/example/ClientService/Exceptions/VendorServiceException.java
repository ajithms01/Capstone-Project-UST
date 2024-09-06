package com.example.ClientService.Exceptions;

public class VendorServiceException extends RuntimeException {

    public VendorServiceException(String message) {
        super(message);
    }

    public VendorServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}