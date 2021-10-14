package com.example.artcoin.dto;

import com.example.artcoin.core.Transaction;
import com.example.artcoin.core.TransactionInput;
import com.example.artcoin.core.TransactionOutput;
import com.example.artcoin.utils.StringUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.stream.Collectors;

public class TransactionDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TransactionInfo {
        public String transactionId; //Contains a hash of transaction*
        public String artId;
        public String sender; //Senders address/public key.
        public String reciepient; //Recipients address/public key.
        public float value; //Contains the amount we wish to send to the recipient.
        public byte[] signature; //This is to prevent anybody else from spending funds in our wallet.

        public ArrayList<TransactionInputInfo> inputs = new ArrayList<>();
        public ArrayList<TransactionOutputInfo> outputs = new ArrayList<>();

        public TransactionInfo(Transaction transaction) {
            this.transactionId = transaction.transactionId;
            this.artId = transaction.artId;
            this.sender = StringUtil.getStringFromKey(transaction.sender);
            this.reciepient = StringUtil.getStringFromKey(transaction.reciepient);
            this.value = transaction.value;
            this.signature = transaction.signature;
            if (transaction.inputs == null) {
                inputs.add(new TransactionInputInfo("coinbase"));
            } else {
                this.inputs.addAll(transaction.inputs.stream().map(TransactionInputInfo::new).collect(Collectors.toList()));
            }
            this.outputs.addAll(transaction.outputs.stream().map(TransactionOutputInfo::new).collect(Collectors.toList()));
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    static class TransactionOutputInfo {
        private String id;
        private String artId;
        private String recipient;
        private float value;
        private String parentTransactionId;

        public TransactionOutputInfo(TransactionOutput transactionOutput) {
            this.id = transactionOutput.id;
            this.artId = transactionOutput.artId;
            this.recipient = StringUtil.getStringFromKey(transactionOutput.recipient);
            this.value = transactionOutput.value;
            this.parentTransactionId = transactionOutput.parentTransactionId;
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    static class TransactionInputInfo {
        private String transactionOutputId;
        private TransactionOutputInfo UTXO;

        public TransactionInputInfo(String transactionOutputId) {
            this.transactionOutputId = transactionOutputId;
        }

        public TransactionInputInfo(TransactionInput transactionInput) {
            this.transactionOutputId = transactionInput.transactionOutputId;
            this.UTXO = new TransactionOutputInfo(transactionInput.UTXO);
        }
    }
}
