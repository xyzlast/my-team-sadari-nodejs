var express = require('express'),
    config = require('./app/config/config.js'),
    dbConfig = require('./app/config/dbConfig.js');

console.log('db connect start');
dbConfig.connect();
console.log('db connect end');

var app = express();
require('./app/config/express')(app, config);
app.listen(config.port);