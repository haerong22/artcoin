package com.example.artcoin.repository;

import com.example.artcoin.blockchain.ArtChain;
import com.example.artcoin.core.Block;
import com.example.artcoin.core.Transaction;
import com.example.artcoin.core.TransactionOutput;
import com.example.artcoin.core.Wallet;
import com.example.artcoin.exception.ArtChainException;
import com.example.artcoin.utils.StringUtil;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Repository
public class WalletRepository {

    private static final Map<String, Wallet> walletList = new HashMap<>();

    @PostConstruct
    public void init() {
        Wallet coinbase = new Wallet();
        Wallet admin = new Wallet();
        walletList.put(StringUtil.getStringFromKey(coinbase.publicKey), coinbase);
        walletList.put(StringUtil.getStringFromKey(admin.publicKey), admin);
        System.out.println("StringUtil.getStringFromKey(admin.publicKey) = " + StringUtil.getStringFromKey(admin.publicKey));
        Transaction genesisTransaction = new Transaction(coinbase.publicKey, admin.publicKey, 100f, null, "1000");
        genesisTransaction.generateSignature(coinbase.privateKey);
        genesisTransaction.transactionId = "0";
        genesisTransaction.outputs.add(new TransactionOutput(genesisTransaction.reciepient, genesisTransaction.value, genesisTransaction.transactionId, genesisTransaction.artId));
        ArtChain.UTXOs.put(genesisTransaction.outputs.get(0).id, genesisTransaction.outputs.get(0));
        Block genesis = new Block("0");
        if (genesis.addTransaction(genesisTransaction)) {
            ArtChain.addBlock(genesis);
        } else {
            System.out.println("genesis first block fail");
        }
    }

    public Wallet createWallet() {
        Wallet wallet = new Wallet();
        walletList.put(StringUtil.getStringFromKey(wallet.publicKey), wallet);
        return wallet;
    }

    public Wallet findWallet(String wallet) {
        return walletList.get(wallet);
    }
}
