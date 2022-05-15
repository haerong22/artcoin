#### version

- truffle: 5.5.14
- geth: 1.10.17
- ganache: 7.1.0
- solidity: 0.5.16
- node.js: 17.0.1
- web3.js: 1.5.3

#### geth를 통한 이더리움 계정 생성

- geth account new --datadir {directory}

#### genesis.json 생성

```json
{
  "config": {
    "chainId": 100,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "berlinBlock": 0,
    "londonBlock": 0
  },
  "alloc": {
    "{account}": { "balance": "100" }
  },
  "coinbase": "0x0000000000000000000000000000000000000000",
  "difficulty": "0x20000",
  "extraData": "",
  "gasLimit": "0x2fefd8",
  "nonce": "0x0000000000000042",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp": "0x00"
}
```

#### 프라이빗 네트워크 시작

- geth --datadir {directory} init {genesis.json path}

#### 프라이빗 네트워크 접속

- geth --datadir={directory} -verbosity 6 --ipcdisable --port 30300 --http.port 8100 console 2>> {log path}

#### 기본 명령어

계정리스트:

- personal.listAccounts

계정의 잔여 이더:

- eth.getBalance({account})

노드 주소:

- admin.nodeInfo.enode

노드 통신 확인:

- net.listening

피어 개수 확인:

- net.peerCount

피어 노드 확인:

- admin.peers

#### 노드 추가

- 새로운 디렉토리에 genesis.json 복사

다른 포트번호로 실행

- geth --datadir="{directory}" --ipcdisable --port 30301 console 2>>"{log path}"

노드 추가

- admin.addPeer({node address})

#### 재실행시 피어 노드 유지

- static-nodes.json

```json
["{node address}", "{node address}"]
```
