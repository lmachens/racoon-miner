import React from 'react';
import ReactDOM from 'react-dom';
import random from 'lodash/random';
import { sum } from './lib';

console.log('index.js');
const a = random(5);
const b = random(10);
const result = sum(a, b);

ReactDOM.render(
  <div>
    random add example: {a} + {b} = {result}
  </div>,
  document.getElementById('root')
);
