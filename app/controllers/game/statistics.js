var express = require('express'), router = express.Router();
var statisticsService = require('../../services/statisticsservice.js');
var dateUtil = require('../../utils/dateconverter.js');
var jsonUtil = require('../../utils/jsonutil.js');

module.exports = function(app) {
  app.use('/api/statistics', router);
};

router.get('/players.json', function (req, res) {
  var from = dateUtil.convert(req.param('from'));
  var to = dateUtil.convert(req.param('to'));
  statisticsService.calculateByPlayers(from, to, function(output) {
    res.json(jsonUtil.buildJson(output));
  });
});

router.get('/numbers.json', function (req, res) {
  var from = dateUtil.convert(req.param('from'));
  var to = dateUtil.convert(req.param('to'));
  statisticsService.calculateByNumbers(from, to, function(output) {
    res.json(jsonUtil.buildJson(output));
  });
});

router.get('/money.json', function (req, res) {
  var from = dateUtil.convert(req.param('from'));
  var to = dateUtil.convert(req.param('to'));
  statisticsService.calculateByMoney(from, to, function(output) {
    res.json(jsonUtil.buildJson(output));
  });
});