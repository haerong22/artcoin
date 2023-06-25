## 블록 탐색기

https://docs.blockscout.com/

- 환경 mac m1

```shell
COIN=Test \
ETHEREUM_JSONRPC_VARIANT=ganache \
ETHEREUM_JSONRPC_HTTP_URL=http://host.docker.internal:7545 \
ETHEREUM_JSONRPC_WS_URL=ws://host.docker.internal:7545 \
make start
```

---

## 노드 모니터링

https://github.com/0xPolygon/polygon-edge/releases

### 체인 생성

```shell
./polygon-edge secrets init --insecure --data-dir test-chain-1
```

### 노드 생성

```shell
./polygon-edge genesis --consensus ibft \
--bootnode=/ip4/127.0.0.1/tcp/10001/p2p/{Node ID} \
--ibft-validator={address}:{BLS public key} \
--bootnode=/ip4/127.0.0.1/tcp/10001/p2p/{Node ID} \
--ibft-validator={address}:{BLS public key} \

...

```

### 실행

```shell
./polygon-edge server --data-dir ./test-chain-1 --chain genesis.json --grpc-address :10000 --libp2p :10001 --jsonrpc :10002 --seal

./polygon-edge server --data-dir ./test-chain-2 --chain genesis.json --grpc-address :20000 --libp2p :20001 --jsonrpc :20002 --seal
```

### etherstats

https://github.com/goerli/ethstats-server

```shell
npm install
npm install -g grunt-cli
grunt poa

WS_SECRET="asdf" npm start
```

- http://localhost:3000

### eth net intelligence api

https://github.com/cubedro/eth-net-intelligence-apis

`app.json`

```json
"env": {
      "NODE_ENV": "production",
      "RPC_HOST": "localhost",
      "RPC_PORT": "10002",
      "LISTENING_PORT": "30303",
      "INSTANCE_NAME": "node1",
      "CONTACT_DETAILS": "",
      "WS_SERVER": "http://localhost:3000",
      "WS_SECRET": "asdf",
      "VERBOSITY": 2
    }
```

```shell
npm install
npm install -g pm2

pm2 start app.json
```
