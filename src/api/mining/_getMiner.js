import { ETHEREUM_MINER, ethereum } from './_ethereum';

export const getMiner = identifier => {
  switch (identifier) {
    case ETHEREUM_MINER:
      return ethereum;
  }
};
