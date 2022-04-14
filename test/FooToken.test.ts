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

if (!process.env.CONTRACT_1_NAME) throw Error('CONTRACT_1_NAME is not defined');

const contractName: string = process.env.CONTRACT_1_NAME;

describe(contractName, () => {
  const value: BigNumber = ethers.BigNumber.from('1');
  let contract1: Contract;
  let sender: Signer, receiver: Signer;

  beforeEach(async () => {
    [sender, receiver] = await ethers.getSigners();
    const Contract1: ContractFactory = await ethers.getContractFactory(
      contractName
    );
    contract1 = await Contract1.deploy(process.env.CONTRACT_1_TOKEN_SUPPLY);
    await contract1.deployed();
  });

  it('the token name should be correct', () => {
    contract1.name().then((name: string) => {
      assert.equal(
        name,
        process.env.CONTRACT_1_TOKEN_NAME,
        'The token name must be valid.'
      );
      expect;
    });
  });

  it('the token symbol should be correct', async () => {
    const symbol = await contract1.symbol();

    assert.equal(
      symbol,
      process.env.CONTRACT_1_TOKEN_SYMBOL,
      'The token symbol must be valid.'
    );
  });

  it('the token decimal should be correct', async () => {
    const decimals = await contract1.decimals();

    assert.equal(
      decimals,
      process.env.CONTRACT_1_TOKEN_DECIMAL,
      'The token decimal must be valid.'
    );
  });

  it('the token supply should be correct', async () => {
    const supply = (await contract1.totalSupply()).toNumber();

    assert.equal(
      supply,
      process.env.CONTRACT_1_TOKEN_SUPPLY,
      'The token supply must be valid.'
    );
  });

  it('reverts when transferring tokens to the zero address', async () => {
    const senderAddress = await sender.getAddress();

    // Conditions that trigger a require statement can be precisely tested
    await expect(
      contract1.transfer(constants.AddressZero, value, {
        from: senderAddress,
      })
    ).to.be.revertedWith('ERC20: transfer to the zero address');
  });

  it('emits a Transfer event on successful transfers', async () => {
    const senderAddress = await sender.getAddress();
    const receiverAddress = await receiver.getAddress();

    await expect(
      contract1.transfer(receiverAddress, value, {
        from: senderAddress,
      })
    )
      .to.emit(contract1, 'Transfer')
      .withArgs(senderAddress, receiverAddress, value);
  });
});
