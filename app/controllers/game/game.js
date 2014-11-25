var express = require('express');
var gameService = require('../../services/gameservice.js');
var playerService = require('../../services/playerservice.js');
module.exports = function(app) {
  app.get('/api/game/:id.json', function(req, res, next) {
    var id = req.param('id');
    gameService.findOne(id, function(game) {
      playerService.list(function(players) {
        game.players = players;
        res.json({
          ok: true,
          data: game
        })
      });
    });
  });
  app.delete('/api/game/:id.json', function(req, res, next) {
    var id = req.param('id');
    gameService.remove(id, function(game) {
      res.json({
        ok: true,
        data: 'remove completed'
      });
    });
  });
  app.post('/api/game/update/:id.json', function(req, res, next) {
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
    gameService.update(id, game, gameResults, function(updatedGame) {
      res.json({
        ok: true,
        data: 'update completed'
      });
    });
  });
  app.post('/api/game/add.json', function(req, res, next) {
    var game = req.body.game;
    var gameResults = req.body.gameResults;
    gameService.add(game, gameResults, function(game) {
      res.json({
        ok: true,
        data: 'data'
      });
    });
  });
};