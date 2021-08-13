package com.example.artcoin.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Response<T> {

    private int code;
    private String msg;
    private T data;
}
