import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

//import minify from 'rollup-plugin-babel-minify';

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
        //'process.env.NODE_ENV': JSON.stringify('production'), // needed by react
        'process.env.NODE_ENV': JSON.stringify('development'), // needed by react
        'process.env.__APP_PATH__': JSON.stringify(`${process.cwd()}/dist`.replace(/\\/g, '/')),
        'process.env.__LISTEN_TO_FILES__': JSON.stringify(['main.js']),
        'process.env.__TRACKING_ID__': JSON.stringify('UA-115959266-2')
      }),
      nodeResolve({
        module: true,
        jsnext: true,
        browser: true,
        preferBuiltins: false
      }),
      commonjs({
        include: ['node_modules/**'],
        namedExports: {
          'node_modules/react/index.js': [
            'Component',
            'PureComponent',
            'Children',
            'createElement',
            'Fragment',
            'cloneElement',
            'isValidElement'
          ],
          'node_modules/material-ui/styles/index.js': [
            'MuiThemeProvider',
            'createMuiTheme',
            'withStyles'
          ],
          'node_modules/material-ui/Card/index.js': ['CardActions', 'CardContent'],
          'node_modules/material-ui/Table/index.js': [
            'TableBody',
            'TableRow',
            'TableCell',
            'TableHead'
          ],
          'node_modules/recharts-scale/es6/index.js': [
            'getNiceTickValues',
            'getTickValuesFixedDomain'
          ]
        }
      }),
      babel({
        exclude: 'node_modules/**'
      }) /*,
      minify({
        comments: false
      })*/
    ]
  }
];
