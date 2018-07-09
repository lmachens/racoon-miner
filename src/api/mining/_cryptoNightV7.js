import {
  CONNECTING,
  CONNECTION_FAILED_REGEX,
  SPEED_REGEX,
  generateParser
} from './_generateParser';

export const CRYPTO_NIGHT_V7 = 'CRYPTO_NIGHT_V7';
const locations = ['eu', 'usa', 'hk', 'jp', 'in', 'br'];
const pool = `stratum+tcp://cryptonightv7.${locations[0]}.nicehash.com:3363`;

export const cryptoNightV7 = {
  name: 'CryptoNightV7',
  identifier: CRYPTO_NIGHT_V7,
  speedUnit: 'H/s',
  parser: generateParser({
    [SPEED_REGEX]: /Totals \(ALL\):\s+(.+)\s/,
    [CONNECTION_FAILED_REGEX]: /Could not resolve host/,
    [CONNECTING]: /not-connected/
  }),
  path: 'xmr-stak/xmr-stak.exe',
  args: ({ address, cores, gpus }) =>
    `--amd gpus/amd${gpus}.txt --cpu cpus/cpu${cores}.txt --nvidia gpus/nvidia${gpus}.txt --config config.txt --poolconf nice-hash.txt --noUAC -i 0 -o "${pool}" -u "${address}.raccoon" --currency cryptonight_v7 --rigid raccoon -p x --use-nicehash`,
  environmentVariables: () => JSON.stringify({ XMRSTAK_NOWAIT: true })
};
