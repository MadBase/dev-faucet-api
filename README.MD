# dev-faucet-api

This is a faucet api for developers running an AliceNet test network

## Setup

1. Setup and install both AliceNetJS and the Bridge as described in the [AliceNet](https://github.com/MadBase/MadNet) repository
2. `cp .dotenv .env` and edit as necessary
3. Git clone the dev-faucet-api into the root of the AliceNet repository. File structure should be similar to:

```
application
assets
blockchain
bridge
cmd
. . .
dev-faucet-api <== dev-faucet-api here
. . .
docker
docker-compose.yml
dynamics
types
utils
```

3. `cd dev-faucet-api`
4. `node index.js`

## Calling

The api supports calls to the following endpoint:

GET `/` - Status 
GET `/faucet/{address}` - Fund {address}, 0x prefix optional