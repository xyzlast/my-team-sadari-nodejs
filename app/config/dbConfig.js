var config = require('./config.js');
var mongoose = require('mongoose'),
    glob = require('glob');

var connect = function() {
  // mongoose.createConnection(config.db);
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function(err) {
    console.log(err);
    throw new Error('unable connect to database');
  });
  //glob.sync는 absolute directory를 기준으로 검색하기 때문에 반드시 path에 대한 정보가 필요하다.
  var models = glob.sync(config.root + '/app/models/*.js');
  var modelDefs = [];
  models.forEach(function(model) {
    require(model);
    modelDefs.push(model);
  });

  return {
    db: db,
    models: modelDefs
  };
};

exports.connect = connect;