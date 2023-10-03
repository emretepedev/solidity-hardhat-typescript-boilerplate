import { ethers } from 'hardhat';

async function main() {
  const name = 'FooToken';
  const constructorArgs: any[] = ['100000000000000'];
  const factory = await ethers.getContractFactory(name);
  const contract = await factory.deploy(constructorArgs[0]);
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log(name + ' deployed to:', contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
