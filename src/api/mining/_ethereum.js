import { generateParser } from './_generateParser';

export const ETHEREUM_MINER = 'ETHEREUM_MINER';
export const ethereum = {
  name: 'Ethereum',
  identifier: ETHEREUM_MINER,
  logo: 'assets/ethereum.png',
  currency: 'Ether',
  parser: generateParser(/Speed\s+(.+)\sMh\/s/),
  path: 'ethminer.exe',
  args:
    '--farm-recheck 200 -G -S eu1.ethermine.org:4444 -FS us1.ethermine.org:4444 -O 0x799db2f010a5a9934eca801c5d702a7d96373b9d.XIGMA',
  environmentVariables: JSON.stringify({
    GPU_FORCE_64BIT_PTR: '0',
    GPU_MAX_HEAP_SIZE: '100',
    GPU_USE_SYNC_OBJECTS: '1',
    GPU_MAX_ALLOC_PERCENT: '100',
    GPU_SINGLE_ALLOC_PERCENT: '100'
  })
};
