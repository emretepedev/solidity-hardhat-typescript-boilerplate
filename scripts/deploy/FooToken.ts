import { viem } from 'hardhat';
import fooTokenArgs from '../../ignition/modules/FooTokenArgs';

async function main() {
  const contractName = 'FooToken';
  const fooToken = await viem.deployContract(contractName, fooTokenArgs);
  console.log(`${contractName} deployed to: ${fooToken.address}`);
}

main().catch(console.error);
