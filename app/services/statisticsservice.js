var mongoose = require('mongoose');
var Player = mongoose.model('Player');
var Game = mongoose.model('Game');
var ObjectId = mongoose.Types.ObjectId;

module.exports.calculateByPlayers = function(from, to, func) {
  var q = Player.find({ deleted: false }).exec();
  q.then(function(players) {
    var output = [];
    players.forEach(function(player) {
      var query = {
        winner: player._id,
        deleted: false
      };
      if(from != null && to != null) {
        query.date = {
          '$gt': from,
          '$lte': to
        }
      } else if(from != null) {
        query.date = {
          '$gt': from
        }
      } else if(to != null) {
        query.date = {
          '$lte': to
        }
      }
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

module.exports.calculateByNumbers = function(from, to, func) {
  var output = [];
  var numbers = [1, 2, 3, 4, 5, 6, 7];
  numbers.forEach(function(number) {
    var query = {
      deleted: false,
      number: number.toString()
    };
    if(from != null && to != null) {
      query.date = {
        '$gt': from,
        '$lte': to
      }
    } else if(from != null) {
      query.date = {
        '$gt': from
      }
    } else if(to != null) {
      query.date = {
        '$lte': to
      }
    }
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


module.exports.calculateByMoney = function(from, to, func) {
  var output = [];
  var playerQ = Player.find({ deleted: false }).exec();
  playerQ.then(function(players) {
    players.forEach(function(player) {
      var matchQuery = {
        winner: player._id,
        deleted: false
      };

      if(from != null && to != null) {
        matchQuery.date = {
          '$gt': from,
          '$lte': to
        }
      } else if(from != null) {
        matchQuery.date = {
          '$gt': from
        }
      } else if(to != null) {
        matchQuery.date = {
          '$lte': to
        }
      }

      var q = Game.aggregate(
        [
          { $match: matchQuery },
          {
            $group: {
              _id: '$winner',
              totalCost: { $sum: '$cost' },
              averageCost: { $avg: '$cost' }
            }
          }
        ]).exec();
      q.then(function(res) {
        output.push({
          player: player,
          totalCost: res[0].totalCost,
          averageCost: res[0].averageCost
        });
        if(output.length == players.length) {
          output.sort(function(a, b) {
            return a.totalCost < b.totalCost;
          });
          func(output);
        }
      });
    });
  });
};