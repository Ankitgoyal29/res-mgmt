'use strict';

module.exports = function(app) {
	var login = require('../controllers/login.controller');
	// var userMiddleware = require('../middlewares/user');

	app.post('/api/login', login.login);

	app.post('/api/logout', login.logout);
};