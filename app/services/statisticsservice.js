var mongoose = require('mongoose');
var Player = mongoose.model('Player');
var Game = mongoose.model('Game');

module.exports.calculateByPlayers = function(func) {
  var q = Player.find({ deleted: false }).exec();
  q.then(function(players) {
    var output = [];
    players.forEach(function(player) {
      var query = {
        winner: player._id,
        deleted: false
      };
      var q2 = Game.count(query).exec();
      q2.then(function(count) {
        output.push({
          player: player,
          count: count
        });
        if(output.length == players.length) {
          func(output);
        }
      });

    });
  });
};
