

const userService = require('./user.service');
const functions = require('../shared/helper-functions');

var isUserAlreadyLoggedIn = false;


module.exports = {
    login : login,
    logout : logout,
    isUserLoggedIn: isUserLoggedIn
}


function login(loginRequest) {
    if(!this.isUserLoggedIn(loginRequest.email)) {
        let user = userService.fetchByEmail(loginRequest.email);
        if (user) {
            if(user.password === loginRequest.password) {
                isUserAlreadyLoggedIn = true;
                return { status : 200, response : "Login Successful"};
              } else {
                  return { status : 400, response : functions.handleResponse('Invalid password.', null)};
              }
        }  else {
            return { status : 400, response : functions.handleResponse('Invalid username.', null)};
          }
    } else {
        return { status : 400, response : functions.handleResponse('User already logged in.', null)};
    }
}

function logout(email) {
    isUserAlreadyLoggedIn = false;
}

function isUserLoggedIn(email) {
    return isUserAlreadyLoggedIn;
}