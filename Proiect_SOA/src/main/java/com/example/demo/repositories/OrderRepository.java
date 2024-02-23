package com.example.demo.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.models.Order;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, UUID>{

}
