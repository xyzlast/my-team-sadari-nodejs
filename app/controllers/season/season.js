var express = require('express');
var seasonService = require('../../services/seasonservice.js');

module.exports = function(app) {
  app.get('/api/seasons.json', function(req, res, next) {
    seasonService.list(function(seasons) {
      res.json({
        ok: true,
        data: seasons
      });
    });
  });

  app.get('/api/season/:id.json', function(req, res, next) {
    var id = req.param['id'];

  });

  app.post('/api/season/:id.json', function(req, res, next) {
    next();
  });

  app.post('/api/season/add.json', function(req, res, next) {
    next();
  });
};