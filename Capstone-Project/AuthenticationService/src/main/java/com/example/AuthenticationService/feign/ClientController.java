package com.example.AuthenticationService.feign;


import com.example.AuthenticationService.Client.User;
import com.example.AuthenticationService.model.UserCredential;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ClientService", url = "http://localhost:8082/user")
public interface ClientController {
    @PostMapping("/addUser")
    public ResponseEntity<User> addClient(@RequestBody UserCredential user);
}
