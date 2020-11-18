

const users = require('../models/user.model');
const functions = require('../shared/helper-functions');


module.exports = {
  fetchByEmail : fetchByEmail
}

function fetchByEmail(email) {
  let user;
  if(users) {
    console.log(users);
    user = users.find(item => item.email === email);
  }
  return user;
}