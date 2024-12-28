import { viem } from 'hardhat';
import { vars } from 'hardhat/config';
import { Address } from 'viem';
import workshopArgs, {
  workshopArgsMap,
} from '../../ignition/modules/WorkshopArgs';

async function main() {
  const fooTokenAddressKey = 'FOO_TOKEN_ADDRESS';
  if (!vars.has(fooTokenAddressKey)) {
    throw new Error(`${fooTokenAddressKey} is not set`);
  }

  const fooToken = await viem.getContractAt(
    'FooToken',
    vars.get(fooTokenAddressKey) as Address
  );
  if (
    workshopArgsMap.tokenAddress.toLowerCase() !==
    fooToken.address.toLowerCase()
  ) {
    throw new Error('Address mismatch');
  }

  const workshopContractName = 'Workshop';
  const workshop = await viem.deployContract(
    workshopContractName,
    workshopArgs
  );
  console.log(`${workshopContractName} deployed to: ${workshop.address}`);
}

main().catch(console.error);
