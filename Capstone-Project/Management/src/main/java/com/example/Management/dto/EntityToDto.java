package com.example.Management.dto;

import com.example.Management.Client.FullResponse;
import com.example.Management.Model.Event;

public class EntityToDto {
    public static FullResponse eventToResponse(Event event) {
        if (event == null) {
            return null;
        }
        return FullResponse.builder()
                .id(event.getId())
                .name(event.getName())
                .date(event.getDate())
                //.host(event.getHost())
                .userId(event.getUserId())
                .guestList(event.getGuestList())
                .vendorIds(event.getVendorIds())
                .venueId(event.getVenueId())
                .build();
    }
}
