const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
var webpack = require('webpack')
const DeadCodePlugin = require('webpack-deadcode-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = merge(common, { 
	mode: 'development',
	watch: true,
	devtool: 'inline-source-map',
	output: {
		chunkFilename: 'chunk.[name].js',
		path: path.resolve(__dirname, 'dev-build'),
	},
	plugins: [
		new DeadCodePlugin({
			patterns: ['src/**/*.(js|jsx|css|less)'],
			detectUnusedExport: false
		}),
		new HtmlWebpackPlugin({
			template:'src/index.html',
			publicPath:'dev-build'
		})
	],
} )
