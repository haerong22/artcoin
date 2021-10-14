package com.example.artcoin.controller;

import com.example.artcoin.blockchain.ArtChain;
import com.example.artcoin.dto.ReqAddArt;
import com.example.artcoin.dto.ReqTransaction;
import com.example.artcoin.dto.Response;
import com.example.artcoin.dto.TransactionDto;
import com.example.artcoin.service.ArtCoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ArtCoinController {

    private final ArtCoinService artCoinService;

    // 지갑 생성
    @PostMapping("/wallet")
    public Response<?> createWallet() {
        return Response.builder()
                .code(1)
                .msg("success")
                .data(artCoinService.createWallet())
                .build();
    }

    // 트랜잭션 id 로 조회
    @GetMapping("/transaction")
    public Response<?> getTransaction(@RequestBody String transactionHash) {
        return Response.builder()
                .code(1)
                .msg("success")
                .data(artCoinService.getTransaction(transactionHash))
                .build();
    }

    // 트랜잭션 요청
    @PostMapping("/transaction")
    public Response<?> requestTransaction(@RequestBody ReqTransaction reqTransaction) {
        artCoinService.transaction(reqTransaction);
        return Response.builder()
                .code(1)
                .msg("success")
                .build();
    }

    // 지갑 조회
    @GetMapping("/wallet")
    public Response<?> getBalance(@RequestBody String address) {
        return Response.builder()
                .code(1)
                .msg("success")
                .data(artCoinService.getBalance(address))
                .build();
    }

    // 모든 블록 조회
    @GetMapping("/blocks")
    public Response<?> getBlocks() {
        return Response.builder()
                .code(1)
                .msg("success")
                .data(artCoinService.getBlocks())
                .build();
    }

    // utxo 조회
    @GetMapping("/utxos")
    public Response<?> getUTXOs() {
        return Response.builder()
                .code(1)
                .msg("success")
                .data(ArtChain.UTXOs)
                .build();
    }

    // 모든 트랜잭션 조회
    @GetMapping("/transactions")
    public Response<?> getTransactions() {
        return Response.builder()
                .code(1)
                .msg("success")
                .data(artCoinService.getTransactions())
                .build();
    }

    // 미술품 추가
    @PostMapping("/art")
    public Response<?> addArt(@RequestBody ReqAddArt reqAddArt) {
        return Response.builder()
                .code(1)
                .msg("success")
                .data(artCoinService.addArt(reqAddArt))
                .build();
    }
}
