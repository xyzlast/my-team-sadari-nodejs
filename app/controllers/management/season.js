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
};