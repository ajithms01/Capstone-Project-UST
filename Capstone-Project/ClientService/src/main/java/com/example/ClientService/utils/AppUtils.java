package com.example.ClientService.utils;

import com.example.ClientService.dtos.VendorRegistrationDto;
import com.example.ClientService.model.Vendor;
import org.springframework.stereotype.Component;

@Component
public class AppUtils {
    public Vendor mapToVendor(VendorRegistrationDto vendorRegistrationDto){
        if(vendorRegistrationDto==null){
            return null;
        }else{
            return new Vendor(null,
                    vendorRegistrationDto.getVendorName(),
                    vendorRegistrationDto.getVendorEmail(),
                    vendorRegistrationDto.getVendorPhone(),
                    vendorRegistrationDto.getVendorLocation(),
                    vendorRegistrationDto.getType(),
                    vendorRegistrationDto.getRate(),
                    null,
                    vendorRegistrationDto.getStatus()
            );
        }
    }
}
