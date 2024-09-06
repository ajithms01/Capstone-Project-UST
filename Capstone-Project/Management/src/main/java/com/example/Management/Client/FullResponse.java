package com.example.Management.Client;

import com.example.Management.Model.EventStatus;
import com.example.Management.Model.Guest;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FullResponse {
    private Long id;
    private String name;
    private Date date;
    private String type;
    private String host;
    private List<Guest> guestList;
    private Boolean paymentStatus;
    private EventStatus status;
    private Long userId;
    private List<Long> vendorIds;
    private List<Vendor> vendorList;
    private Long venueId;
    private String venue;
    private String address;
    private Float budget;
    private String orderId;
    private Map<String,Float> vendorMap;
    private Float rate;
}
