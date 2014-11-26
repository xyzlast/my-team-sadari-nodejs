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
    // db: 'mongodb://localhost/sadari'
    db: 'mongodb://heroku:Xucs9HmJrBKBr6bPkO6CM044_G6oVv5gV0bN0dxcXS-LYHWmKdWXaPnqcYwa7MQn1iVyOmbrP4BRT8QkdJcxlQ@dogen.mongohq.com:10058/app31973614'
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
    port: 3000,
    db: 'mongodb://localhost/sadari'
  }
};

module.exports = config[env];
