module.exports = new AuthUtil();

function AuthUtil() {
  var self = this;
  self.isMaster = function(req) {
    try {
      var user = req.session.passport.user._json;
      return user.email == 'xyzlast@gmail.com';
    } catch(e) {
      return false;
    }
  };

  self.isAuthorized = function(req) {
    try {
      var user = req.session.passport.user._json;
      return true;
    } catch(e) {
      return false;
    }
  };

  self.getUser = function(req) {
    try {
      var user = req.session.passport.user._json;
      return user;
    } catch(e) {
      return null;
    }
  };
};
