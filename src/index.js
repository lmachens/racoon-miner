import random from 'lodash/random';

console.log('index.js');

document.getElementById('app').innerText = `lodash/random test: ${random(5)}`;
