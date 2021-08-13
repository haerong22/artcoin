package com.example.artcoin.service;

import com.example.artcoin.core.Wallet;
import com.example.artcoin.dto.WalletInfo;
import com.example.artcoin.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArtCoinService {

    private final WalletRepository walletRepository;

    public WalletInfo createWallet(String userId) {
        System.out.println("userId = " + userId);
        Wallet wallet = walletRepository.createWallet(userId);
        return new WalletInfo(wallet);
    }
}
