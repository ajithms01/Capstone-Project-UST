package com.example.Management.dto;

import com.example.Management.Client.FullResponse;
import com.example.Management.Model.Event;

public class dtoToEntity {
    public static Event FullResponseToEvent(FullResponse response){
        if(response==null){
            return null;
        }
        return Event.builder()
                .id(response.getId())
                .name(response.getName())
                .date(response.getDate())
                .type(response.getType())
//                .host(response.getHost())
                .userId(response.getUserId())
                .guestList(response.getGuestList())
                .status(response.getStatus())
                .build();
    }
}
