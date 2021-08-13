package com.example.artcoin.controller;

import com.example.artcoin.dto.Response;
import com.example.artcoin.service.ArtCoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ArtCoinController {

    private final ArtCoinService artCoinService;

    @PostMapping("/wallet")
    public Response<?> createWallet(@RequestBody String userId) {
        return Response.builder()
                .code(1)
                .msg("success")
                .data(artCoinService.createWallet(userId))
                .build();
    }

    @PostMapping("/transaction")
    public void requestTransaction() {

    }

    @GetMapping("/utxo")
    public void getUTXOs() {

    }
}
