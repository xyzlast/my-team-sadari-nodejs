var express = require('express'), router = express.Router();
var seasonService = require('../../services/seasonservice.js');
var jsonUtil = require('../../utils/jsonutil.js');

module.exports = function(app) {
  app.use('/api/season', router);
};

router.get('/list.json', function (req, res) {
  seasonService.list(function(seasons) {
    res.json(jsonUtil.buildJson(seasons));
  });
});

router.get('/:id.json', function (req, res) {
  var id = req.param('id');
  seasonService.findOne(id, function(season) {
    res.json(jsonUtil.buildJson(season));
  });
});

router.post('/add.json', function (req, res) {
  var item = req.body;
  seasonService.add(item.name, item.from, item.to, item.description, function(output) {
    res.json(jsonUtil.buildJson(output));
  });
});

router.post('/:id.json', function (req, res) {
  var id = req.param('id');
  var item = req.body;
  seasonService.update(id, item.name, item.from, item.to, item.description, function(output) {
    res.json(jsonUtil.buildJson(output));
  });
});

router.delete('/:id.json', function (req, res) {
  var id = req.param('id');
  seasonService.remove(id, function(output) {
    res.json(jsonUtil.buildJson(output));
  });
});