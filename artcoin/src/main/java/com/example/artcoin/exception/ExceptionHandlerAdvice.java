package com.example.artcoin.exception;

import com.example.artcoin.dto.Response;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

    @ExceptionHandler(ArtChainException.class)
    public Response<?> artChainExceptionHandler(ArtChainException exception) {
        return Response.builder()
                .code(-1)
                .msg("fail")
                .data(exception.getMessage())
                .build();
    }
}
