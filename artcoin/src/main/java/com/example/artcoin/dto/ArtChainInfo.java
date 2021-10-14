package com.example.artcoin.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArtChainInfo {
    private List<BlockInfo> blocks = new ArrayList<>();
    private Integer totalBlockSize;
}
