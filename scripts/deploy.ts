// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const contract1: string = 'Workshop';
  const contract1ConstructorArgs: Array<string | number> = ['100000000000000'];
  const contract1ContractFactory: ContractFactory =
    await ethers.getContractFactory(contract1);
  const contract1Contract: Contract = await contract1ContractFactory.deploy(
    ...contract1ConstructorArgs
  );
  await contract1Contract.deployed();
  console.log(contract1 + ' deployed to:', contract1Contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
