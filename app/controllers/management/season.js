var express = require('express');
var seasonService = require('../../services/seasonservice.js');

module.exports = function(app) {
  app.get('/api/management/seasons.json', function(req, res, next) {
    seasonService.list(function(seasons) {
      res.json({
        ok: true,
        data: seasons
      });
    });
  });

  app.get('/api/management/season/:id.json', function(req, res, next) {
    var id = req.param['id'];

  });

  app.post('/api/management/season/:id.json', function(req, res, next) {
    next();
  });

  app.post('/api/management/season/add.json', function(req, res, next) {
    next();
  });
};