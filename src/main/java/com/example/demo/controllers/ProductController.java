package com.example.demo.controllers;

import java.util.List;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Product;
import com.example.demo.repositories.ProductRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    Logger logger = LogManager.getLogger();

    @PostMapping("/addProduct")
    public void addProduct(@RequestBody Product product) {
        if (product != null) {
            productRepository.save(product);
        }
    }

    @SuppressWarnings("null")
    @DeleteMapping("/removeProduct/{productId}")
    public void deleteProduct(@PathVariable(value = "productId", required = false) UUID productId) {
        System.out.println(productId);
        if (productId != null) {
            try {
                Product p = productRepository.findById(productId).orElseThrow(() -> new OptimisticLockingFailureException("The product does not exist"));
                productRepository.delete(p);
            } catch (OptimisticLockingFailureException e) {
                logger.info("The product does not exist");
            } catch (Exception e) {
                logger.info("The product cannot be deleted");
            }
            
        }
    }
    
    @GetMapping("/products")
    public List<Product> geAllProducts() {
        return productRepository.findAll();
    }
    
}
