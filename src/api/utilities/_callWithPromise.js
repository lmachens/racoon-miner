export const callOverwolfWithPromise = method => {
  return new Promise((resolve, reject) => {
    method(result => {
      if (result.status === 'success') return resolve(result);
      return reject(result);
    });
  });
};
