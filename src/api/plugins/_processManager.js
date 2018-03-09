import { callOverwolfWithPromise } from '../utilities';

export let processManager = null;

(async () => {
  const result = await callOverwolfWithPromise(overwolf.extensions.current.getExtraObject);
  processManager = result.window.id;
})();
