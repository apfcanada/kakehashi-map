const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
	mode: 'production',
	watch: false,
	devtool: false,
	output: {
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template:'src/index.html',
			publicPath:'dist'
		})
	],
} )
