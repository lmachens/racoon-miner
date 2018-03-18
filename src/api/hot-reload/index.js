import { APP_PATH, LISTEN_TO_FILES } from '../environment';

import { getSimpleIoPlugin } from '../plugins';
import throttle from 'lodash/throttle';

(async () => {
  const simpleIoPlugin = await getSimpleIoPlugin();

  simpleIoPlugin.onFileListenerChanged.addListener(
    throttle(fileIdentifier => {
      if (LISTEN_TO_FILES.includes(fileIdentifier)) {
        location.reload();
      }
    }),
    5000
  );

  const skipToEndOfFile = true;
  LISTEN_TO_FILES.forEach(fileName => {
    const path = `${APP_PATH}/${fileName}`;
    simpleIoPlugin.listenOnFile(fileName, path, skipToEndOfFile, () => {});
  });

  console.info('%cHot reload is active', 'color: blue');
})();
