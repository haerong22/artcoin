package com.example.artcoin.core;

import com.example.artcoin.utils.StringUtil;
import org.bouncycastle.util.encoders.Base64;

import java.security.PublicKey;

public class TransactionOutput {
    public String id;
    public String artId;
    public PublicKey recipient; //also known as the new owner of these coins.
    public float value; //the amount of coins they own
    public String parentTransactionId; //the id of the transaction this output was created in

    //Constructor
    public TransactionOutput(PublicKey recipient, float value, String parentTransactionId, String artId) {
        this.recipient = recipient;
        this.value = value;
        this.parentTransactionId = parentTransactionId;
        this.id = StringUtil.applySha256(StringUtil.getStringFromKey(recipient)+Float.toString(value)+parentTransactionId);
        this.artId = artId;
    }

    //Check if coin belongs to you
    public boolean isMine(PublicKey publicKey) {
        return (publicKey == recipient);
    }

}