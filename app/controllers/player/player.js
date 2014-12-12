module.exports = PlayerController;

function PlayerController(app) {
  var express = require('express');
  var playerService = require('../../services/playerservice.js');

  app.get('/api/player/list.json', function(req, res, next) {
    if(req.param('all')) {
      playerService.getAll(function(players) {
        res.json({
          ok: true,
          data: players
        });
      });
    } else {
      playerService.list(function(players) {
        res.json({
          ok: true,
          data: players
        });
      });
    }
  });

  app.get('/api/player/:id.json', function(req, res, next) {
    var id = req.param('id');
    playerService.findOne(id, function(player) {
      res.json({
        ok: true,
        data: player
      });
    });
  });

  app.delete('/api/player/:id.json', function(req, res, next) {
    var id = req.param('id');
    playerService.remove(id, function(count) {
      res.json({
        ok: true,
        data: 'delte completed'
      });
    });
  });

  app.post('/api/player.json', function(req, res, next) {
    var data = {
      name: req.body.name,
      defaultAmount: req.body.defaultAmount,
      deleted: req.body.deleted,
      description: req.body.description ? req.body.description : ''
    };

    playerService.add(data.name, data.defaultAmount, data.description, data.deleted, function(count) {
      res.json({
        ok: true,
        data: 'add complted'
      });
    });
  });

  app.post('/api/player/:id.json', function(req, res, next) {
    var id = req.param('id');
    var data = {
      name: req.body.name,
      defaultAmount: req.body.defaultAmount,
      deleted: req.body.deleted,
      description: req.body.description ? req.body.description : ''
    };

    playerService.update(id, data.name, data.defaultAmount, data.description, data.deleted, function(count) {
      res.json({
        ok: true,
        data: 'update complted'
      });
    });
  });

}
