var express = require('express');
var gameService = require('../../services/gameservice.js');
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.get('/api/games.json', function(req, res, next) {
    var year = parseInt(req.param('year'));
    var month = parseInt(req.param('month'));
    var day = parseInt(req.param('day'));

    if(year && day && month) {
      gameService.listByDate(year, month, day, function(games) {
        res.json({
          ok:true,
          data: games
        })
      });
    } else {
      next();
    }
  });

  app.get('/api/games.json', function(req, res, next) {
    var year = parseInt(req.param('year'));
    var month = parseInt(req.param('month'));

    if(year && month) {
      gameService.listByMonth(year, month, function(games) {
        var results = [];
        games.forEach(function(game) {
          results.push({
            id: game._id,
            date: game.date.getTime(),
            number: game.number,
            winner: game.winner.name,
            cost: game.cost,
            description: game.description
          });
        });
        res.json({
          ok: true,
          data: results
        });
      });
    } else {
      next();
    }
  });

  app.get('/api/games.json', function(req, res, next) {
    gameService.list(function(games) {
      var results = [];
      games.forEach(function(game) {
        results.push({
          id: game._id,
          date: game.date.getTime(),
          number: game.number,
          winner: game.winner.name,
          cost: game.cost,
          description: game.description
        });
      });
      res.json({
        ok: true,
        data: results
      });
    });
  });
};