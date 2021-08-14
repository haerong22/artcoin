package com.example.artcoin.service;

import com.example.artcoin.blockchain.ArtChain;
import com.example.artcoin.core.Block;
import com.example.artcoin.core.Transaction;
import com.example.artcoin.core.TransactionOutput;
import com.example.artcoin.core.Wallet;
import com.example.artcoin.dto.*;
import com.example.artcoin.exception.ArtChainException;
import com.example.artcoin.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArtCoinService {

    private final WalletRepository walletRepository;

    public WalletInfo createWallet() {
        Wallet wallet = walletRepository.createWallet();
        return new WalletInfo(wallet);
    }

    public void transaction(ReqTransaction reqTransaction) {

        if (ArtChain.memPool.size() == ArtChain.BLOCKSIZE) {
            Block block = new Block(ArtChain.blockchain.get(ArtChain.blockchain.size() - 1).hash);
            ArtChain.memPool.forEach(tx -> {
                try {
                    Wallet sendWallet = walletRepository.findWallet(tx.getSendWallet());
                    Wallet receiveWallet = walletRepository.findWallet(tx.getReceiveWallet());

                    Transaction transaction = sendWallet.sendFunds(receiveWallet.publicKey, reqTransaction.getValue(), reqTransaction.getArtId());
                    block.addTransaction(transaction);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
            });
            ArtChain.addBlock(block);
            ArtChain.memPool.clear();
        }
        ArtChain.memPool.add(reqTransaction);
    }

    public Map<String, Float> getBalance(String address) {
        Wallet wallet = walletRepository.findWallet(address);
        return wallet.getBalance();
    }

    public List<TransactionDto.TransactionInfo> getTransactions() {
        List<TransactionDto.TransactionInfo> transactions = new ArrayList<>();
        ArtChain.blockchain.forEach(block -> {
            transactions.addAll(block.transactions.stream().map(TransactionDto.TransactionInfo::new).collect(Collectors.toList()));
        });
        return transactions;
    }

    public ArtChainInfo getBlocks() {
        List<BlockInfo> blocks = ArtChain.blockchain.stream().map(BlockInfo::new).collect(Collectors.toList());
        return ArtChainInfo.builder()
                .blocks(blocks)
                .totalBlockSize(blocks.size())
                .build();
    }

    public String addArt(ReqAddArt reqAddArt) {
        Wallet coinbase = WalletRepository.coinbase;
        Wallet admin = WalletRepository.admin;
        Transaction artTransaction = new Transaction(coinbase.publicKey, admin.publicKey, reqAddArt.getValue(), null, reqAddArt.getArtId());
        artTransaction.generateSignature(coinbase.privateKey);
        artTransaction.transactionId = "0";
        artTransaction.outputs.add(new TransactionOutput(artTransaction.reciepient, artTransaction.value, artTransaction.transactionId, artTransaction.artId));

        ArtChain.UTXOs.put(artTransaction.outputs.get(0).id, artTransaction.outputs.get(0));
        Block block = new Block(ArtChain.blockchain.get(ArtChain.blockchain.size()-1).hash);
        if (block.addTransaction(artTransaction)) {
            ArtChain.addBlock(block);
        } else {
            throw new ArtChainException("block generated fail");
        }
        return block.hash;
    }
}
