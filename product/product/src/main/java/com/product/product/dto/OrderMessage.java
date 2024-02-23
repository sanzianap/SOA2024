package com.product.product.dto;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class OrderMessage {

    private UUID id;
    private Date date;
    private int quantity;
    private UUID productId;
}
