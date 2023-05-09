# Lottery with hardhat

### hardhat 실행

```shell
npx hardhat console
```

### 컨트랙트 배포

```shell
Lottery = await ethers.getContractFactory("Lottery")

lottery = await Lottery.deploy()

# 컨트랙트 주소 조회
lottery.address
```

### 컨트랙트 정보

```shell

# 기본으로 제공하는 주소 리스트 가져오기
signers = await ethers.getSigners()

# 주소 잔액 조회
await ethers.provider.getBalance(signers[1].address)

# 블록 정보 조회
await ethers.provider.getBlock(7)
```

### 함수 호출

```shell
# 회차
await lottery.lotteryId()

# 참여
await lottery.connect(signers[1]).enter({value: ethers.utils.parseEther("0.01")})

# 컨트랙트 잔액 조회
await lottery.getBalance()

# 참여자 주소
await lottery.getPlayers()

# 로또 추첨
await lottery.pickWinner()

# 당첨자 확인
await lottery.lotteryHistory(0)
```
