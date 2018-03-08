import { App } from './ui/layouts';
import React from 'react';
import ReactDOM from 'react-dom';
import random from 'lodash/random';
import { sum } from './lib';

console.log('index.js');

const a = random(3);
const b = random(10);
const result = sum(a, b);

ReactDOM.render(
  <App>
    random add example: {a} + {b} = {result}
  </App>,
  document.getElementById('root')
);
