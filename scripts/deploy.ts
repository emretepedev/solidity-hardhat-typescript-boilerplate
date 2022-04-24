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
  const contract1Name: string = 'FooToken';
  const contract1ConstructorArgs: Array<string | number> = ['100000000000000'];
  const contract1Factory: ContractFactory = await ethers.getContractFactory(
    contract1Name
  );
  const contract1: Contract = await contract1Factory.deploy(
    ...contract1ConstructorArgs
  );
  await contract1.deployed();
  console.log(contract1Name + ' deployed to:', contract1.address);

  const contract2Name: string = 'Workshop';
  const contract2ConstructorArgs: Array<string | number> = [contract1.address];
  const contract2Factory: ContractFactory = await ethers.getContractFactory(
    contract2Name
  );
  const contract2: Contract = await contract2Factory.deploy(
    ...contract2ConstructorArgs
  );
  await contract2.deployed();
  console.log(contract2Name + ' deployed to:', contract2.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
