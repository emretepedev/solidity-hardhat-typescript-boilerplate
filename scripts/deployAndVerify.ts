// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract, ContractFactory } from 'ethers';
import { ethers, tenderly, run } from 'hardhat';

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const fooTokenContractName: string = 'FooToken';
  const fooTokenConstructorArgs: Array<
    string | number | Array<string | number>
  > = ['100000000000000'];
  const fooTokenFactory: ContractFactory = await ethers.getContractFactory(
    fooTokenContractName
  );
  const fooToken: Contract = await fooTokenFactory.deploy(
    ...fooTokenConstructorArgs
  );
  await fooToken.deployed();
  console.log(fooTokenContractName + ' deployed to:', fooToken.address);

  const workshopContractName: string = 'Workshop';
  const workshopConstructorArgs: Array<
    string | number | Array<string | number>
  > = [fooToken.address];
  const workshopFactory: ContractFactory = await ethers.getContractFactory(
    workshopContractName
  );
  const workshop: Contract = await workshopFactory.deploy(
    ...workshopConstructorArgs
  );
  await workshop.deployed();
  console.log(workshopContractName + ' deployed to:', workshop.address);

  await setTimeout(async () => {
    // verify contracts on explorer
    await run('verify:verify', {
      address: fooToken.address,
      constructorArguments: fooTokenConstructorArgs,
    });

    await run('verify:verify', {
      address: workshop.address,
      constructorArguments: workshopConstructorArgs,
    });

    // send notice to tenderly for contracts
    await tenderly.verify(
      {
        name: fooTokenContractName,
        address: fooToken.address,
      },
      {
        name: workshopContractName,
        address: workshop.address,
      }
    );
  }, 1000 * 60); // 60 secs
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
