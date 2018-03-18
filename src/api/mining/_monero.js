//import { generateParser } from './_generateParser';

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
  environmentVariables: JSON.stringify({})
};
