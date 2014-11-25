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
    var item = req.body;
    seasonService.add(item.name, item.from, item.to, item.description, function(output) {
      res.json({
        ok: true,
        data: output
      });
    });
  });

  app.delete('/api/season/:id.json', function(req, res, next) {
    var id = req.param['id'];
    seasonService.remove(id, function(output) {
      res.json({
        ok: true,
        data: output
      });
    });
  });
};