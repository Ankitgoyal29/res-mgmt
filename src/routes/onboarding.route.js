'use strict';

module.exports = function(app) {
	var onboarding = require('../controllers/onboarding.controller');
	// var userMiddleware = require('../middlewares/user');

	app.post('/api/onboarding/application', onboarding.apply);

    app.post('/api/onboarding/approve', onboarding.approve);
    
    app.post('/api/onboarding/reject', onboarding.reject);
};