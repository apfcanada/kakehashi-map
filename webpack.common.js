const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.[contenthash].js',
		chunkFilename: 'chunk.[contenthash].js'
	},
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env' ]
							],
							plugins: ["@babel/plugin-transform-runtime"]
						}
					}
				]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|geojson|csv)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource'
	      },
	      {
				test: /\.less$/i,
				use: [ 
					{ loader: "style-loader"},
					{ loader: "css-loader"},
					{ loader: "less-loader"}
				]
			}
		]
	},
	optimization: {
		usedExports: true,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template:'src/index.html',
			publicPath:'dist'
		})
	],
	resolve: {
		extensions: ['.js', '.jsx']
	}
}
