const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
	resolve: {
		extensions: [".js", ".jsx"]
	},
	devServer: {
		port: 9000,
		hot: true,
		inline: true,
		proxy: {
			"/ups": {
				target: "http://localhost:8090",
				logLevel: "debug",
				secure: false
			}
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			React: "react"
		}),
		new HtmlWebPackPlugin({
			template: "./index.html",
			filename: "./index.html"
		})
	]
};
