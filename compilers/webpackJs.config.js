const path = require( 'path' );
const webpack = require( 'webpack' );

const TerserPlugin = require( 'terser-webpack-plugin' );

const ASSET_PATH = process.env.ASSET_PATH || '/';
const VERSION = Date.now();

module.exports = function(_env, argv) {
	const isProduction = argv.mode === 'production';
	const isDevelopment = !isProduction;
	return {
		entry: {
			'modal': './src/js/modal.js',
		},
		output: {
			path: path.join( __dirname, '../dist/js/' ),
			filename: '[name].min.js'
		},
		watch: isDevelopment,
		plugins: [
			new webpack.DefinePlugin({
				'process.env.VERSION': JSON.stringify( VERSION ),
			}),
		].filter(Boolean),
		optimization: {
			minimizer: [
				new TerserPlugin({
					cache: true,
					parallel: true,
					sourceMap: true, // Must be set to true if using source-maps in production
					terserOptions: {
					// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
					}
				}),
			],
		}
	};
};
