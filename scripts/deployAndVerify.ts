import { TASK_VERIFY_VERIFY } from '@nomicfoundation/hardhat-verify/internal/task-names';
import { ethers, run } from 'hardhat';

async function main() {
  const fooTokenContractName = 'FooToken';
  const fooTokenConstructorArgs: any[] = ['100000000000000'];
  const fooTokenFactory = await ethers.getContractFactory(fooTokenContractName);
  const fooToken = await fooTokenFactory.deploy(fooTokenConstructorArgs[0]);
  await fooToken.waitForDeployment();
  const fooTokenAddress = await fooToken.getAddress();
  console.log(fooTokenContractName + ' deployed to:', fooTokenAddress);

  const workshopContractName = 'Workshop';
  const workshopConstructorArgs: any[] = [fooTokenAddress];
  const workshopFactory = await ethers.getContractFactory(workshopContractName);
  const workshop = await workshopFactory.deploy(workshopConstructorArgs[0]);
  await workshop.waitForDeployment();
  const workshopAddress = await workshop.getAddress();
  console.log(workshopContractName + ' deployed to:', workshopAddress);

  setTimeout(async () => {
    await run(TASK_VERIFY_VERIFY, {
      address: fooTokenAddress,
      constructorArguments: fooTokenConstructorArgs,
    });

    await run(TASK_VERIFY_VERIFY, {
      address: workshopAddress,
      constructorArguments: workshopConstructorArgs,
    });
  }, 1000 * 60);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
