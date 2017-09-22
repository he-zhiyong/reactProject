const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require("../webpack.config.js");
const port = 3000

config.entry.index.unshift('webpack-dev-server/client?http://localhost:' + port, 'webpack/hot/dev-server');

var compiler = webpack(config);
var devServer = new webpackDevServer(compiler, {
	hot: true,
	inline: true,
	publicPath: '/',
	historyApiFallback: true,
	stats: {
		colors: true
	},
	proxy: [{
		path: '/api/*',
		changeOrigin: true,
		target: 'http://localhost:3001',
		host: "localhost"
	}/* ,{
		path: '/api/*',
		changeOrigin: true,
		target: 'http://192.168.10.19:8080',
		host: "localhost"
	} */]
})
devServer.listen(port, function (error) {
	if (error) {
		console.error(error);
	}
});