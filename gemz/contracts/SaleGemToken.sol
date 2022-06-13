// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./MintGemToken.sol";

contract SaleGemToken {
    MintGemToken public mintGemToken;

    constructor(address _mintGemtoken) {
        mintGemToken = MintGemToken(_mintGemtoken);
    }

    struct GemTokenData {
        uint tokenId;
        uint gemTokenRank;
        uint gemTokenType;
        uint tokenPrice;
    }

    mapping(uint => uint) public tokenPrices;
    
    uint[] public onSaleTokens;

    function setForSaleGemToken(uint _tokenId, uint _price) public {
        address tokenOwner = mintGemToken.ownerOf(_tokenId);

        require(tokenOwner == msg.sender, "Caller is not Gem token owner.");
        require(_price > 0, "Price is zero or lower.");
        require(tokenPrices[_tokenId] == 0, "This Gem token is already on sale.");
        require(mintGemToken.isApprovedForAll(msg.sender, address(this)), "Gem token owner did not approve token.");

        tokenPrices[_tokenId] = _price;

        onSaleTokens.push(_tokenId);
    }

    function purchaseGemToken(uint _tokenId) public payable {
        address tokenOwner = mintGemToken.ownerOf(_tokenId);
        
        require(tokenPrices[_tokenId] > 0, "This Gem token not on sale.");
        require(tokenPrices[_tokenId] <= msg.value, "Caller sent lower then price.");
        require(tokenOwner != msg.sender, "Caller is Gem token owner.");

        payable(tokenOwner).transfer(msg.value);

        mintGemToken.safeTransferFrom(tokenOwner, msg.sender, _tokenId);

        tokenPrices[_tokenId] = 0;

        popOnSaleToken(_tokenId);
    }

    function popOnSaleToken(uint _tokenId) private {
        for(uint i = 0; i < onSaleTokens.length; i++) {
            if(onSaleTokens[i] == _tokenId) {
                onSaleTokens[i] = onSaleTokens[onSaleTokens.length - 1];
                onSaleTokens.pop();
            }
        }
    }

    function getGemToken(address _tokenOwner) public view returns (GemTokenData[] memory) {
        uint balance = mintGemToken.balanceOf(_tokenOwner);

        require(balance != 0, "Caller did not have token.");

        GemTokenData[] memory gemTokens = new GemTokenData[](balance);

        for(uint i = 0; i < balance; i++) {
            uint tokenId = mintGemToken.tokenOfOwnerByIndex(_tokenOwner, i);
            
            (uint gemRank, uint gemType, uint price) = getGemTokenInfo(tokenId);

            gemTokens[i] = GemTokenData(tokenId, gemRank, gemType, price);
        }

        return gemTokens;
    }

    function getSaleGemTokens() public view returns (GemTokenData[] memory) {
        
        require(onSaleTokens.length > 0, "Not exist on sale token.");

        GemTokenData[] memory gemTokens = new GemTokenData[](onSaleTokens.length);

        for(uint i = 0; i < onSaleTokens.length; i++) {
            uint tokenId = onSaleTokens[i];

            (uint gemRank, uint gemType, uint price) = getGemTokenInfo(tokenId);
            
            gemTokens[i] = GemTokenData(tokenId, gemRank, gemType, price);
        }

        return gemTokens;
    }

    function getLatestMintedGemToken(address _tokenOwner) public view returns(GemTokenData memory) {
        uint balance = mintGemToken.balanceOf(_tokenOwner);
        uint tokenId = mintGemToken.tokenOfOwnerByIndex(_tokenOwner, balance - 1);
        (uint gemRank, uint gemType, uint price) = getGemTokenInfo(tokenId);

        return GemTokenData(tokenId, gemRank, gemType, price);
    }

    function getGemTokenInfo(uint _tokenId) private view returns (uint, uint, uint) {
        uint gemRank = mintGemToken.getGemTokenRank(_tokenId);
        uint gemType = mintGemToken.getGemTokenType(_tokenId);
        uint price = tokenPrices[_tokenId];

        return (gemRank, gemType, price);
    }
}