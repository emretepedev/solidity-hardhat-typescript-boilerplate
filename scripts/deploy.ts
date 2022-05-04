// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract, ContractFactory } from 'ethers';
import { ethers, tenderly } from 'hardhat';

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const c1Name: string = 'FooToken';
  const c1ConstructorArgs: Array<string | number> = ['100000000000000'];
  const c1Factory: ContractFactory = await ethers.getContractFactory(c1Name);
  const c1: Contract = await c1Factory.deploy(...c1ConstructorArgs);
  await c1.deployed();
  console.log(c1Name + ' deployed to:', c1.address);

  const c2Name: string = 'Workshop';
  const c2ConstructorArgs: Array<string | number> = [c1.address];
  const c2Factory: ContractFactory = await ethers.getContractFactory(c2Name);
  const c2: Contract = await c2Factory.deploy(...c2ConstructorArgs);
  await c2.deployed();
  console.log(c2Name + ' deployed to:', c2.address);

  await tenderly.verify(
    {
      name: c1Name,
      address: c1.address,
    },
    {
      name: c2Name,
      address: c2.address,
    }
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
