package com.example.artcoin.dto;

import com.example.artcoin.core.Block;
import com.example.artcoin.core.Transaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlockInfo {

    public String hash;
    public String previousHash;
    public String merkleRoot;
    public ArrayList<TransactionDto.TransactionInfo> transactions = new ArrayList<>();
    public long timeStamp;
    public int nonce;

    public BlockInfo(Block block) {
        this.hash = block.hash;
        this.previousHash = block.previousHash;
        this.merkleRoot = block.merkleRoot;
        this.transactions.addAll(block.transactions.stream().map(TransactionDto.TransactionInfo::new).collect(Collectors.toList()));
        this.timeStamp = block.timeStamp;
        this.nonce = block.nonce;
    }
}
