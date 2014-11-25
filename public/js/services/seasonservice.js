angular.module('myApp').service('SeasonService', function(Restangular) {
  var self = this;
  self.list = function(func) {
    Restangular.all('management').get('seasons').then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
    return true;
  };
});