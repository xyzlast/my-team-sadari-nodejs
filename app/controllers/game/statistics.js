var express = require('express');
var statisticsService = require('../../services/statisticsservice.js');

module.exports = function(app) {

  app.get('/api/statistics/players.json', function(req, res, next) {
    statisticsService.calculateByPlayers(function(output) {
      res.json({
        ok: true,
        data: output
      });
    });
  });

};