import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default [
  {
    input: 'src/startup/main/index.js',
    output: {
      file: 'dist/main.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'), // needed by react
        'process.env.__APP_PATH__': JSON.stringify(`${process.cwd()}/dist`.replace(/\\/g, '/')),
        'process.env.__LISTEN_TO_FILES__': JSON.stringify(['main.js'])
      }),
      nodeResolve({
        module: true,
        jsnext: true,
        browser: true
      }),
      commonjs({
        include: ['node_modules/**'],
        namedExports: {
          'node_modules/react/index.js': [
            'Component',
            'PureComponent',
            'Children',
            'createElement',
            'Fragment'
          ],
          'node_modules/material-ui/styles/index.js': ['MuiThemeProvider', 'createMuiTheme']
        }
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      minify({
        comments: false
      })
    ]
  }
];
