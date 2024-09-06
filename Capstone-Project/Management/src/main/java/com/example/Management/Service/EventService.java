package com.example.Management.Service;

import com.example.Management.Client.FullResponse;
import com.example.Management.Client.User;
import com.example.Management.Client.Vendor;
import com.example.Management.Client.Venue;
import com.example.Management.Feign.UserClient;
import com.example.Management.Feign.VendorClient;
import com.example.Management.Feign.VenueClient;
import com.example.Management.Model.Event;
import com.example.Management.Model.EventStatus;
import com.example.Management.Model.Guest;
import com.example.Management.Model.Order;
import com.example.Management.Repository.EventRepository;
import com.example.Management.Repository.OrderRepository;
import com.example.Management.dto.EntityToDto;
import feign.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private OrderNumberGenerator ong;

    @Autowired
    private VendorClient vendorClient;

    @Autowired
    private VenueClient venueClient;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserClient userClient;

    @Autowired
    private  EmailSenderService senderService;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }


    public Event getEventById(Long id) {
        Optional<Event> eventOptional= eventRepository.findById(id);
        return eventOptional.orElse(null);
    }

    public void deleteEvent(Long id) {
        Optional<Event> eventOptional= eventRepository.findById(id);
        eventOptional.ifPresent(event -> eventRepository.delete(event));
    }


    public Event approveEvent(Long eventId) {
        Optional<Event> eventOptional= eventRepository.findById(eventId);
        if(eventOptional.isPresent()){
            Event event=eventOptional.get();
            event.setStatus(EventStatus.CONFIRMED);
            return eventRepository.save(event);
        }
        else{
            return null;
        }
    }

    public Event createEvent(Event event) {
        Event event1 = eventRepository.save(event);
        Order order = new Order();
        order.setOrderId(ong.generateOrderNumber(event1.getId()));
        order.setEventId(event.getId());
        orderRepository.save(order);
        if(event1.getVendorIds() != null){
            for(Long id : event1.getVendorIds()){
                vendorClient.addDate(id,event.getDate());
            }
        }
        if(event1.getVenueId() != null){
            venueClient.addDate(event.getVenueId(),event.getDate());
        }
        return event1;
    }

    public List<Event> getEventsByType(String eventType) {
        return eventRepository.findAllByType(eventType);
    }

    public List<Event> getEventsByDate(LocalDate eventDate) {
        return eventRepository.findAllByDate(eventDate);
    }

    public Event addGuestToEvent(Long eventId, List<Guest> guest) {
        Optional<Event> eventOptional= eventRepository.findById(eventId);
        if(eventOptional.isPresent()){
            Event event=eventOptional.get();
            event.getGuestList().addAll(guest);
            return eventRepository.save(event);
        }
        else{
            return null;
        }
    }

    public FullResponse eventDetails(Long eventId) {
        Optional<Event> eventOptional= eventRepository.findById(eventId);
        if(eventOptional.isPresent()){
            Event event=eventOptional.get();
            FullResponse response = EntityToDto.eventToResponse(event);
            Float budget = (float) 0;
            if(event.getVendorIds()!=null){
                Map<String, Float> vendorMap = new HashMap<>();
                for(Long vendorId: event.getVendorIds()){
                    Vendor vendor = vendorClient.getVendorById(vendorId).getBody();
                    vendorMap.put(vendor.getVendorName(), vendor.getRate());
                    budget+= vendor.getRate();
                }
                response.setVendorMap(vendorMap);
            }
            response.setType(event.getType());
            response.setHost(userClient.getClient(event.getUserId()).getBody().get().getName());
            if(event.getVenueId() != null){
                Venue venue = venueClient.getVenueById(event.getVenueId()).getBody();
                response.setAddress(venue.getAddress());
                response.setVenue(venue.getVenueName());
                budget+=venue.getRent();
            }
            response.setOrderId(orderRepository.findById(event.getId()).get().getOrderId());
            response.setBudget(budget);
            response.setGuestList(event.getGuestList());
            return response;
        }
        else{
            return null;
        }
    }

    public FullResponse sendOrder(Long eventId, Long vendorId) {
        Optional<Event> eventOptional= eventRepository.findById(eventId);
        if(eventOptional.isPresent()){
            Vendor vendor = vendorClient.getVendorById(vendorId).getBody();
            if(vendor !=null){
                Event event=eventOptional.get();
                FullResponse response=new FullResponse();
                response.setName(event.getName());

                response.setHost(userClient.getClient(event.getUserId()).getBody().get().getName());
                response.setDate(event.getDate());
                response.setOrderId(orderRepository.findById(event.getId()).get().getOrderId()+"-000" +vendorId);
                Venue venue = venueClient.getVenueById(event.getVenueId()).getBody();
                response.setAddress(venue.getAddress());
                response.setVenue(venue.getVenueName());
                response.setRate(vendor.getRate());
                StringJoiner joiner = getStringJoiner(response, vendor);
                senderService.sendSimpleEmail("bharathhareesh2002@gmail.com","Purchase Order",joiner.toString());
                return response;
            }
        else{
            return null;
            }
        }
        else{
            return null;
        }
    }

    private static StringJoiner getStringJoiner(FullResponse response, Vendor vendor) {
        StringJoiner joiner = new StringJoiner("\n");
        joiner.add("Purchase Order");
        joiner.add("====================");
        joiner.add("");
        joiner.add("Order Details:");
        joiner.add("--------------------");
        joiner.add("Order ID:        " + response.getOrderId());
        joiner.add("Event Name:      " + response.getName());
        joiner.add("Vendor Name:    " + vendor.getVendorName());
        joiner.add("Host:            " + response.getHost());
        joiner.add("Date:            " + response.getDate());
        joiner.add("");
        joiner.add("Venue Information:");
        joiner.add("--------------------");
        joiner.add("Venue:           " + response.getVenue());
        joiner.add("Address:         " + response.getAddress());
        joiner.add("");
        joiner.add("Vendor Details:");
        joiner.add("--------------------");
        joiner.add("Rate:            ₹" + response.getRate());
        joiner.add("");
        joiner.add("--------------------");
        joiner.add("Events & Co.");
        joiner.add("Manager");
        joiner.add("");
        joiner.add("Thank you for your business!");
        return joiner;
    }

    public FullResponse sendInvoice(Long eventId) {
        Optional<Event> eventOptional= eventRepository.findById(eventId);
        if(eventOptional.isPresent()){
            Event event=eventOptional.get();
            FullResponse response = EntityToDto.eventToResponse(event);
            Float budget = (float) 0;
            if(event.getVendorIds()!=null){
                Map<String, Float> vendorMap = new HashMap<>();
                for(Long vendorId: event.getVendorIds()){
                    Vendor vendor = vendorClient.getVendorById(vendorId).getBody();
                    vendorMap.put(vendor.getVendorName(), vendor.getRate());
                    budget+= vendor.getRate();
                }
                response.setVendorMap(vendorMap);
            }
            response.setType(event.getType());
            Venue venue = venueClient.getVenueById(event.getVenueId()).getBody();
            response.setAddress(venue.getAddress());
            response.setVenue(venue.getVenueName());
            response.setOrderId(orderRepository.findById(event.getId()).get().getOrderId());
            budget+=venue.getRent();
            response.setBudget(budget);
            response.setGuestList(event.getGuestList());
            String message =getInvoice(response).toString();
            senderService.sendSimpleEmail("bharathhareesh2002@gmail.com","Invoice",message);
            return response;
        }
        else{
            return null;
        }
    }

    private StringJoiner getInvoice(FullResponse event) {
        StringJoiner joiner = new StringJoiner("\n");
        joiner.add("Invoice");
        joiner.add("====================");
        joiner.add("");
        joiner.add("Order Details:");
        joiner.add("--------------------");
        joiner.add("Order ID:        " + orderRepository.findById(event.getId()).get().getOrderId());
        joiner.add("Event Name:      " + event.getName());
        joiner.add("Host:            " + event.getHost());
        joiner.add("Date:            " + event.getDate());
        joiner.add("");
        joiner.add("Venue Information:");
        joiner.add("--------------------");
        Venue venue =venueClient.getVenueById(event.getVenueId()).getBody();
        joiner.add("Venue:           " + venue.getVenueName());
        joiner.add("Address:         " + venue.getAddress());
        joiner.add("");
        joiner.add("Vendors");
        joiner.add("--------------------");
        for (String value : event.getVendorMap().keySet()) {
            joiner.add(value); // Add each value to the joiner
        }
        joiner.add("--------------------");
        joiner.add("Estimated Budget:      ₹" + event.getBudget());
        return joiner;
    }

    public List<Event> getEventsByClientId(Long userId) {
        return eventRepository.findAllByUserId(userId);
    }
}
