import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect, assert } from 'chai';
import { Contract, ContractFactory, constants } from 'ethers';
import { ethers } from 'hardhat';

const name: string = 'FooToken';
const constructorArgs: Array<string | number> = ['100000000000000'];

describe(name, () => {
  let contract: Contract;
  let owner: SignerWithAddress;
  let addresses: SignerWithAddress[];

  before(async () => {
    [owner, ...addresses] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const factory: ContractFactory = await ethers.getContractFactory(name);
    contract = await factory.deploy(...constructorArgs);
    await contract.deployed();
  });

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
    expect(await contract.decimals()).to.equal(1);
  });

  it('the token supply should be correct', async () => {
    expect(await contract.totalSupply()).to.equal('100000000000000');
  });

  it('reverts when transferring tokens to the zero address', async () => {
    // Conditions that trigger a require statement can be precisely tested
    await expect(
      contract.transfer(constants.AddressZero, constants.One, {
        from: owner.address,
      })
    ).to.be.revertedWith('ERC20: transfer to the zero address');
  });

  it('emits a Transfer event on successful transfers', async () => {
    const from: string = owner.address;
    const to: string = addresses[0].address;

    await expect(
      contract.transfer(to, constants.One, {
        from,
      })
    )
      .to.emit(contract, 'Transfer')
      .withArgs(from, to, constants.One);
  });
});
