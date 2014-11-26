var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'without me!!'
    },
    port: 80,
    db: 'mongodb://localhost/sadari'
  },

  test: {
    root: rootPath,
    app: {
      name: 'without me!!'
    },
    port: 3000,
    db: 'mongodb://localhost/sadari'
  },

  production: {
    root: rootPath,
    app: {
      name: 'without me!!'
    },
    port: process.env.PORT,
    db: process.env.MONGOHQ_URL
  }
};

module.exports = config[env];
