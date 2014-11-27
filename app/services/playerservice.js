var mongoose = require('mongoose')
var Player = mongoose.model('Player');
var ObjectId = mongoose.Types.ObjectId;

module.exports = new PlayerService();

function PlayerService() {
  var mongoose = require('mongoose')
  var Player = mongoose.model('Player');
  var ObjectId = mongoose.Types.ObjectId;
  var self = this;

  self.list = function(func) {
    var q = Player.find({deleted: false}).sort({name: 1}).exec();
    q.then(func);
  };

  self.getAll = function(func) {
    var q = Player.find({}).sort({name: 1}).exec();
    q.then(func);
  };

  self.findOne = function(id, func) {
    var q = Player.findById(ObjectId(id)).exec();
    q.then(function(player) {
      func(player);
    });
  };

  self.add = function(name, defaultAmount, description, deleted, func) {
    var player = new Player({
      name: name,
      defaultAmount: defaultAmount,
      deleted: deleted,
      description: description
    });
    player.save(function(err) {
      func('add completed');
    });
  };

  self.update = function(id, name, defaultAmount, description, deleted, func) {
    var query = {
      _id: ObjectId(id)
    };
    var data = {
      name: name,
      defaultAmount: defaultAmount,
      deleted: deleted,
      description: description
    };
    var q = Player.update(query, data).exec();
    q.then(function(count) {
      func(count);
    });
  };

  self.remove = function(id, func) {
    var query = {
      _id: ObjectId(id)
    };
    var q = Player.remove(query).exec();
    q.then(function(count) {
      func(count);
    });
  };
};
