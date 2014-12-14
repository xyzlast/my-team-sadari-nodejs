var express = require('express'),
    router = express.Router();
var async = require('async');
var jsonUtil = require('../../utils/jsonutil.js');
var gameService = require('../../services/gameservice.js');
var playerService = require('../../services/playerservice.js');

module.exports = function (app) {
  app.use('/api/game', router);
};

router.get("/:id.json", function (req, res) {
  var id = req.param('id');
  var findGame = function (callback) {
    gameService.findOne(id, function (game) {
      callback(null, game);
    });
  };
  var buildPlayers = function (game, callback) {
    playerService.list(function (players) {
      game.players = players;
      callback(null, game);
    });
  };
  var buildResult = function (error, result) {
    res.json(jsonUtil.buildJson(result));
  };
  async.waterfall([findGame, buildPlayers], buildResult);
});

router.delete('/:id.json', function (req, res) {
  var id = req.param('id');
  gameService.remove(id, function(game) {
    res.json(jsonUtil.buildJson('remove complted'));
  });
});

router.post('/add.json', function (req, res) {
  var game = req.body.game;
  var gameResults = req.body.gameResults;
  gameService.add(game, gameResults, function(game) {
    res.json(jsonUtil.buildJson(game));
  });
});

router.post('/:id.json', function (req, res) {

  var id = req.param('id');
  var description = '';
  if(req.body.game.description) {
    description = req.body.game.description;
  }
  var game = {
    number: req.body.game.number,
    cost: req.body.game.cost,
    description: description
  };
  var gameResults = req.body.gameResults;
  gameService.update(id, game, gameResults, function (updatedGame) {
    res.json(jsonUtil.buildJson('update complted'));
  });

});