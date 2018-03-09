export const callOverwolfWithPromise = (method, ...params) => {
  return new Promise((resolve, reject) => {
    const handleResult = result => {
      if (result.status === 'success') return resolve(result);
      return reject(result);
    };

    console.log(method, params);
    if (params) {
      method(...params, handleResult);
    } else {
      method(handleResult);
    }
  });
};
