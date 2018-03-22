import { generateParser } from './_generateParser';

export const ETHEREUM_MINER = 'ETHEREUM_MINER';
export const minerGroup = process.env.__ETHEREUM_MINER_GROUP__;
export const ethereum = {
  name: 'Ethereum',
  identifier: ETHEREUM_MINER,
  logo: 'assets/ethereum.png',
  currency: 'Ether',
  minimumPaymentThreshold: 0.05,
  parser: generateParser(/Speed\s+(.+)\sMh\/s/),
  path: 'ethminer.exe',
  args: `--farm-recheck 200 -G -S eu1.ethermine.org:4444 -FS us1.ethermine.org:4444 -O ${minerGroup}.XIGMA`,
  environmentVariables: JSON.stringify({
    GPU_FORCE_64BIT_PTR: '0',
    GPU_MAX_HEAP_SIZE: '100',
    GPU_USE_SYNC_OBJECTS: '1',
    GPU_MAX_ALLOC_PERCENT: '100',
    GPU_SINGLE_ALLOC_PERCENT: '100'
  }),
  api: {
    workerStats: `https://api.ethermine.org/miner/${minerGroup}/worker/:workerId/currentStats`
  }
};
