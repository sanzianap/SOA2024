package com.order.order.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.order.order.dto.OrderMessage;
import com.order.order.models.Order;

@Service
public class OrderMessageProducer {

    private final RabbitTemplate rabbitTemplate;

    public OrderMessageProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }


    public void sendMessage(Order order) {
        OrderMessage orderMessage = new OrderMessage();
        orderMessage.setId(order.getId());
        orderMessage.setQuantity(order.getQuantity());
        orderMessage.setDate(order.getDate());
        orderMessage.setProductId(order.getProductId());
        rabbitTemplate.convertAndSend("productQueue", orderMessage);
    }
}
