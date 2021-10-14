package com.example.artcoin.dto;

import com.example.artcoin.core.Wallet;
import com.example.artcoin.utils.StringUtil;
import lombok.Data;

@Data
public class WalletInfo {

    private String privateKey;
    private String publicKey;

    public WalletInfo(Wallet wallet) {
        this.privateKey = StringUtil.getStringFromKey(wallet.privateKey);
        this.publicKey = StringUtil.getStringFromKey(wallet.publicKey);
    }
}
