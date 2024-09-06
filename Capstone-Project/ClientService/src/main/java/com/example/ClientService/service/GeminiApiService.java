package com.example.ClientService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiApiService {

    @Autowired
    private RestTemplate restTemplate;

    public String getDataFromGeminiApi(String endpoint) {
        String url = "https://gemini.api.com/" + endpoint;
        return restTemplate.getForObject(url, String.class);
    }
}
