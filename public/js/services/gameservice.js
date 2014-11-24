angular.module('myApp').service('GameService', function GameService(Restangular, GameValidator) {
  var self = this;
  self.getByMonth = function(year, month, func) {
    var params = {
      year: year,
      month: month
    };
    Restangular.all('').get('games', params).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };

  self.getByDay = function(year, month, day, func) {
    var params = {
      year: year,
      month: parseInt(month) - 1,
      day: day
    };
    Restangular.all('').get('games', params).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
    return true;
  };

  self.findOne = function(id, func) {
    Restangular.all('game').get(id).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };

  self.remove = function(id, func) {
    Restangular.all('game/' + id).remove().then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };

  self.add = function(game, gameResults, func) {
    var validateResult = GameValidator.validate(game.date, game.number, game.cost, gameResults);
    if(validateResult.ok) {
      var data = {
        game: game,
        gameResults: gameResults
      };
      Restangular.all('game/add').post(data).then(function(jsonResult) {
        func(jsonResult);
      });
      return {
        ok: true
      }
    } else {
      return validateResult;
    }
  };

  self.update = function(id, game, gameResults, func) {
    var validateResult = GameValidator.validate(game.date, game.number, game.cost, gameResults);
    if(validateResult.ok) {
      var data = {
        game: game,
        gameResults: gameResults
      };
      Restangular.all('game/update/' + id).post(data).then(function(jsonResult) {
        func(jsonResult);
      });
      return {
        ok: true
      }
    } else {
      return validateResult;
    }
  };
});