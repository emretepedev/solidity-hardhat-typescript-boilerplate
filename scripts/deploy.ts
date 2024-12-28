import { viem } from 'hardhat';
import fooTokenArgs from '../ignition/modules/FooTokenArgs';

async function main() {
  const fooTokenContractName = 'FooToken';
  const fooToken = await viem.deployContract(
    fooTokenContractName,
    fooTokenArgs
  );
  console.log(`${fooTokenContractName} deployed to: ${fooToken.address}`);

  const workshopContractName = 'Workshop';
  const workshop = await viem.deployContract(workshopContractName, [
    fooToken.address,
  ]);
  console.log(`${workshopContractName} deployed to: ${workshop.address}`);
}

main().catch(console.error);
