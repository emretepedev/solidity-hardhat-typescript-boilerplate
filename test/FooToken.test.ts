import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect, assert } from 'chai';
import { constants, BigNumber } from 'ethers';
import { ethers } from 'hardhat';

// eslint-disable-next-line node/no-missing-import
import type { FooToken, FooToken__factory } from '../typechain-types';

describe('FooToken', () => {
  let fooToken: FooToken;
  let fooTokenFactory: FooToken__factory;
  let owner: SignerWithAddress;
  let addresses: SignerWithAddress[];

  // hooks
  before(async () => {
    [owner, ...addresses] = await ethers.getSigners();
    fooTokenFactory = (await ethers.getContractFactory(
      'FooToken'
    )) as FooToken__factory;
  });

  beforeEach(async () => {
    fooToken = await fooTokenFactory.deploy(10n ** 18n);
  });

  // fixtures
  async function transferFixture() {
    return await fooToken.transfer(addresses[0].address, constants.Two);
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
    expect(await fooToken.decimals()).to.equal(BigNumber.from(1));
  });

  it('the token supply should be correct', async () => {
    expect(await fooToken.totalSupply()).to.equal(10n ** 18n);
  });

  it('reverts when transferring tokens to the zero address', async () => {
    // Conditions that trigger a require statement can be precisely tested
    await expect(
      fooToken.transfer(constants.AddressZero, constants.One)
    ).to.be.revertedWith('ERC20: transfer to the zero address');
  });

  it('emits a Transfer event on successful transfers', async () => {
    const from: SignerWithAddress = owner;
    const to: SignerWithAddress = addresses[0];
    const value: BigNumber = constants.One;

    await expect(fooToken.transfer(to.address, value))
      .to.emit(fooToken, 'Transfer')
      .withArgs(from.address, to.address, value);
  });

  it('token balance successfully changed', async () => {
    const from: SignerWithAddress = owner;
    const to: SignerWithAddress = addresses[0];
    const value: BigNumber = constants.Two;

    await expect(loadFixture(transferFixture)).to.changeTokenBalances(
      fooToken,
      [from, to],
      [-value, value]
    );
  });
});
