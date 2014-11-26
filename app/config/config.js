var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'without me!!'
    },
    port: 3000,
    db: 'mongodb://localhost/sadari',
    google: {
      clientId: '72427641175-8t49pviaero04v8dq7e4544v7u55kpbp.apps.googleusercontent.com',
      clientSeq: 'yblOYJR-CwlltNtaOS6tbjTj',
      callbackUri: 'http://localhost:3000/oauth2callback'
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'without me!!'
    },
    port: process.env.PORT,
    db: process.env.MONGOHQ_URL,
    google: {
      clientId: '72427641175-749cqavq62f6p65k269cp9onmebhaf37.apps.googleusercontent.com',
      clientSeq: 'AnX6PA0o28-Ei2d1N7r3-8nu',
      callbackUri: 'http://my-sadari.herokuapp.com/oauth2callback'
    }
  }
};

module.exports = config[env];
