import { expect, assert } from 'chai';
import { Contract, ContractFactory, Signer, constants } from 'ethers';
import { ethers } from 'hardhat';

const name: string = 'FooToken';
const constructorArgs: Array<string | number> = ['100000000000000'];

describe(name, () => {
  let contract: Contract;
  let address: string, address1: string;

  before(async () => {
    const [signer, signer1]: Signer[] = await ethers.getSigners();

    [address, address1] = [
      await signer.getAddress(),
      await signer1.getAddress(),
    ];
  });

  beforeEach(async () => {
    const factory: ContractFactory = await ethers.getContractFactory(name);
    contract = await factory.deploy(...constructorArgs);
    await contract.deployed();
  });

  it('the token name should be correct', async () => {
    const name: string = await contract.name();

    assert.equal(name, 'Foo Token', 'The token name must be valid.');
  });

  it('the token symbol should be correct', async () => {
    const symbol: string = await contract.symbol();

    assert.equal(symbol, 'FOO', 'The token symbol must be valid.');
  });

  it('the token decimal should be correct', async () => {
    const decimals: string = await contract.decimals();

    assert.equal(decimals, '1', 'The token decimal must be valid.');
  });

  it('the token supply should be correct', async () => {
    const supply: string = await contract.totalSupply();

    assert.equal(supply, '100000000000000', 'The token supply must be valid.');
  });

  it('reverts when transferring tokens to the zero address', async () => {
    // Conditions that trigger a require statement can be precisely tested
    await expect(
      contract.transfer(constants.AddressZero, constants.One, {
        from: address,
      })
    ).to.be.revertedWith('ERC20: transfer to the zero address');
  });

  it('emits a Transfer event on successful transfers', async () => {
    await expect(
      contract.transfer(address1, constants.One, {
        from: address,
      })
    )
      .to.emit(contract, 'Transfer')
      .withArgs(address, address1, constants.One);
  });
});
