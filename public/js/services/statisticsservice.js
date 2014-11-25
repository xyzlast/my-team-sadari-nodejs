angular.module('myApp').service('StatisticsService', function(Restangular, $filter) {
  var self = this;
  var restBase = Restangular.all('statistics');

  var buildParams = function(from, to) {
    var params = {};
    if(from != null) {
      params.from = $filter('date')(from, 'yyyy-MM-dd');
    }
    if(to != null) {
      params.to = $filter('date')(to, 'yyyy-MM-dd');
    }
    return params;
  };

  self.calculateByPlayers = function(from, to, func) {
    var params = buildParams(from, to);
    restBase.get('players', params).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };

  self.calculateByNumbers = function(from, to, func) {
    var params = buildParams(from, to);
    console.log(params);
    restBase.get('numbers', params).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };

  self.calculateByMoney = function(from, to, func) {
    var params = buildParams(from, to);
    restBase.get('money', params).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };

});