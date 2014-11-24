var express = require('express');
var playerService = require('../../services/playerservice.js');

module.exports = function(app) {
  app.get('/api/player/list.json', getPlayers);
};

var getPlayers = function(req, res, next) {
  playerService.list(function(players) {
    res.json({
      ok: true,
      data: players
    });
  });
};