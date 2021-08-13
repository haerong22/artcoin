package com.example.artcoin.repository;

import com.example.artcoin.core.Wallet;
import com.example.artcoin.exception.ArtChainException;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class WalletRepository {

    private static final Map<String, Wallet> walletList = new HashMap<>();

    public Wallet createWallet(String userId) {
        if (walletList.get(userId) != null) {
            throw new ArtChainException("already");
        }
        Wallet wallet = new Wallet();
        walletList.put(userId, wallet);
        return wallet;
    }
}
