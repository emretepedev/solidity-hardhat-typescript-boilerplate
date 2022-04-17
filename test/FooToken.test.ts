import { config } from 'dotenv';
config();

import { expect, assert } from 'chai';
import { ethers } from 'hardhat';
import {
  BigNumber,
  Contract,
  ContractFactory,
  Signer,
  constants,
} from 'ethers';

const contractName: string = 'FooToken';

describe(contractName, () => {
  const value: BigNumber = ethers.BigNumber.from('1');
  let contract: Contract;
  let signer: Signer, signer1: Signer;
  let address: string, address1: string;

  before(async () => {
    [signer, signer1] = await ethers.getSigners();
    [address, address1] = [
      await signer.getAddress(),
      await signer1.getAddress(),
    ];
  });

  beforeEach(async () => {
    const Contract: ContractFactory = await ethers.getContractFactory(
      contractName
    );
    contract = await Contract.deploy('100000000000000');
    await contract.deployed();
  });

  it('the token name should be correct', () => {
    contract.name().then((name: string) => {
      assert.equal(name, 'Foo Token', 'The token name must be valid.');
    });
  });

  it('the token symbol should be correct', async () => {
    const symbol = await contract.symbol();

    assert.equal(symbol, 'FOO', 'The token symbol must be valid.');
  });

  it('the token decimal should be correct', async () => {
    const decimals = await contract.decimals();

    assert.equal(decimals, '8', 'The token decimal must be valid.');
  });

  it('the token supply should be correct', async () => {
    const supply = (await contract.totalSupply()).toNumber();

    assert.equal(supply, '100000000000000', 'The token supply must be valid.');
  });

  it('reverts when transferring tokens to the zero address', async () => {
    // Conditions that trigger a require statement can be precisely tested
    await expect(
      contract.transfer(constants.AddressZero, value, {
        from: address,
      })
    ).to.be.revertedWith('ERC20: transfer to the zero address');
  });

  it('emits a Transfer event on successful transfers', async () => {
    await expect(
      contract.transfer(address1, value, {
        from: address,
      })
    )
      .to.emit(contract, 'Transfer')
      .withArgs(address, address1, value);
  });
});
