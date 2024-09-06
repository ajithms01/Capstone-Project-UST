package com.example.ClientService.controller;

import com.example.ClientService.Exceptions.UserNotFoundException;
import com.example.ClientService.feign.EventClient;
import com.example.ClientService.model.User;
import com.example.ClientService.resources.Event;
import com.example.ClientService.resources.Guest;
import com.example.ClientService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EventClient eventClient;

    @GetMapping("/events")
    public ResponseEntity<List<Event>> getAllEvents(@RequestParam Long userId) {
        List<Event> events = eventClient.getEventsByClientId(userId).getBody();
        return ResponseEntity.ok(events);
    }

//
//    @PostMapping("/events")
//    public ResponseEntity<Event> createEvent(@RequestBody Event event, @RequestParam Long userId) {
//        Event createdEvent = eventClient.createEvent(event).getBody(); // Assuming this returns the created event
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
//    }


    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestParam Long clientId, @RequestBody User updatedClient) {
        try {
            User updatedProfile = userService.updateProfile(clientId, updatedClient);
            return ResponseEntity.ok(updatedProfile);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @GetMapping("/getUserById")
    public ResponseEntity<User> getClient(@RequestParam Long userId) {
        try {
            User user = userService.getClientById(userId);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PostMapping("/addUser")
    public ResponseEntity<User> addClient(@RequestBody User user) {
        if (user.getName() == null || user.getName().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        User savedUser = userService.saveClient(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }


    @GetMapping("/getUser")
    public ResponseEntity<User> getUserInfo(@RequestParam String username) {
        try {
            User user = userService.getUserInfo(username);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(user);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
