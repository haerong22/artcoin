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
