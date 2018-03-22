export const generateParser = regex => line => {
  const result = {
    timestamp: Date.now()
  };
  console.info(line);
  const parsed = line.match(regex);
  if (!parsed) return;
  result.speed = parseFloat(parsed[1]);
  return result;
};
