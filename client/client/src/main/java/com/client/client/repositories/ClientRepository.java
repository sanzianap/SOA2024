package com.client.client.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.client.client.models.Client;

@RepositoryRestResource
public interface ClientRepository extends JpaRepository<Client, UUID>{

}
