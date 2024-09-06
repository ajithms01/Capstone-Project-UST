package com.example.Management.Service;

import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

@Service
public class OrderNumberGenerator {

    public String generateOrderNumber( Long eventId) {
        // Get the current date and time
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String timestamp = sdf.format(new Date());

        Random random = new Random();
        int randomNumber = 1000 + random.nextInt(9000);

        // Combine timestamp, counter, and random number to create the order number
        return "ORD-"+timestamp+"-000"+eventId +"-"+randomNumber;
    }

}
