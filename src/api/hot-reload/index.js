import { APP_PATH, LISTEN_TO_FILES } from '../environment';

import { getSimpleIoPlugin } from '../plugins';

(async () => {
  const simpleIoPlugin = await getSimpleIoPlugin();

  simpleIoPlugin.onFileListenerChanged.addListener(fileIdentifier => {
    if (LISTEN_TO_FILES.includes(fileIdentifier)) {
      location.reload();
    }
  });

  const skipToEndOfFile = true;
  LISTEN_TO_FILES.forEach(fileName => {
    const path = `${APP_PATH}/${fileName}`;
    simpleIoPlugin.listenOnFile(fileName, path, skipToEndOfFile, () => {});
  });

  console.info('Hot reload is active');
})();
