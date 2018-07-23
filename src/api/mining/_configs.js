import { getSimpleIoPlugin } from '../plugins';

export const CUDA_ISSUE_CONFIG = `
"gpu_threads_conf" : [
  { "index" : 0,
    "threads" : 15, "blocks" : 60,
    "bfactor" : 10, "bsleep" :  100,
    "affine_to_cpu" : false, "sync_mode" : 3,
  },

],
`;

const writeConfig = ({ fileName, content }) => {
  return new Promise(async resolve => {
    getSimpleIoPlugin().then(simpleIoPlugin => {
      simpleIoPlugin.writeLocalAppDataFile(fileName, content, (status, message) => {
        console.log(status, message, fileName, content);
        resolve(status);
      });
    });
  });
};

export const writeAMDConfig = content => {
  return writeConfig({
    fileName: '/plugins/xmr-stak/amd.txt',
    content
  });
};

export const writeNvidiaConfig = content => {
  return writeConfig({
    fileName: '/plugins/xmr-stak/nvidia.txt',
    content
  });
};
