import { task, types } from 'hardhat/config';

task('accounts', 'Prints the list of accounts')
  .addOptionalParam('count', 'The count of accounts', undefined, types.int)
  .setAction(async (taskArguments, hre) => {
    let { count }: { count?: number } = taskArguments;
    const accounts = await hre.ethers.getSigners();
    const accountsLength = accounts.length;
    count =
      (count = count ?? accountsLength) < accountsLength
        ? count
        : accountsLength;

    for (let i = 0; i < count && i < accountsLength; i++) {
      console.log(accounts[i].address);
    }
  });
