angular.module('myApp').service('SeasonService', function(Restangular) {
  var self = this;
  self.list = function(func) {
    Restangular.all('').get('seasons').then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
    return true;
  };

  self.add = function(season, func) {
    if(!(season.name && season.from && season.to)) {
      return {
        ok: false,
        message: '항목을 모두 입력해주세요.(이름, From, To)'
      };
    }

    Restangular.all('season/add').post(season).then(function(jsonResult) {

    });

    return {
      ok: true,
      message: 'OK'
    };
  };

  self.remove = function(seasonId, func) {
    Restangular.all('season/' + seasonId).remove().then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };
});