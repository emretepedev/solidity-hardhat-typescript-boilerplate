import { task, types } from 'hardhat/config';

task('accounts', 'Prints the list of accounts')
  .addOptionalParam('count', 'The count of accounts', undefined, types.int)
  .setAction(async (taskArguments, hre) => {
    let { count }: { count?: number } = taskArguments;
    const accounts = await hre.viem.getWalletClients();
    if (count === undefined) {
      count = accounts.length;
    } else {
      if (accounts.length < count) {
        console.warn(
          `Cannot print ${count} accounts, only ${accounts.length} available`
        );
      }
      count = Math.min(count, accounts.length);
    }

    const rows = [];
    for (let i = 0; i < count; i++) {
      rows.push({ address: accounts[i].account.address });
    }
    console.table(rows);
  });
