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

  self.add = function(name, defaultAmount, description) {
    var player = new Player({
      name: name,
      defaultAmount: defaultAmount,
      deleted: false,
      description: description
    });
    player.save();
    return player;
  };
};
