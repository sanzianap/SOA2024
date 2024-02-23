package com.example.demo.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.models.Client;

@RepositoryRestResource
public interface ClientRepository extends JpaRepository<Client, UUID>{

}
