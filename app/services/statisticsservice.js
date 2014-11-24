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

module.exports.calculateByNumbers = function(func) {
  var output = [];
  var numbers = [1, 2, 3, 4, 5, 6, 7];
  numbers.forEach(function(number) {
    var query = {
      deleted: false,
      number: number.toString()
    };
    var q = Game.count(query).exec();
    q.then(function(count) {
      output.push({
        number: number.toString(),
        count: count
      });
      if(output.length == 7) {
        output.sort(function(a, b) {
          return parseInt(a.number) > parseInt(b.number);
        });
        func(output);
      }
    });
  });
};
