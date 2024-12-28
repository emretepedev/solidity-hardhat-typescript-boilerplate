import { buildModule } from '@nomicfoundation/ignition-core';
import fooTokenArgs from './FooTokenArgs';

const FooTokenModule = buildModule('FooTokenModule', (m) => {
  const fooToken = m.contract('FooToken', fooTokenArgs);

  return { fooToken };
});

export default FooTokenModule;
