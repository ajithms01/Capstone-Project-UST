package com.example.AuthenticationService.repository;

import com.example.AuthenticationService.model.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCredentialRepository extends JpaRepository<UserCredential,Long> {
    Optional<UserCredential> findByUsername(String username);
}
