import {
  anyUint,
  anyValue,
} from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import {
  loadFixture,
  reset,
} from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect, assert } from 'chai';
import { ZeroAddress } from 'ethers';
import { ethers } from 'hardhat';
import { FooToken, FooToken__factory } from '../typechain-types';

describe('FooToken', () => {
  let fooToken: FooToken;
  let fooTokenFactory: FooToken__factory;
  let owner: HardhatEthersSigner;
  let addresses: HardhatEthersSigner[];

  // hooks
  before(async () => {
    [owner, ...addresses] = await ethers.getSigners();
    fooTokenFactory = (await ethers.getContractFactory(
      'FooToken'
    )) as FooToken__factory;
  });

  beforeEach(async () => {
    await reset();

    fooToken = await fooTokenFactory.deploy(10n ** 18n);
  });

  // fixtures
  async function transferFixture() {
    return await fooToken.transfer(addresses[0].address, 2n);
  }

  // tests
  it('the token name should be correct', async () => {
    // expect
    expect(await fooToken.name()).to.equal('Foo Token');
  });

  it('the token symbol should be correct', async () => {
    // assert
    assert.equal(
      await fooToken.symbol(),
      'FOO',
      'The token symbol must be valid.'
    );
  });

  it('the token decimal should be correct', async () => {
    expect(await fooToken.decimals()).to.equal(1n);
  });

  it('the token supply should be correct', async () => {
    expect(await fooToken.totalSupply()).to.equal(10n ** 18n);
  });

  it('reverts when transferring tokens to the zero address', async () => {
    await expect(fooToken.transfer(ZeroAddress, 1n)).to.be.revertedWith(
      'ERC20: transfer to the zero address'
    );
  });

  it('emits a Transfer event on successful transfers', async () => {
    const to = addresses[0];
    const value = 1n;

    await expect(fooToken.transfer(to.address, value))
      .to.emit(fooToken, 'Transfer')
      .withArgs(anyValue, to.address, anyUint);
  });

  it('token balance successfully changed', async () => {
    const from = owner;
    const to = addresses[0];
    const value = 2n;

    await expect(loadFixture(transferFixture)).to.changeTokenBalances(
      fooToken,
      [from, to],
      [-value, value]
    );
  });
});
