var express = require('express');
var statisticsService = require('../../services/statisticsservice.js');
var dateUtil = require('../../utils/dateconverter.js');

module.exports = function(app) {

  app.get('/api/statistics/players.json', function(req, res, next) {
    var from = dateUtil.convert(req.param('from'));
    var to = dateUtil.convert(req.param('to'));
    statisticsService.calculateByPlayers(from, to, function(output) {
      res.json({
        ok: true,
        data: output
      });
    });
  });

  app.get('/api/statistics/numbers.json', function(req, res, next) {
    var from = dateUtil.convert(req.param('from'));
    var to = dateUtil.convert(req.param('to'));
    statisticsService.calculateByNumbers(from, to, function(output) {
      res.json({
        ok: true,
        data: output
      });
    });
  });

  app.get('/api/statistics/money.json', function(req, res, next) {
    var from = dateUtil.convert(req.param('from'));
    var to = dateUtil.convert(req.param('to'));
    statisticsService.calculateByMoney(from, to, function(output) {
      res.json({
        ok: true,
        data: output
      });
    });
  });
};