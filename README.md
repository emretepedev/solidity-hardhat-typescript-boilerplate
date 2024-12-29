# Prerequisites

- Docker

```shell
yarn install
yarn run setup-analyzers  # install slither, mythril, solc, and other tools in the docker image
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
yarn hardhat coverage  # run tests and generate coverage report
```

# Documentation

```shell
yarn run docgen  # generate docs according to the contracts/ folder
```

# Local Network & Blockscout Explorer

```shell
yarn hardhat node  # start a local network
```

```shell
yarn run blockscout:start  # start the blockscout explorer for the local network
```

```shell
yarn run blockscout:stop
```

```shell
yarn run blockscout:reset
```

```shell
yarn run blockscout:refresh  # use this after restarting your node
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
yarn hardhat finder --colorify --compact --prettify --write-to-file --contract-path contracts/Workshop.sol --contract-name Workshop abi bytecode metadata  # find outputs of specific contract and write to file
```

```shell
yarn hardhat storage-lock # create lock file of storage layout for your contracts
```

```shell
yarn hardhat storage-check  # check by comparing with existing lock file of storage layout
```

```shell
yarn run flatten path/to/contract  # generate a flattened version of the contract
```

```shell
yarn run share  # share the project with remix-ide
```

# TODO

Contributions to this project are welcome! You can help by adding new features or fixing bugs. Here are some suggestions:

- Enhance diversity in the Workshop Contract
- Add tests for the Workshop Contract
- Include examples of Upgradeable Contracts
- Integrate OpenZeppelin Defender
- Integrate Tenderly
