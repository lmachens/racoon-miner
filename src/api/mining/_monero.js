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
  logo: 'assets/monero.png',
  currency: 'XMR',
  minimumPaymentThreshold: 0.1,
  parser: () => {},
  path: '',
  args: '',
  environmentVariables: JSON.stringify({}),
  api: {
    workerStats: `https://supportxmr.com/api/miner/${minerGroup}/stats/:workerId`
  },
  storage: moneroLogsStorage,
  links: {
    wallet: 'https://getmonero.org/'
  }
};
