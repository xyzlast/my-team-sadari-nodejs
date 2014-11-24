var mongoose = require('mongoose')
var Player = mongoose.model('Player');

module.exports.list = function(func) {
  var q = Player.find({deleted: false}).sort({name: 1}).exec();
  q.then(func);
};

module.exports.add = function(name, defaultAmount, description) {
  var player = new Player({
    name: name,
    defaultAmount: defaultAmount,
    deleted: false,
    description: description
  });
  player.save();
  return player;
};
