module.exports = AuthInfoController;

function AuthInfoController(app) {
  var authUtil = require('../../utils/authutil.js');
  app.get('/api/auth/info.json', function(req, res) {
    if(authUtil.isAuthorized(req)) {
      res.json({
        ok: true,
        user: authUtil.getUser(req),
        master: authUtil.isMaster(req)
      });
    } else {
      res.json({
        ok: false,
        message: 'not-authorized'
      });
    }
  });
};