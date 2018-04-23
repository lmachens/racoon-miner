import {
  CONNECTING,
  CONNECTION_FAILED_REGEX,
  SPEED_REGEX,
  generateParser
} from './_generateParser';

import localForage from 'localforage';

const moneroLogsStorage = localForage.createInstance({
  name: 'Raccoon Miner',
  storeName: 'monero-logs'
});

const minerGroup = process.env.__MONERO_MINER_GROUP__;

export const MONERO_MINER = 'MONERO_MINER';
export const monero = {
  name: 'Monero',
  identifier: MONERO_MINER,
  minerGroup,
  logo: 'assets/monero.png',
  currency: 'XMR',
  minimumPaymentThreshold: 0.1,
  parser: generateParser({
    [SPEED_REGEX]: /Totals \(CPU\):\s+(.+)\s/,
    [CONNECTION_FAILED_REGEX]: /Could not resolve host/,
    [CONNECTING]: /not-connected/
  }),
  path: 'monero/xmr-stak.exe',
  args: workerId =>
    `-i 0 -o pool.supportxmr.com:8080 -u 47nCkeWhyJDEoaDPbtm7xc2QyQh2gbRMSdQ8V3NUyuFm6J3UuLiVGn57KjXhLAJD4SZ6jzcukSPRa3auNb1WTfmHRA8ikzr --currency monero7 -p ${workerId} -r raccoon`,
  environmentVariables: () => JSON.stringify({ XMRSTAK_NOWAIT: true }),
  processSendText: 'h',
  storage: moneroLogsStorage,
  links: {
    wallet: 'https://getmonero.org/'
  },
  isValidAddress: address =>
    /^4[0-9AB][123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{93}$/i.test(address)
};
