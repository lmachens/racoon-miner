import {
  CONNECTING,
  CONNECTION_FAILED_REGEX,
  SPEED_REGEX,
  generateParser
} from './_generateParser';

import localForage from 'localforage';

const ethereumLogsStorage = localForage.createInstance({
  name: 'Raccoon Miner',
  storeName: 'ethereum-logs'
});

const minerGroup = process.env.__ETHEREUM_MINER_GROUP__;

export const ETHEREUM_MINER = 'ETHEREUM_MINER';
export const ethereum = {
  name: 'Ethereum',
  identifier: ETHEREUM_MINER,
  minerGroup,
  logo: 'assets/ethereum.png',
  currency: 'ETH',
  minimumPaymentThreshold: 0.05,
  parser: generateParser({
    [SPEED_REGEX]: /Speed\s+(.+)\sMh\/s/,
    [CONNECTION_FAILED_REGEX]: /Could not resolve host/,
    [CONNECTING]: /not-connected/
  }),
  path: 'ethminer.exe',
  args: workerId =>
    `--farm-recheck 200 -G -S eu1.ethermine.org:4444 -SF us1.ethermine.org:4444 -O ${minerGroup}.${workerId}`,
  environmentVariables: () =>
    JSON.stringify({
      GPU_FORCE_64BIT_PTR: '0',
      GPU_MAX_HEAP_SIZE: '100',
      GPU_USE_SYNC_OBJECTS: '1',
      GPU_MAX_ALLOC_PERCENT: '100',
      GPU_SINGLE_ALLOC_PERCENT: '100'
    }),
  storage: ethereumLogsStorage,
  links: {
    wallet: 'https://www.myetherwallet.com/'
  },
  isValidAddress: address => /^(0x){1}[0-9a-fA-F]{40}$/i.test(address)
};
