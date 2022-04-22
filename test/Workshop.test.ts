import { expect, assert } from 'chai';
import { Contract, ContractFactory, constants } from 'ethers';
import { ethers } from 'hardhat';

const workshop: string = 'Workshop';
const workshopConstructorArgs: Array<string | number> = ['100000000000000'];

describe(workshop, () => {
  let workshopContract: Contract;
  let address: string, address1: string;

  before(async () => {
    const [signer, signer1] = await ethers.getSigners();

    [address, address1] = [
      await signer.getAddress(),
      await signer1.getAddress(),
    ];
  });

  beforeEach(async () => {
    const workshopContractFactory: ContractFactory =
      await ethers.getContractFactory(workshop);
    workshopContract = await workshopContractFactory.deploy(
      ...workshopConstructorArgs
    );
    await workshopContract.deployed();
  });

  it('the token name should be correct', async () => {
    const name: string = await workshopContract.name();

    assert.equal(name, 'Foo Token', 'The token name must be valid.');
  });

  it('the token symbol should be correct', async () => {
    const symbol: string = await workshopContract.symbol();

    assert.equal(symbol, 'FOO', 'The token symbol must be valid.');
  });

  it('the token decimal should be correct', async () => {
    const decimals: string = await workshopContract.decimals();

    assert.equal(decimals, '8', 'The token decimal must be valid.');
  });

  it('the token supply should be correct', async () => {
    const supply: string = await workshopContract.totalSupply();

    assert.equal(supply, '100000000000000', 'The token supply must be valid.');
  });

  it('reverts when transferring tokens to the zero address', async () => {
    // Conditions that trigger a require statement can be precisely tested
    await expect(
      workshopContract.transfer(constants.AddressZero, constants.One, {
        from: address,
      })
    ).to.be.revertedWith('ERC20: transfer to the zero address');
  });

  it('emits a Transfer event on successful transfers', async () => {
    await expect(
      workshopContract.transfer(address1, constants.One, {
        from: address,
      })
    )
      .to.emit(workshopContract, 'Transfer')
      .withArgs(address, address1, constants.One);
  });
});
