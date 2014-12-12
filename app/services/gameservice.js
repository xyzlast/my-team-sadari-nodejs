module.exports = new gameService();

function gameService() {
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
                          "$gte": new Date(Date.UTC(year, month, 1)),
                          "$lte": new Date(Date.UTC(year, month + 1, 1))
                        }
                };
    var q = Game.find(query).populate('winner').sort('date').exec();
    q.then(func);
  };

  self.listByDate = function(year, month, day, func) {
    var query = {
                  deleted: false,
                  date: {
                          "$gte": new Date(Date.UTC(year, month, day)),
                          "$lt": new Date(Date.UTC(year, month, day, 24))
                        }
                };

    // var output = [];
    // var cbGameListup = function(callback) {
    //   var q = Game.find(query).populate('winner').exec();
    //   q.then(function(games) {
    //     callback(null, games);
    //   });
    // };
    // var cbGameResultListup = function(games, callback) {
    //   if(games.length == 0) {
    //     func([]);
    //     callback(null, null);
    //   }
    //   games.forEach(function(game) {
    //     var query = { game: new ObjectId(game._id) };
    //     var rq = GameResult.find(query).populate('player').exec();
    //     rq.then(function(gameResults) {
    //       callback(null, game, gameResults, games.length);
    //     });
    //   });
    // };
    // var complCallback = function(error, game, gameResults, games.length) {
    //   if(game != null) {
    //     output.push({
    //       game: game,
    //       players: gameResults
    //     });
    //     if(output.length == games.length) {
    //       func(output);
    //     }
    //   }
    // };
    // async.waterfall([cbGameListup, cbGameResultListup], complCallback);

    var q = Game.find(query).populate('winner').exec();
    q.then(function(games) {
      if(games.length === 0) {
        func([]);
      }
      var output = [];
      games.forEach(function(game) {
        var query = { game: new ObjectId(game._id) };
        var rq = GameResult.find(query).populate('player').exec();
        rq.then(function(gameResults) {
          output.push({
            game: game,
            players: gameResults
          });
          if(output.length === games.length) {
            func(output);
          }
        });
      });
    });
  };

  self.add = function(game, gameResults, func) {
    var winnerId = '';
    gameResults.forEach(function(gameResult) {
      if(gameResult.number == game.number) {
        winnerId = gameResult.playerId;
      }
    });
    if(!winnerId) throw new Exception('PlayerId is null!!');

    game.winner = new ObjectId(winnerId);
    game.deleted = false;
    var gameObj = new Game(game);

    gameObj.save(function(err) {
      if(err) throw new Exception(err);
      gameResults.forEach(function(gameResult) {
        var r = new GameResult({
          player: new ObjectId(gameResult.playerId),
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
      if(game) {
        game.deleted = true;
        game.save();
      }
      if(func) func(game);
    });
    return true;
  };

  this.update = function(id, game, gameResults, func) {
    var winnerId = '';
    gameResults.forEach(function(gameResult) {
      if(gameResult.number === game.number) {
        winnerId = gameResult.playerId;
      }
    });
    console.log(winnerId);
    game.winner = ObjectId(winnerId);

    var q = Game.update({ _id: ObjectId(id) }, game).exec();
    q.then(function(count) {
      var q2 = GameResult.remove({ game : ObjectId(id) }).exec();
      q2.then(function(count2) {
        gameResults.forEach(function(gameResult) {
          gameResult.game = ObjectId(id);
          gameResult.player = new ObjectId(gameResult.playerId);
          var r = new GameResult(gameResult);
          r.save();
        });
        func(game);
      });
    });

    return true;
  };

  self.findOne = function(id, func) {
    Game.findById(ObjectId(id)).populate('winner').exec(function(err, game) {
      if(!game) {
        func(null);
        return false;
      }
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