//import { generateParser } from './_generateParser';

import localForage from 'localforage';

const moneroLogsStorage = localForage.createInstance({
  name: 'Raccoon Miner',
  storeName: 'monero-logs'
});

const minerGroup = process.env.__MONERO_MINER_GROUP__;

export const MONERO_MINER = 'MONERO_MINER';
export const monero = {
  disabled: true,
  name: 'Monero',
  identifier: MONERO_MINER,
  minerGroup,
  logo: 'assets/monero.png',
  currency: 'XMR',
  minimumPaymentThreshold: 0.1,
  parser: () => {},
  path: '',
  args: minerGroup,
  environmentVariables: () => JSON.stringify({}),
  storage: moneroLogsStorage,
  links: {
    wallet: 'https://getmonero.org/'
  },
  isValidAddress: address => /^(0x){1}[0-9a-fA-F]{40}$/i.test(address)
};
