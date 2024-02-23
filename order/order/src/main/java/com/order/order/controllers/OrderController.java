package com.order.order.controllers;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.order.order.messaging.OrderMessageProducer;
import com.order.order.models.Order;
import com.order.order.repositories.OrderRepository;

@RestController
public class OrderController {

     @Autowired
    private OrderRepository orderRepository;

    Logger logger = LogManager.getLogger();

    @Autowired
    private OrderMessageProducer orderMessageProducer;

    @PostMapping("/addOrder")
    public void addOrder(@RequestBody Order order) {
        List<Order> existingOrders = orderRepository.findAll();
        for(Order o : existingOrders) {
            if (o.getClientId().toString().equals(order.getClientId().toString()) && 
                    o.getProductId().toString().equals(order.getProductId().toString())) {
                int newQuantity = order.getQuantity() + o.getQuantity();
                float newPrice = order.getPrice() + o.getPrice();
                order.setQuantity(newQuantity);
                order.setPrice(newPrice);
                order.setId(o.getId());
            }
        }
        Date date = new Date();
        if (order != null) {
            order.setDate(new Timestamp(date.getTime()));
            orderRepository.save(order);
            orderMessageProducer.sendMessage(order);
        }
    }
    
    @DeleteMapping("/removeOrder/{orderId}")
    public void deleteOrder(@PathVariable(value = "orderId", required = false) UUID orderId) {
        System.out.println(orderId);
        if (orderId != null) {
            try {
                Order p = orderRepository.findById(orderId).orElseThrow(() -> new OptimisticLockingFailureException("The order does not exist"));
                orderRepository.delete(p);
            } catch (OptimisticLockingFailureException e) {
                logger.info("The order does not exist");
            } catch (Exception e) {
                logger.info("The order cannot be deleted");
            }
            
        }
    }
    
    @GetMapping("/orders")
    public List<Order> geAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders;
    }

}