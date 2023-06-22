https://docs.blockscout.com/

환경 mac m1

COIN=Test \
ETHEREUM_JSONRPC_VARIANT=ganache \
ETHEREUM_JSONRPC_HTTP_URL=http://host.docker.internal:7545 \
ETHEREUM_JSONRPC_WS_URL=ws://host.docker.internal:7545 \
make start
