// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat';
import { Contract, ContractFactory } from 'ethers';
import { config } from 'dotenv';
config();

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  if (!process.env.CONTRACT_1_NAME)
    throw Error('CONTRACT_1_NAME is not defined');

  const contractName: string = process.env.CONTRACT_1_NAME;

  // We get the contract to deploy
  const Contract1: ContractFactory = await ethers.getContractFactory(
    contractName
  );
  const contract1: Contract = await Contract1.deploy(
    process.env.CONTRACT_1_TOKEN_SUPPLY
  );
  await contract1.deployed();

  console.log(contractName + ' deployed to:', contract1.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
