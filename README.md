# Coverage Report

| Statements                                                                               | Functions                                                                              | Lines                                                                          |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat) |

# Before all

Note that, this sh files are only guaranteed to work on Debian-based Linux Distributions especially **Ubuntu**.

```shell
install.sh    # install solc-select, mythril, slither and solc (bin/install.sh)
yarn install  # install deps
```

Don't forget to copy the .env.example file to a file named .env, and then edit it to fill in the details.

# Running all the tests

```shell
yarn run test
yarn run test --trace      # shows logs + calls
yarn run test --fulltrace  # shows logs + calls + sloads + sstores
yarn run fresh-test        # force compile and then run tests
yarn run coverage          # run tests with coverage reports
```

# Formatters & Linters

You can use the below packages,

- Solhint
- ESLint
- Prettier
- CSpell
- ShellCheck

```shell
yarn run format
yarn run lint
```

# Analyzers

You can use the below tools,

- Slither
- Mythril

```shell
install.sh (if slither or mythril is not installed)

yarn run analyze:static <CONTRACT_NAME> # (contracts/<CONTRACT_NAME>.sol)
yarn run analyze:security <CONTRACT_NAME> # (contracts/<CONTRACT_NAME>.sol)
yarn run analyze <CONTRACT_NAME> # both (contracts/<CONTRACT_NAME>.sol)
```

# Deploy Contract & Verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details.

- Enter your Etherscan API key
- Ropsten node URL (eg from Alchemy)
- The private key of the account which will send the deployment transaction.

With a valid .env file in place, first deploy your contract:

```shell
yarn run deploy ropsten <CONTRACT_NAME> # it checks to scripts/deploy/<CONTRACT_NAME>.ts
yarn run deploy:all ropsten # it checks to scripts/deploy.ts
```

And then verify it:

```shell
yarn run verify ropsten <DEPLOYED_CONTRACT_ADDRESS> <CONSTRUCTOR_ARGUMENT(S)> # checkout the hardhat.config.ts for all networks
```

# Miscellaneous

```shell
yarn run generate-docs # generate docs. it checks to /contracts folder
```

```shell
install.sh (if slither is not installed)
yarn run generate-flatten <CONTRACT_NAME> # generate flatten file
yarn run generate-abi <CONTRACT_NAME> # generate ABI file
yarn run generate-bin <CONTRACT_NAME> # generate binary in hex
```

# TODO

- Dockerize to .sh files (for compatibility with all OS)
- Tenderly Implementation
- Increase diversity in Workshop file
