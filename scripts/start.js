const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackDevServer = require('webpack-dev-server');
const config = require("../webpack.config.js");
const port = 3000

config.entry.index.unshift('webpack-dev-server/client?http://localhost:' + port, 'webpack/hot/dev-server');

var compiler = webpack(config);
var devServer = new webpackDevServer(compiler, {
	hot: true,
	inline: true,
	publicPath: '/',
	historyApiFallback: false,
	stats: {
		colors: true
	},
	proxy: [{
		path: '/name',
		changeOrigin: true,
		target: 'http://localhost:3001',
		host: "localhost"
	}]
})
devServer.listen(port, function (error) {
	if (error) {
		console.error(error);
	}
});