import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';
import nodeResolve from 'rollup-plugin-node-resolve';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife'
    },
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true
      }),
      commonjs(),
      babel(),
      minify({
        comments: false
      })
    ],
    sourceMap: true
  }
];
