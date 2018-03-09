import { callOverwolfWithPromise } from '../utilities';

export let processManager = null;

(async () => {
  const result = await callOverwolfWithPromise(
    overwolf.extensions.current.getExtraObject,
    'process-manager-plugin'
  );
  processManager = result.object;
})();
