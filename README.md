# Coverage Report

| Statements                                                                               | Functions                                                                              | Lines                                                                          |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat) |

# Prerequisites

- Docker

```shell
PATH+=":./bin"    # use sh files (bin/*) directly in the root folder
```

```shell
./build.sh      # install solc and other tools in the docker image
yarn install    # install deps
```

Don't forget to copy the .env.example file to a file named .env, and then edit it to fill in the details.

# Running all the tests

```shell
yarn run test
yarn run test:trace       # shows logs + calls
yarn run test:fresh       # force compile and then run tests
yarn run test:coverage    # run tests with coverage reports
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
yarn run analyze:static <CONTRACT>
yarn run analyze:security <CONTRACT>
yarn run analyze:all <CONTRACT>
```

# Deploy Contract & Verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details.

- Enter your Etherscan API key
- Ropsten node URL (eg from Alchemy)
- The private key of the account which will send the deployment transaction.

With a valid .env file in place, first deploy your contract:

```shell
yarn run deploy ropsten <CONTRACT>    # related to scripts/deploy/<CONTRACT>.ts
yarn run deploy:all ropsten           # related to scripts/deploy.ts
```

Also, you can add contract(s) manually to your tenderly projects from the output.
`https://dashboard.tenderly.co/contract/<NETWORK>/<CONTRACT_ADDRESS>`

And then verify it:

```shell
yarn run verify ropsten <DEPLOYED_CONTRACT_ADDRESS> <CONSTRUCTOR_ARGUMENT(S)>    # hardhat.config.ts to see all networks
```

# Miscellaneous

```shell
yarn run generate:docs    # generate docs. it checks to /contracts folder
```

```shell
yarn run generate:flatten <CONTRACT>    # generate the flatten file
yarn run generate:abi <CONTRACT>        # generate the ABI file
yarn run generate:bin <CONTRACT>        # generate the binary in a hex
```

# TODO

- Increase diversity in the Workshop Contract
- Add npm scripts to linters
- Add Workshop Contract tests
