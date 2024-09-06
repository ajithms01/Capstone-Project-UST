package com.example.Management.Feign;

import com.example.Management.Client.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@FeignClient(name = "ClientService", url = "http://localhost:8082/user")
public interface UserClient {
    @GetMapping("/getUserById")
    public ResponseEntity<Optional<User>> getClient(@RequestParam Long userId);
}
