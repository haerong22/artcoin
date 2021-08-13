package com.example.artcoin.dto;

import lombok.Data;

@Data
public class ReqTransaction {

    private String sendWallet;
    private String receiveWallet;
    private float value;
    private String artId;
}
