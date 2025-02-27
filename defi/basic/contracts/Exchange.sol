//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./interfaces/IFactory.sol";
import "./interfaces/IExchange.sol";

contract Exchange is ERC20 {
    IERC20 token;
    IFactory factory;

    event TokenPurchase(
        address indexed buyer,
        uint256 indexed ethSold,
        uint256 indexed tokensBought
    );
    event EthPurchase(
        address indexed buyer,
        uint256 indexed ethSold,
        uint256 indexed tokensBought
    );
    event AddLiquidity(
        address indexed provider,
        uint256 indexed ethAmount,
        uint256 indexed tokenAmount
    );
    event RemoveLiquidity(
        address indexed provider,
        uint256 indexed ethAmount,
        uint256 indexed tokenAmount
    );

    constructor(address _token) ERC20("Bobby Uniswap V2", "BOBBY-V2") {
        token = IERC20(_token);
        factory = IFactory(msg.sender);
    }

    // csmm
    function addLiquidity(uint256 _tokenAmount) public payable {
        token.transferFrom(msg.sender, address(this), _tokenAmount);
    }

    // cpmm
    function addLiquidityV2(uint256 _maxTokens) public payable {
        uint256 totalLiquidity = totalSupply();

        if (totalLiquidity > 0) {
            uint256 ethReserve = address(this).balance - msg.value;
            uint256 tokenReserve = token.balanceOf(address(this));
            uint256 tokenAmount = (msg.value * tokenReserve) / ethReserve;
            require(_maxTokens >= tokenAmount);

            token.transferFrom(msg.sender, address(this), tokenAmount);

            uint256 liquidityMinted = (totalLiquidity * msg.value) / ethReserve;
            _mint(msg.sender, liquidityMinted);
        } else {
            uint256 tokenAmount = _maxTokens;
            uint256 initialLiquidity = address(this).balance;
            _mint(msg.sender, initialLiquidity);
            token.transferFrom(msg.sender, address(this), tokenAmount);
        }
    }

    function removeLiquidity(uint256 _lpTokenAmount) public {
        require(_lpTokenAmount > 0);
        uint256 totalLiquidity = totalSupply();
        uint256 ethAmount = (_lpTokenAmount * address(this).balance) /
            totalLiquidity;
        uint256 tokenAmount = (_lpTokenAmount *
            token.balanceOf(address(this))) / totalLiquidity;

        _burn(msg.sender, _lpTokenAmount);

        payable(msg.sender).transfer(ethAmount);
        token.transfer(msg.sender, tokenAmount);
    }

    // ETH -> ERC20 (csmm)
    function ethToTokenSwap() public payable {
        uint256 inputAmount = msg.value;

        uint256 outputAmount = inputAmount;

        token.transfer(msg.sender, outputAmount);
    }

    // ETH -> ERC20 (cpmm)
    function ethToTokenSwapV2(uint256 _minTokens) public payable {
        uint256 outputAmount = getOutputAmount(
            msg.value,
            address(this).balance - msg.value,
            token.balanceOf(address(this))
        );

        require(outputAmount >= _minTokens, "Inffucient output amount");

        token.transfer(msg.sender, outputAmount);
    }

    function ethToTokenSwapWithFee(uint256 _minTokens) public payable {
        ethToTokenWithFee(_minTokens, msg.sender);
    }

    function ethToTokenTransferWithFee(
        uint256 _minTokens,
        address _recipient
    ) public payable {
        require(_recipient != address(0));
        ethToTokenWithFee(_minTokens, _recipient);
    }

    function ethToTokenWithFee(uint256 _minTokens, address _recipient) private {
        uint256 outputAmount = getOutputAmountWithFee(
            msg.value,
            address(this).balance - msg.value,
            token.balanceOf(address(this))
        );

        require(outputAmount >= _minTokens, "Inffucient output amount");

        emit TokenPurchase(_recipient, msg.value, outputAmount);

        token.transfer(_recipient, outputAmount);
    }

    function tokenToEthSwap(
        uint256 _tokenSold,
        uint256 _minEth
    ) public payable {
        uint256 outputAmount = getOutputAmount(
            _tokenSold,
            token.balanceOf(address(this)),
            address(this).balance
        );

        require(outputAmount >= _minEth, "Inffucient output amount");

        token.transferFrom(msg.sender, address(this), _tokenSold);
        payable(msg.sender).transfer(outputAmount);
    }

    // ERC20 -> ERC20
    function tokenToTokenSwap(
        uint256 _tokenSold,
        uint256 _minTokenBought,
        uint256 _minEthBought,
        address _tokenAddress
    ) public payable {
        address toTokenExchangeAddress = factory.getExchange(_tokenAddress);

        uint256 ethOutputAmount = getOutputAmountWithFee(
            _tokenSold,
            token.balanceOf(address(this)),
            address(this).balance
        );

        require(ethOutputAmount >= _minEthBought, "Inffucient output amount");

        token.transferFrom(msg.sender, address(this), _tokenSold);

        IExchange(toTokenExchangeAddress).ethToTokenTransferWithFee{
            value: ethOutputAmount
        }(_minTokenBought, msg.sender);
    }

    function getPrice(
        uint256 inputReserve,
        uint256 outputReserve
    ) public pure returns (uint256) {
        uint256 numerator = inputReserve;
        uint256 denominator = outputReserve;
        return numerator / denominator;
    }

    function getOutputAmount(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    ) public pure returns (uint256) {
        uint256 numerator = outputReserve * inputReserve;
        uint256 denominator = inputReserve + inputAmount;
        return numerator / denominator;
    }

    function getOutputAmountWithFee(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    ) public pure returns (uint256) {
        uint256 inputAmountWithFee = inputAmount * 99;
        uint256 numerator = outputReserve * inputAmountWithFee;
        uint256 denominator = inputReserve * 100 + inputAmountWithFee;
        return numerator / denominator;
    }
}
