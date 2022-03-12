// import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from "./package.json";

const devMode = (process.env.NODE_ENV === 'development');

export default {
  input: './src/index.js',
  // plugins: [
  //   babel({
  //     exclude: ["node_modules/**"],
  //     babelHelpers: 'bundled'
  //   }),
  // ],
  output: [
    {
      file: pkg.main,
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
      file: pkg.module,
      format: "es",
      sourcemap: devMode ? 'inline' : false,
      plugins: [
        terser({
          ecma: 2020,
          keep_fnames: false,
          mangle_props: true,
          mangle: {
            toplevel: true,
          },
          output: { quote_style: 1 }
        })
      ]
    }
  ]
}