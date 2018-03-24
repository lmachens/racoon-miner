export const SPEED_REGEX = 'SPEED_REGEX';
export const CONNECTION_FAILED_REGEX = 'CONNECTION_FAILED_REGEX';

export const generateParser = regex => line => {
  const result = {
    timestamp: Date.now()
  };
  console.info(line);
  if (regex.SPEED_REGEX) {
    const parsed = line.match(regex);
    if (parsed) result.speed = parseFloat(parsed[1]);
  }
  if (regex.CONNECTION_FAILED_REGEX) {
    const parsed = line.match(regex);
    if (parsed) result.errorMsg = 'Connection failed';
  }
  return result;
};
