var express = require('express'), router = express.Router();
var gameService = require('../../services/gameservice.js');
var jsonUtil = require('../../utils/jsonutil.js');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/api/games.json', function (req, res, next) {
  var year = parseInt(req.param('year'));
  var month = parseInt(req.param('month')) - 1;
  var day = parseInt(req.param('day'));
  if (year && day && month) {
    gameService.listByDate(year, month, day, function (games) {
      res.json(jsonUtil.buildJson(games));
    });
  } else {
    next();
  }
});

router.get('/api/games.json', function (req, res, next) {
  var year = parseInt(req.param('year'));
  var month = parseInt(req.param('month'));

  if (year && month) {
    gameService.listByMonth(year, month, function (games) {
      var results = [];
      games.forEach(function (game) {
        results.push(convertGameSummary(game));
      });
      res.json(jsonUtil.buildJson(results));
    });
  } else {
    next();
  }
});

router.get('/api/games.json', function (req, res) {
  gameService.list(function (games) {
    var results = [];
    games.forEach(function (game) {
      results.push(convertGameSummary(game));
    });
    res.json(jsonUtil.buildJson(results));
  });
});

function convertGameSummary(game) {
  return {
    id: game._id,
    date: game.date.getTime(),
    number: game.number,
    winner: game.winner.name,
    cost: game.cost,
    description: game.description
  };
}