package com.example.AuthenticationService.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserExistException.class)
    public ResponseEntity<String> userExistException(UserExistException ex){
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
