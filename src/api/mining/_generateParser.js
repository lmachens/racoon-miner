export const generateParser = regex => line => {
  const result = {
    timestamp: Date.now()
  };
  const parsed = line.match(regex);
  if (!parsed) return;
  result.speed = parsed[1];
  return result;
};
