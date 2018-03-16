export const generateParser = regex => line => {
  const result = {
    timestamp: Date.now()
  };
  const parsed = line.match(regex);
  if (!parsed) return;
  result.speed = parseFloat(parsed[1]);
  return result;
};
