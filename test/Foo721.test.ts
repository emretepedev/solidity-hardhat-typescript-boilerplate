import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect, assert } from 'chai';
import { Contract, ContractFactory, constants } from 'ethers';
import { ethers } from 'hardhat';

const name: string = 'Foo721';

describe(name, () => {
  let contract: Contract;
  let owner: SignerWithAddress;
  let addresses: SignerWithAddress[];
  let factory: ContractFactory;
  const MINT_PRICE = ethers.utils.parseEther('0.001');

  // hooks
  before(async () => {
    [owner, ...addresses] = await ethers.getSigners();
    factory = await ethers.getContractFactory(name);
  });

  beforeEach(async () => {
    const now = Math.floor(+new Date() / 1000);
    contract = await factory.deploy(now + 750);
  });

  // mint tests
  it('should MINT successfully', async () => {
    await ethers.provider.send('evm_increaseTime', [1000]);

    await expect(
      contract.mint(addresses[0].address, 1, { value: String(MINT_PRICE) })
    )
      .to.emit(contract, 'Transfer')
      .withArgs(constants.AddressZero, addresses[0].address, 1);

    await ethers.provider.send('evm_increaseTime', [-1000]);
  });

  it('should not MINT if max supply exceeds', async () => {
    await ethers.provider.send('evm_increaseTime', [1000]);

    await contract.mint(addresses[5].address, 100, {
      value: String(MINT_PRICE.mul(100)),
    });

    await expect(
      contract.mint(addresses[7].address, 1, {
        value: String(MINT_PRICE.mul(1)),
      })
    ).to.be.revertedWith('MaxSupplyExceeded');
    await ethers.provider.send('evm_increaseTime', [-1000]);
  });

  it('should not MINT if InsufficientFunds', async () => {
    await ethers.provider.send('evm_increaseTime', [1000]);

    await expect(contract.mint(addresses[0].address, 1)).to.be.revertedWith(
      'InsufficientFunds'
    );

    await ethers.provider.send('evm_increaseTime', [-1000]);
  });

  it('should Free Mint', async () => {
    await ethers.provider.send('evm_increaseTime', [1000]);

    await expect(contract.freeMint(addresses[0].address))
      .to.emit(contract, 'Transfer')
      .withArgs(constants.AddressZero, addresses[0].address, 1);

    await ethers.provider.send('evm_increaseTime', [-1000]);
  });

  it('should Not Free Mint if already Minted', async () => {
    await ethers.provider.send('evm_increaseTime', [1000]);

    await contract.freeMint(addresses[0].address);

    await expect(contract.freeMint(addresses[0].address)).to.be.revertedWith(
      'AlreadyFreeMinted'
    );

    await ethers.provider.send('evm_increaseTime', [-1000]);
  });

  it('should Not Free Mint if FreeMintExceeded', async () => {
    await ethers.provider.send('evm_increaseTime', [1000]);

    for (let index = 0; index < 5; index++) {
      await contract.freeMint(addresses[index].address);
    }

    await expect(contract.freeMint(addresses[6].address)).to.be.revertedWith(
      'FreeMintExceeded'
    );

    await ethers.provider.send('evm_increaseTime', [-1000]);
  });

  // withdraw tests
  it('should withdraw eth successfully', async () => {
    await ethers.provider.send('evm_increaseTime', [1000]);

    await contract.mint(addresses[5].address, 1, {
      value: String(MINT_PRICE.mul(1)),
    });

    const beforeBalance = await ethers.provider.getBalance(owner.address);

    const tx = await contract.withdraw();

    const afterBalance = await ethers.provider.getBalance(owner.address);

    const receipt = await tx.wait();

    const fee = receipt.effectiveGasPrice * receipt.gasUsed;

    assert.equal(
      (await beforeBalance).add(MINT_PRICE).sub(fee).toString(),
      afterBalance.toString()
    );
    await ethers.provider.send('evm_increaseTime', [-1000]);
  });
});
