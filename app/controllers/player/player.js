module.exports = PlayerController;

function PlayerController(app) {
  var express = require('express');
  var playerService = require('../../services/playerservice.js');

  app.get('/api/player/list.json', function(req, res, next) {
    playerService.list(function(players) {
      res.json({
        ok: true,
        data: players
      });
    });
  });

  app.get('/api/player/:id.json', function(req, res, next) {

  });

  app.post('/api/player.json', function(req, res, next) {

  });

  app.delete('/api/player/:id.json', function(req, res, next) {

  });
};
