package com.order.order.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.order.order.models.Order;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, UUID>{

}
