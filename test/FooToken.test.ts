import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect, assert } from 'chai';
import { loadFixture } from 'ethereum-waffle';
import { Contract, ContractFactory, constants, BigNumber } from 'ethers';
import { ethers } from 'hardhat';

const name: string = 'FooToken';
const constructorArgs: Array<string | number> = ['100000000000000'];

describe(name, () => {
  let contract: Contract;
  let owner: SignerWithAddress;
  let addresses: SignerWithAddress[];
  let factory: ContractFactory;

  // hooks
  before(async () => {
    [owner, ...addresses] = await ethers.getSigners();
    factory = await ethers.getContractFactory(name);
  });

  beforeEach(async () => {
    contract = await factory.deploy(...constructorArgs);
  });

  // fixtures
  async function transferFixture() {
    await contract.transfer(addresses[0].address, constants.Two);
  }

  // tests
  it('the token name should be correct', async () => {
    // expect
    expect(await contract.name()).to.equal('Foo Token');
  });

  it('the token symbol should be correct', async () => {
    // assert
    assert.equal(
      await contract.symbol(),
      'FOO',
      'The token symbol must be valid.'
    );
  });

  it('the token decimal should be correct', async () => {
    expect(await contract.decimals()).to.equal(BigNumber.from(1));
  });

  it('the token supply should be correct', async () => {
    expect(await contract.totalSupply()).to.equal(
      BigNumber.from('100000000000000')
    );
  });

  it('reverts when transferring tokens to the zero address', async () => {
    // Conditions that trigger a require statement can be precisely tested
    await expect(
      contract.transfer(constants.AddressZero, constants.One)
    ).to.be.revertedWith('ERC20: transfer to the zero address');
  });

  it('emits a Transfer event on successful transfers', async () => {
    const from: SignerWithAddress = owner;
    const to: SignerWithAddress = addresses[0];
    const value: BigNumber = constants.One;

    await expect(contract.transfer(to.address, value))
      .to.emit(contract, 'Transfer')
      .withArgs(from.address, to.address, value);
  });

  it('token balance successfully changed', async () => {
    const from: SignerWithAddress = owner;
    const to: SignerWithAddress = addresses[0];
    const value: BigNumber = constants.Two;

    await expect(() => loadFixture(transferFixture)).to.changeTokenBalances(
      contract,
      [from, to],
      [-value, value]
    );
  });
});
