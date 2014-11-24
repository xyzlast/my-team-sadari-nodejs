angular.module('myApp').service('StatisticsService', function(Restangular){
  var self = this;
  self.calculateByPlayers = function(func) {
    Restangular.all('statistics').get('players').then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };

  self.calculateByNumbers = function(func) {
    Restangular.all('statistics').get('numbers').then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };
});