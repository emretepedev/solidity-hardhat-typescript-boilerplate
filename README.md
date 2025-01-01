# Prerequisites

- [Docker](https://github.com/docker)

```shell
yarn install
```

```shell
# install slither, mythril, solc, and other tools in the docker image
yarn run setup-analyzers
```

Don't forget to copy the `.env.example` file to `.env`, then edit it to provide the required details.

# Analyzers

Before using the analyzers, make sure to complete the **Prerequisites** step.

- [Slither](https://github.com/crytic/slither)
- [Mythril](https://github.com/Consensys/mythril)

```shell
yarn run slither path/to/contract
yarn run mythril path/to/contract
```

# Lint & Format

- [Solhint](https://github.com/protofire/solhint)
- [ESLint](https://github.com/eslint/eslint)
- [Prettier](https://github.com/prettier/prettier)

```shell
yarn run lint
yarn run lint:fix
```

# Tests

```shell
yarn hardhat test
```

```shell
# run tests and generate coverage report
yarn run coverage
```

# Documentation

```shell
# generate docs according to the contracts/ folder
yarn hardhat docgen
```

# Local Network & Blockscout Explorer

```shell
# start a local network at http://localhost:8545
yarn hardhat node
```

```shell
# start the blockscout explorer at http://localhost:80 for the local network
yarn run blockscout:start
```

```shell
yarn run blockscout:stop
```

```shell
yarn run blockscout:reset
```

```shell
# use this after restarting your node
yarn run blockscout:refresh
```

```shell
# deploy the contract to the local network
yarn run node:run scripts/deploy.ts
```

```shell
# verify the contract on the local network
yarn run node:verify --constructor-args ignition/modules/FooTokenArgs.ts <FOO_TOKEN_CONTRACT_ADDRESS>
```

```shell
# analyze the on-chain contract on the local network
yarn mythril --address <FOO_TOKEN_CONTRACT_ADDRESS> --rpc host.docker.internal:8545
```

# Deploy Contract & Verification

To verify a contract, you first need to deploy it to a network.

In this project, copy the .env.example file to .env, then edit it to provide the required details:

- Enter the API key you obtained from an explorer (e.g., Etherscan) in the corresponding variable. (e.g., ETHERSCAN_API_KEY)
- Provide the RPC URL of the network you want to deploy to. (e.g., MAINNET_RPC_URL)
- Specify the private key of the account that will send the deployment transaction (DEPLOYER_WALLET_PRIVATE_KEY).

With a properly configured .env file, deploy your contract by running:

```shell
yarn hardhat run --network <YOUR_NETWORK> scripts/deploy.ts
```

You can also manually add the contract(s) to your Tenderly project using the output URL:
`https://dashboard.tenderly.co/contract/<NETWORK_NAME>/<CONTRACT_ADDRESS>`

Finally, verify the contract:

```shell
yarn hardhat verify --network <YOUR_NETWORK> <YOUR_CONTRACT_ADDRESS> "<CONSTRUCTOR_ARGUMENT(S)>"
```

# Miscellaneous

```shell
# find outputs of specific contract and write to file
yarn hardhat finder --contract-path contracts/FooToken.sol --contract-name FooToken --write-to-file abi bytecode metadata --colorify --compact --prettify
```

```shell
# create lock file of storage layout for your contracts
yarn hardhat storage-lock
```

```shell
# check by comparing with existing lock file of storage layout
yarn hardhat storage-check
```

```shell
# generate a flattened version of the contract
yarn run flatten path/to/contract
```

```shell
# share the project with remix-ide
yarn run share
```

# TODO

Contributions to this project are welcome! You can help by adding new features or fixing bugs. Here are some suggestions:

- Enhance diversity in the Workshop Contract
- Add tests for the Workshop Contract
- Include examples of Upgradeable Contracts
- Integrate OpenZeppelin Defender
- Integrate Tenderly
- Add the "Plugins" section
