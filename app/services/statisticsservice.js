module.exports = new StatisticsService();

function StatisticsService() {
  var mongoose = require('mongoose');
  var Player = mongoose.model('Player');
  var Game = mongoose.model('Game');
  var ObjectId = mongoose.Types.ObjectId;
  var self = this;
  var addQueryFromAndTo = function(from, to, query) {
    var oneDayMiliSeconds = 24 * 60 * 60 * 1000;
    if(from != null && to != null) {
      query.date = {
        '$gte': from,
        '$lt': new Date(to.getTime() + oneDayMiliSeconds)
      };
    } else if(from != null) {
      query.date = {
        '$gte': from
      };
    } else if(to != null) {
      query.date = {
        '$lt': new Date(to.getTime() + oneDayMiliSeconds)
      };
    }
    return query;
  };

  self.calculateByPlayers = function(from, to, func) {
    var q = Player.find({ deleted: false }).exec();
    q.then(function(players) {
      var output = [];
      players.forEach(function(player) {
        var query = {
          winner: player._id,
          deleted: false
        };
        query = addQueryFromAndTo(from, to, query);
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

  self.calculateByNumbers = function(from, to, func) {
    var output = [];
    var numbers = [1, 2, 3, 4, 5, 6, 7];
    numbers.forEach(function(number) {
      var query = {
        deleted: false,
        number: number.toString()
      };
      query = addQueryFromAndTo(from, to, query);
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


  self.calculateByMoney = function(from, to, func) {
    var output = [];
    var playerQ = Player.find({ deleted: false }).exec();
    playerQ.then(function(players) {
      players.forEach(function(player) {
        var matchQuery = {
          winner: player._id,
          deleted: false
        };
        matchQuery = addQueryFromAndTo(from, to, matchQuery);
        console.log('matchQuery : ');
        console.log(matchQuery);
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
          if(res.length != 0) {
            output.push({
              player: player,
              totalCost: res[0].totalCost,
              averageCost: res[0].averageCost
            });
          } else {
            output.push({
              player: player,
              totalCost: 0,
              averageCost: 0
            });
          }
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
};