import { TASK_VERIFY_VERIFY } from '@nomicfoundation/hardhat-verify/internal/task-names';
import { viem, run } from 'hardhat';
import { vars } from 'hardhat/config';
import { Address } from 'viem';
import fooTokenArgs from '../ignition/modules/FooTokenArgs';
import workshopArgs from '../ignition/modules/WorkshopArgs';

async function main() {
  const keys = {
    fooTokenAddressKey: 'FOO_TOKEN_ADDRESS',
    workshopAddressKey: 'WORKSHOP_ADDRESS',
  };
  for (const name in keys) {
    const key = keys[name as keyof typeof keys];
    if (!vars.has(key)) {
      throw new Error(`${key} is not set`);
    }
  }

  const fooToken = await viem.getContractAt(
    'FooToken',
    vars.get(keys.fooTokenAddressKey) as Address
  );

  const workshop = await viem.getContractAt(
    'Workshop',
    vars.get(keys.workshopAddressKey) as Address
  );

  await run(TASK_VERIFY_VERIFY, {
    address: fooToken.address,
    constructorArguments: fooTokenArgs,
  });

  await run(TASK_VERIFY_VERIFY, {
    address: workshop.address,
    constructorArguments: workshopArgs,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
