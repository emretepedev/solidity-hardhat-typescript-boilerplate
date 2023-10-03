import { ethers } from 'hardhat';

async function main() {
  const fooTokenName = 'FooToken';
  const fooTokenConstructorArgs: any[] = ['100000000000000'];
  const fooTokenFactory = await ethers.getContractFactory(fooTokenName);
  const fooToken = await fooTokenFactory.deploy(fooTokenConstructorArgs[0]);
  await fooToken.waitForDeployment();
  const fooTokenAddress = await fooToken.getAddress();
  console.log(fooTokenName + ' deployed to:', fooTokenAddress);

  const workshopName = 'Workshop';
  const workshopConstructorArgs: any[] = [fooTokenAddress];
  const workshopFactory = await ethers.getContractFactory(workshopName);
  const workshop = await workshopFactory.deploy(workshopConstructorArgs[0]);
  await workshop.waitForDeployment();
  const workshopAddress = await workshop.getAddress();
  console.log(workshopName + ' deployed to:', workshopAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
