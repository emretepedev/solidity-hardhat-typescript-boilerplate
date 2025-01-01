import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers';
import { expect, assert } from 'chai';
import { viem } from 'hardhat';
import { Address, zeroAddress } from 'viem';
import fooTokenArgs, {
  fooTokenArgsMap,
} from '../ignition/modules/FooTokenArgs';

describe('FooToken', () => {
  async function deployFixture() {
    const [deployer, ...walletClients] = await viem.getWalletClients();
    const publicClient = await viem.getPublicClient();

    const fooToken = await viem.deployContract('$FooToken', fooTokenArgs);

    return {
      fooToken,
      fooTokenArgsMap,
      deployer,
      walletClients,
      publicClient,
    };
  }

  describe('Deployment', () => {
    it('Should deploy the contract', async function () {
      const { fooToken } = await loadFixture(deployFixture);

      expect(fooToken.address).to.be.a('string');
    });

    it('Should have the right constants', async function () {
      const { fooToken, fooTokenArgsMap } = await loadFixture(deployFixture);

      expect(await fooToken.read.totalSupply()).to.equal(
        fooTokenArgsMap.initialSupply
      );
    });

    it('Should have the right state variables', async function () {
      const { fooToken, deployer, fooTokenArgsMap } =
        await loadFixture(deployFixture);

      expect(
        await fooToken.read.balanceOf([deployer.account.address])
      ).to.equal(fooTokenArgsMap.initialSupply);
    });
  });

  describe('Exposed Functions', () => {
    it('Should return msg.sender', async function () {
      const { fooToken, deployer } = await loadFixture(deployFixture);

      expect(await fooToken.read.$_msgSender()).to.match(
        new RegExp(deployer.account.address, 'i')
      );
    });
  });

  it('the token name should be correct', async () => {
    const { fooToken } = await loadFixture(deployFixture);

    expect(await fooToken.read.name()).to.equal('Foo Token');
  });

  it('the token symbol should be correct', async () => {
    const { fooToken } = await loadFixture(deployFixture);

    assert.equal(
      await fooToken.read.symbol(),
      'FOO',
      'The token symbol must be valid.'
    );
  });

  it('the token decimal should be correct', async () => {
    const { fooToken } = await loadFixture(deployFixture);

    expect(await fooToken.read.decimals()).to.equal(1);
  });

  it('reverts when transferring tokens to the zero address', async () => {
    const { fooToken } = await loadFixture(deployFixture);

    await expect(fooToken.write.transfer([zeroAddress as Address, 1n])).to.be
      .rejected;
  });

  it('emits a Transfer event on successful transfers', async () => {
    const { fooToken, deployer, publicClient, walletClients } =
      await loadFixture(deployFixture);

    const from = deployer.account;
    const to = walletClients[0].account;
    const value = 1n;
    const hash = await fooToken.write.transfer([to.address, value], {
      account: from,
    });

    await publicClient.waitForTransactionReceipt({
      hash,
    });

    const [transferEvent] = await fooToken.getEvents.Transfer();
    expect(transferEvent.args.from).to.match(new RegExp(from.address, 'i'));
    expect(transferEvent.args.to).to.match(new RegExp(to.address, 'i'));
    expect(transferEvent.args.value).to.equal(value);
  });
});
