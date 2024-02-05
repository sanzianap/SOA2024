package com.example.demo.controllers;

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

import com.example.demo.models.Client;
import com.example.demo.repositories.ClientRepository;

@RestController
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    Logger logger = LogManager.getLogger();

    @PostMapping("/addClient")
    public void addClient(@RequestBody Client client) {
        if (client != null) {
            clientRepository.save(client);
        }
    }

    @SuppressWarnings("null")
    @DeleteMapping("/removeClient/{clientId}")
    public void deleteClient(@PathVariable(value = "clientId", required = false) UUID clientId) {
        System.out.println(clientId);
        if (clientId != null) {
            try {
                Client c = clientRepository.findById(clientId).orElseThrow(() -> new OptimisticLockingFailureException("The client does not exist"));
                clientRepository.delete(c);
            } catch (OptimisticLockingFailureException e) {
                logger.info("The client does not exist");
            } catch (Exception e) {
                logger.info("The client cannot be deleted");
            }
            
        }
    }
    
    @GetMapping("/clients")
    public List<Client> geAllClients() {
        return clientRepository.findAll();
    }

}
