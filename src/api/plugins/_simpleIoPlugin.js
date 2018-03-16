import { callOverwolfWithPromise } from '../utilities';

export let simpleIoPlugin;
export const getSimpleIoPlugin = () => {
  return new Promise(async resolve => {
    if (simpleIoPlugin) return resolve(simpleIoPlugin);
    const result = await callOverwolfWithPromise(
      overwolf.extensions.current.getExtraObject,
      'simple-io-plugin'
    );
    simpleIoPlugin = result.object;
    resolve(result.object);
  });
};
