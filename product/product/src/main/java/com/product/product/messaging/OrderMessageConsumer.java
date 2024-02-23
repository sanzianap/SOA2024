package com.product.product.messaging;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import com.product.product.dto.OrderMessage;
import com.product.product.models.Product;
import com.product.product.repositories.ProductRepository;

@Service
public class OrderMessageConsumer {

    private final ProductRepository clientRepository;

    public OrderMessageConsumer(ProductRepository clientRepository) {
        this.clientRepository = clientRepository;
    }
    Logger logger = LogManager.getLogger();

    @RabbitListener(queues = "productQueue")
    public void consumeMessage(OrderMessage orderMessage) {
        if (orderMessage.getProductId() != null) {
            try {
                Product c = clientRepository.findById(orderMessage.getProductId()).orElseThrow(() -> new OptimisticLockingFailureException("The client does not exist"));
                Product copyProduct = new Product(c.getName(), c.getPrice(), c.getStock() - orderMessage.getQuantity());
                clientRepository.delete(c);
                clientRepository.save(copyProduct);
            } catch (OptimisticLockingFailureException e) {
                logger.info("The client does not exist");
            } catch (Exception e) {
                logger.info("The client cannot be deleted");
            }
        }
    }
}
