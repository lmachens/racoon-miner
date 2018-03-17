const interval = 1000;

let hardwareInfoListener = null;
const requestHardwareInfo = () => {
  overwolf.benchmarking.stopRequesting();
  overwolf.benchmarking.requestHardwareInfo(interval, ({ reason }) => {
    if (reason === 'Permissions Required') {
      overwolf.benchmarking.requestPermissions(({ status }) => {
        if (status === 'success') {
          requestHardwareInfo();
        }
      });
    }
  });
};

export const addHardwareInfoListener = listener => {
  if (hardwareInfoListener) return;

  hardwareInfoListener = listener;
  overwolf.benchmarking.onHardwareInfoReady.addListener(hardwareInfoListener);
  requestHardwareInfo();
};

export const removeHardwareInfoListener = () => {
  console.info('%cStop hardware info listener', 'color: blue');
  overwolf.benchmarking.onHardwareInfoReady.removeListener(hardwareInfoListener);
  hardwareInfoListener = null;
  overwolf.benchmarking.stopRequesting();
};
