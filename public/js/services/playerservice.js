angular.module('myApp').service('PlayerService', function(Restangular) {
  var self = this;
  self.list = function(func) {
    Restangular.all('player').get('list').then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };
});