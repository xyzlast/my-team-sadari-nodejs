module.exports = init;

function init(app) {
  app.get('/api/auth/info.json', function(req, res) {
    try {
      var user = req.session.passport.user._json;
      res.json({
        ok: true,
        user: user,
        master: user.email == 'xyzlast@gmail.com'
      });
    } catch(e) {
      res.json({
        ok: false,
        message: 'not-authorized'
      });
    }
  });
};