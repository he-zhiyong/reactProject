function routes(app) {
	//接口路由
	const api = ['login', 'register','user'];
	api.forEach(function (service) {
		app.use('/api/' + service, require('./api/' + service));
	});
};
module.exports = routes