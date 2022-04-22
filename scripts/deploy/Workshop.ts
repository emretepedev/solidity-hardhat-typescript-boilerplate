import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  const contractName: string = 'Workshop';
  const constructorArgs: Array<string | number> = ['100000000000000'];

  const Contract: ContractFactory = await ethers.getContractFactory(
    contractName
  );
  const contract: Contract = await Contract.deploy(...constructorArgs);
  await contract.deployed();

  console.log(contractName + ' deployed to:', contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
