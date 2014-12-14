module.exports = new gameService();

function gameService() {
  var self = this;
  var mongoose = require('mongoose');
  var Game = mongoose.model('Game');
  var GameResult = mongoose.model('GameResult');
  var ObjectId = mongoose.Types.ObjectId;
  var async = require('async');

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
    var listupGames = function(callback) {
      var query = {
                    deleted: false,
                    date: {
                            "$gte": new Date(Date.UTC(year, month, day)),
                            "$lt": new Date(Date.UTC(year, month, day, 24))
                          }
                  };
      var q = Game.find(query).populate('winner').exec();
      q.then(function (games) {
        callback(null, games);
      });
    };

    var buildGameWithResults = function(games, callback) {
      var results = [];
      if (games.length === 0) {
        callback(null, []);
      }
      games.forEach(function (game) {
        var query = { game: ObjectId(game._id) };
        var q = GameResult.find(query).populate('player').exec();
        q.then(function (gameResults) {
          results.push({
            game: game,
            players: gameResults
          });

          if(results.length === games.length) {
            callback(null, results);
          }
        });
      });
    };

    var callbackWhenCompleted = function(error, results) {
      if (error) throw new Exception(error);
      func(results);
    };
    async.waterfall([listupGames, buildGameWithResults], callbackWhenCompleted);

    // var q = Game.find(query).populate('winner').exec();
    // q.then(function(games) {
    //   if(games.length === 0) {
    //     func([]);
    //   }
    //   var output = [];
    //   games.forEach(function(game) {
    //     var query = { game: new ObjectId(game._id) };
    //     var rq = GameResult.find(query).populate('player').exec();
    //     rq.then(function(gameResults) {
    //       output.push({
    //         game: game,
    //         players: gameResults
    //       });
    //       if(output.length === games.length) {
    //         func(output);
    //       }
    //     });
    //   });
    // });
  };

  self.add = function(game, gameResults, func) {
    var winnerId = '';
    gameResults.forEach(function(gameResult) {
      if (gameResult.number === game.number) {
        winnerId = gameResult.playerId;
      }
    });
    if (!winnerId) throw new Exception('PlayerId is null!!');

    var saveGame = function(callback) {
      game.winner = new ObjectId(winnerId);
      game.deleted = false;
      var gameObj = new Game(game);

      gameObj.save(function(err) {
        if (err) throw new Exception(err);
        callback(null, gameObj);
      });
    };

    var saveGameResults = function(gameObj, callback) {
      gameResults.forEach(function (gameResult) {
        var r = new GameResult({
          player: new ObjectId(gameResult.playerId),
          game: gameObj._id,
          number: gameResult.number
        });
        r.save();
      });
      callback(null, gameObj);
    };

    var callbackWhenCompleted = function(error, results) {
      if (error) throw new Exception(err);
      func(results);
    };
    async.waterfall([saveGame, saveGameResults], callbackWhenCompleted);
    return true;

    // gameObj.save(function(err) {
    //   if(err) throw new Exception(err);
    //   gameResults.forEach(function(gameResult) {
    //     var r = new GameResult({
    //       player: new ObjectId(gameResult.playerId),
    //       game: gameObj._id,
    //       number: gameResult.number
    //     });
    //     r.save();
    //   });
    //   if(func) func(gameObj);
    // });
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
    game.winner = ObjectId(winnerId);

    var updateGame = function(callback) {
      var q = Game.update({ _id: ObjectId(id) }, game).exec();
      q.then(function (count) {
        callback(null);
      });
    };
    var removeOldGamResults = function(callback) {
      var q = GameResult.remove({game: ObjectId(id)}).exec();
      q.then(function (count) {
        callback(null);
      });
    };
    var addNewGameResults = function(callback) {
      gameResults.forEach(function (gameResult) {
        gameResult.game = ObjectId(id);
        gameResult.player = new ObjectId(gameResult.playerId);
        var r = new GameResult(gameResult);
        r.save();
      });
      callback(null);
    };
    var callbackWhenCompleted = function(error) {
      if (error) throw new Exception(error);
      func(game);
    };
    async.waterfall([updateGame, removeOldGamResults, addNewGameResults], callbackWhenCompleted);
    return true;
  };

  self.findOne = function(id, func) {
    var findGame = function(callback) {
      Game.findById(ObjectId(id)).populate('winner').exec(function (error, game) {
        if (!game) func(null);
        callback(null, game);
      });
    };

    var findGameResults = function(game, callback) {
      var q = GameResult.find({ game: ObjectId(id) }).populate('player').exec();
      q.then(function (gameResults) {
        var result = {
          game: game,
          results: gameResults
        };
        callback(null, result);
      });
    };

    var callbackWhenCompleted = function(error, result) {
      if (error) throw new Exception(error);
      func(result);
    };
    async.waterfall([findGame, findGameResults], callbackWhenCompleted);
    return true;
  };
};