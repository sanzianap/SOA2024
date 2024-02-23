package com.product.product.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.product.product.models.Product;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, UUID>{

}
