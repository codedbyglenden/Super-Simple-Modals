import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const devMode = (process.env.NODE_ENV === 'development');

export default {
  input: './src/index.js',
  plugins: [
    babel({
      exclude: ["node_modules/**"],
      babelHelpers: 'bundled'
    }),
  ],
  output: [
    {
      file: './dist/ssm.min.js',
      format: 'iife',
      name: 'SuperSimpleModal',
      sourcemap: devMode ? 'inline' : false,
      plugins: [
        terser({
          ecma: 2020,
          mangle: true,
          compress: {
            module: false,
            drop_console: !devMode,
            drop_debugger: !devMode
          },
          output: { quote_style: 1 }
        })
      ]
    },
    {
      file: './dist/ssm.esm.js',
      format: "es",
      sourcemap: devMode ? 'inline' : false,
      plugins: [
        terser({
          ecma: 2020,
          mangle: { toplevel: true },
          compress: {
            module: true,
            drop_console: !devMode,
            drop_debugger: !devMode
          },
          output: { quote_style: 1 }
        })
      ]
    }
  ]
}