const userController = require('../../controllers/user');
const jwt = require('jsonwebtoken');
const functions = require('../lib/functions');

exports.checkSession = function (req, res, next) {

  if (req.headers && req.headers['authorization']) {

    var token = req.headers['authorization'].replace('Bearer ', '');
    var decoded = jwt.decode(token, {
      complete: true
    });

    if (decoded && (Math.floor(Date.now() / 1000) < decoded.payload.exp)) {

      var userId = decoded.payload.data.split('__')[0];
      var session_key = decoded.payload.data.split('__')[1];

      req.body.id = userId;
      req.body.session_key = session_key;
      userController.getById(req, res, next);

    } else {
      res.status(401).send(functions.handleResponse('Authentication failed'));
    }
  } else {
    res.status(401).send(functions.handleResponse('Authentication failed'));
  }
}