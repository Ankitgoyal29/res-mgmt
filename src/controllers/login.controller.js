const userService = require('../services/user.service');
const loginService = require('../services/login.service');
const functions = require('../shared/helper-functions');


module.exports = {
  login: login,
  logout: logout
}

/**
 * POST /login
 * Sign in using email and password.
 */
function login(req, res, next) {

    if (!req.body.email) {
      res.status(400).send(functions.handleResponse('Email is required'));
      return;
    }
  
    if (!req.body.password) {
      res.status(400).send(functions.handleResponse('Password is required'));
      return;
    }
  
    let loginRequest = {
      email : req.body.email,
      password : req.body.password
    };
    
    let { status, response } = loginService.login(loginRequest);
    return res.status(status).send(response);
  };


  /**
 * GET /logout
 * Log out.
 */
function logout(req, res) {

  loginService.logout(req.body.email);
  res.status(200).send('Successfully logout');
  // res.status(200).send(functions.handleResponse(null, 'Successfully logout'));
};