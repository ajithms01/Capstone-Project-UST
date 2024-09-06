package com.example.AuthenticationService.service;

import com.example.AuthenticationService.exception.UserExistException;
import com.example.AuthenticationService.model.UserCredential;
import com.example.AuthenticationService.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService{

    @Autowired
    private UserCredentialRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public UserCredential saveUser(UserCredential credential) {

        credential.setPassword(passwordEncoder.encode(credential.getPassword()));
        try{
            return repository.save(credential);

        }catch (Exception e){
            throw new UserExistException("User credential already exist");
        }

    }

    public String generateToken(String username , Long userId ,String role) {
        return jwtService.generateToken(username,userId,role);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }


    public Boolean validateId(Long id) {
        return repository.existsById(id);
    }

}
