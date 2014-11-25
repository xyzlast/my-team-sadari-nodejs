angular.module('myApp').service('StatisticsService', function(Restangular) {
  var self = this;
  var restBase = Restangular.all('statistics');

  self.calculateByPlayers = function(from, to, func) {
    var params = { };
    if(from != null) {
      params.from = kendo.toString(from, 'yyyy-MM-dd');
    }
    if(to != null) {
      params.to = kendo.toString(to, 'yyyy-MM-dd');
    }
    restBase.get('players', params).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };

  self.calculateByNumbers = function(from, to, func) {
    var params = { };
    if(from != null) {
      params.from = kendo.toString(from, 'yyyy-MM-dd');
    }
    if(to != null) {
      params.to = kendo.toString(to, 'yyyy-MM-dd');
    }
    restBase.get('numbers', params).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };

  self.calculateByMoney = function(from, to, func) {
    var params = { };
    if(from != null) {
      params.from = kendo.toString(from, 'yyyy-MM-dd');
    }
    if(to != null) {
      params.to = kendo.toString(to, 'yyyy-MM-dd');
    }
    restBase.get('money', params).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };

});