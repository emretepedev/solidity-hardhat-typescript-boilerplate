import { buildModule } from '@nomicfoundation/ignition-core';
import { vars } from 'hardhat/config';
import workshopArgs from './WorkshopArgs';

const WorkshopModule = buildModule('WorkshopModule', (m) => {
  const fooTokenAddressKey = 'FOO_TOKEN_ADDRESS';
  if (!vars.has(fooTokenAddressKey)) {
    throw new Error(`${fooTokenAddressKey} is not set`);
  }

  const workshop = m.contract('Workshop', workshopArgs);

  return { workshop };
});

export default WorkshopModule;
