package com.example.Management.Feign;

import com.example.Management.Client.Vendor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Date;

@FeignClient(name = "ClientService", url = "http://localhost:8082/vendor", fallback = VendorClientFallback.class)
public interface VendorClient {

    @GetMapping("/getVendor/{vendorId}")
    public ResponseEntity<Vendor> getVendorById(@RequestParam Long vendorId);

    @PutMapping("/addDate")
    public ResponseEntity<Vendor> addDate(@RequestParam Long vendorId,@RequestParam Date date);
}
