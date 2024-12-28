import { vars } from 'hardhat/config';
import { Address } from 'viem';

const workshopArgs: [Address] = [vars.get('FOO_TOKEN_ADDRESS') as Address];

export const workshopArgsMap = {
  tokenAddress: workshopArgs[0],
};

export default workshopArgs;
