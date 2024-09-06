package com.example.Management.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Guest {
    private Long guestId;
    private String guestName;
    private String guestEmail;
    private String guestPhone;
    private Long eventId;
}
