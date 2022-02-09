const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
var webpack = require('webpack')
const DeadCodePlugin = require('webpack-deadcode-plugin');

module.exports = merge(common, { 
	mode: 'development',
	watch: true,
	devtool: 'inline-source-map',
	output: {
		chunkFilename: 'chunk.[name].js'
	},
	plugins: [
		new DeadCodePlugin({
			patterns: ['src/**/*.(js|jsx|css|less)'],
			detectUnusedExport: false
		})
	],
} )
