var express = require('express'), router = express.Router();
var playerService = require('../../services/playerservice.js');
var jsonUtil = require('../../utils/jsonutil.js');

module.exports = function(app) {
  app.use('/api/player', router);
}

router.get('/list.json', function (req, res) {
  var buildJson = function(players) {
    res.json(jsonUtil.buildJson(players));
  };
  if (req.param('all')) {
    playerService.getAll(buildJson);
  } else {
    playerService.list(buildJson);
  }
});

router.get('/:id.json', function (req, res) {
  var id = req.param('id');
  playerService.findOne(id, function(player) {
    res.json(jsonUtil.buildJson(player));
  });
});

router.delete('/:id.json', function (req, res) {
  var id = req.param('id');
  playerService.remove(id, function(count) {
    res.json(jsonUtil.buildJson('delete completed'));
  });
});

router.post('/add.json', function (req, res) {
  var data = {
    name: req.body.name,
    defaultAmount: req.body.defaultAmount,
    deleted: req.body.deleted,
    description: req.body.description ? req.body.description : ''
  };
  playerService.add(data.name, data.defaultAmount, data.description, data.deleted, function(count) {
    res.json(jsonUtil.buildJson('add completed'));
  });
});

router.post('/:id.json', function (req, res) {
  var id = req.param('id');
  var data = {
    name: req.body.name,
    defaultAmount: req.body.defaultAmount,
    deleted: req.body.deleted,
    description: req.body.description ? req.body.description : ''
  };
  playerService.update(id, data.name, data.defaultAmount, data.description, data.deleted, function(count) {
    res.json(jsonUtil.buildJson('update complted'));
  });
});