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

export const ETHEREUM_MINER = 'ETHEREUM_MINER';
export const ethereum = {
  name: 'Ethereum',
  identifier: ETHEREUM_MINER,
  logo: 'assets/ethereum.png',
  currency: 'ETH',
  minimumPaymentThreshold: 0.05,
  parser: generateParser({
    [SPEED_REGEX]: /Speed\s+(.+)\sMh\/s/,
    [CONNECTION_FAILED_REGEX]: /Could not resolve host/,
    [CONNECTING]: /not-connected/
  }),
  path: 'ethereum/ethminer.exe',
  args: address =>
    `--farm-recheck 200 -G -S eu1.ethermine.org:4444 -SF us1.ethermine.org:4444 -O ${address}.raccoon`,
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
    wallet: 'https://www.myetherwallet.com/',
    stats: address => address
  },
  isValidAddress: address => /^0x[0-9a-fA-F]{40}$/i.test(address),
  addressHint: 'It should start with 0x and have 42 characters.',
  developerAddress: '0x799db2f010a5a9934eca801c5d702a7d96373b9d'
};
