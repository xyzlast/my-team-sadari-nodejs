var express = require('express'),
    config = require('./app/config/config.js'),
    dbConfig = require('./app/config/dbConfig.js');

dbConfig.connect();

var app = express();
require('./app/config/express')(app, config);
app.listen(config.port);