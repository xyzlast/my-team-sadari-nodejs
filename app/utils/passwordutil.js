module.exports = new PasswordUtil();

function PasswordUtil() {
  var self = this;
  var bcrypt = require('bcrypt');

  self.encrypt = function(password, salt) {
    if(!salt) {
      salt = bcrypt.genSaltSync();
    }
    return {
      salt: salt,
      encryptedPassword: bcrypt.hashSync(password, salt)
    };
  };

  self.compare = function(planPassword, encryptedPassword, salt) {
    if(!salt) {
      return false;
    }
    return self.encrypt(planPassword, salt).encryptedPassword == encryptedPassword;
  };
};