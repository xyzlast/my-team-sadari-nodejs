module.exports = new GameService();

function GameService() {
  var self = this;
  var mongoose = require('mongoose');
  var Game = mongoose.model('Game');
  var GameResult = mongoose.model('GameResult');
  var ObjectId = mongoose.Types.ObjectId;

  self.list = function(func) {
    var q = Game.find({ deleted: false }).populate('winner').sort('date').exec();
    q.then(func);
  };

  self.listByMonth = function(year, month, func) {
    var query = {
                  deleted: false,
                  date: {
                          "$gte": new Date(year, month, 1),
                          "$lte": new Date(year, month + 1, 1)
                        }
                };
    var q = Game.find(query).populate('winner').sort('date').exec();
    q.then(func);
  };

  self.listByDate = function(year, month, day, func) {
    var query = {
                  deleted: false,
                  date: {
                          "$gte": new Date(year, month, day),
                          "$lte": new Date(year, month, day, 24)
                        }
                };
    var q = Game.find(query).populate('winner').exec();
    q.then(function(games) {
      if(games.length == 0) {
        func([]);
      }
      var output = [];
      for(var i = 0 ; i < games.length ; i++) {
        var query = {
          game: ObjectId(games[i]._id)
        };
        var item = {
          game: games[i]
        };
        var rq = GameResult.find(query).populate('player').exec();
        rq.then(function(gameResults) {
          item.players = gameResults;
          output.push(item);
          if(output.length == games.length) {
            func(output);
          }
        });
      }
    });
  };

  self.add = function(game, gameResults, func) {
    var winnerId = '';
    gameResults.forEach(function(gameResult) {
      if(gameResult.number == game.number) {
        winnerId = gameResult.playerId;
      }
    });
    if(winnerId == '') throw new Exception('PlayerId is null!!');

    game.winner = ObjectId(winnerId);
    game.deleted = false;
    var gameObj = new Game(game);

    gameObj.save(function(err) {
      if(err) throw new Exception(err);
      gameResults.forEach(function(gameResult) {
        var r = new GameResult({
          player: ObjectId(gameResult.playerId),
          game: gameObj._id,
          number: gameResult.number
        });
        r.save();
      });
      if(func) func(gameObj);
    });
    return true;
  };

  self.remove = function(id, func) {
    var q = Game.findById(ObjectId(id)).exec();
    q.then(function(game) {
      if(game != null) {
        game.deleted = true;
        game.save();
      }
      if(func) func(game);
    });
    return true;
  };

  self.update = function(id, game, gameResults, func) {
    var winnerId = '';
    gameResults.forEach(function(gameResult) {
      if(gameResult.number == game.number) {
        winnerId = gameResult.playerId;
      }
    });
    game.winner = ObjectId(winnerId);
    var q = Game.update({ _id: ObjectId(id) }, game).exec();
    q.then(function(count) {
      var q2 = GameResult.remove({ game : ObjectId(id) }).exec();
      q2.then(function(count2) {
        gameResults.forEach(function(gameResult) {
          gameResult.game = ObjectId(id);
          gameResult.player = ObjectId(gameResult.playerId);
          var r = new GameResult(gameResult);
          r.save();
        });
        func(game);
      });
    })
    return true;
  };

  self.findOne = function(id, func) {
    Game.findById(ObjectId(id)).populate('winner').exec(function(err, game) {
      if(game == null) {
        func(null);
        return false;
      };
      var q = GameResult.find({ game : ObjectId(id) })
                .populate('player')
                .exec();
      q.then(function(gameResults) {
        func({
          game: game,
          results: gameResults
        })
      });
    });
    return true;
  };
};