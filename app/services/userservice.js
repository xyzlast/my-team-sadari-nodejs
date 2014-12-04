module.exports = new UserService();

function UserService() {
  var mongoose = require('mongoose');
  var User = mongoose.model('User');
  var ObjectId = mongoose.Types.ObjectId;
  var passwordUtil = require('../utils/passwordutil.js');
  var self = this;

  self.join = function(passport, password, func) {

  };

  self.login = function(email, password, okFunc, failFunc) {

  };

  self.leave = function(email) {

  };
};