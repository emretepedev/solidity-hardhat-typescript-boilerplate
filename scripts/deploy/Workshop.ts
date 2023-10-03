import { ethers } from 'hardhat';

async function main() {
  const tokenName = 'FooToken';
  const tokenConstructorArgs: any[] = ['100000000000000'];
  const tokenFactory = await ethers.getContractFactory(tokenName);
  const tokenContract = await tokenFactory.deploy(tokenConstructorArgs[0]);
  await tokenContract.waitForDeployment();
  const tokenContractAddress = await tokenContract.getAddress();
  console.log(tokenName + ' deployed to:', tokenContractAddress);

  const name = 'Workshop';
  const constructorArgs: any[] = [tokenContractAddress];
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
