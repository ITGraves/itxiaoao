var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var prod = process.env.NODE_ENV === "production" ? true : false;

module.exports = {
	entry: {index: './src/js/reactrouter.js'},
	output: {
		path: path.resolve(__dirname, prod ? "./dist" : './build'),
		filename: prod ? "js/[name].[hash].min.js" : "js/[name].js",
		
	},

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}]
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html'
		}),

		new webpack.HotModuleReplacementPlugin()
	],

	devServer: {
	    contentBase: "./public",
	    colors: true,
	    historyApiFallback: true,
	    inline: true,
	    hot: true
	}

	/*plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html'
		})
	]*/
}