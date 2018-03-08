import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      nodeResolve({
        jsnext: true,
        main: true
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      commonjs(),
      minify({
        comments: false
      })
    ]
  }
];
