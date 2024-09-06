package com.example.ClientService.Exceptions;

public class VendorNotFoundException extends RuntimeException {

    public VendorNotFoundException(String message) {
        super(message);
    }

    public VendorNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

