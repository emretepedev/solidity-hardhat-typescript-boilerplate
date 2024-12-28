import { task, types } from 'hardhat/config';

task('accounts', 'Prints the list of accounts')
  .addOptionalParam('count', 'The count of accounts', undefined, types.int)
  .setAction(async (taskArguments, hre) => {
    let { count }: { count?: number } = taskArguments;
    const accounts = await hre.viem.getWalletClients();
    count =
      (count = count ?? accounts.length) < accounts.length
        ? count
        : accounts.length;

    for (let i = 0; i < count && i < accounts.length; i++) {
      console.log(accounts[i].account.address);
    }
  });
