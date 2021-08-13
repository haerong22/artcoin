package com.example.artcoin.controller;

import com.example.artcoin.dto.ReqTransaction;
import com.example.artcoin.dto.Response;
import com.example.artcoin.service.ArtCoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ArtCoinController {

    private final ArtCoinService artCoinService;

    @PostMapping("/wallet")
    public Response<?> createWallet() {
        return Response.builder()
                .code(1)
                .msg("success")
                .data(artCoinService.createWallet())
                .build();
    }

    @PostMapping("/transaction")
    public void requestTransaction(@RequestBody ReqTransaction reqTransaction) {
        artCoinService.transaction(reqTransaction);
    }

    @GetMapping("/wallet")
    public Response<?> getBalance(@RequestBody String address) {
        System.out.println("address = " + address);
        return Response.builder()
                .code(1)
                .msg("success")
                .data(artCoinService.getBalance(address))
                .build();
    }

    @GetMapping("/utxo")
    public void getUTXOs() {

    }
}
