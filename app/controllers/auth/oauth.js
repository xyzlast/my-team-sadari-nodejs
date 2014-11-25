module.exports = init;

function init(app) {
  var passport = require('passport');
  app.use(passport.initialize());
  app.use(passport.session());
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new GoogleStrategy({
    clientID: '72427641175-749cqavq62f6p65k269cp9onmebhaf37.apps.googleusercontent.com',
    clientSecret: 'AnX6PA0o28-Ei2d1N7r3-8nu',
    callbackURL: 'http://localhost:3000/oauth2callback'
  },
  function(accessToken, refreshToken, profile, done) {
    //
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // req.session.passport 정보를 저장하는 단계이다.
    // done 메소드에 전달된 정보가 세션에 저장된다.
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //
    return done(null, profile);
  }));

  app.get('/auth/google', passport.authenticate('google', {
    scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));

  app.get('/oauth2callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

  app.get('/logout', function(req, res) {
    //
    // passport 에서 지원하는 logout 메소드이다.
    // req.session.passport 의 정보를 삭제한다.
    //
    req.logout();
    res.redirect('/');
  });
};