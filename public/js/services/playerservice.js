angular.module('myApp').service('PlayerService', function(Restangular) {
  var self = this;
  self.list = function(func) {
    Restangular.all('player').get('list').then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };
  self.getAll = function(func) {
    var params = {
      all: true
    };
    Restangular.all('player').get('list', params).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };
  self.findOne = function(id, func) {
    Restangular.all('player').get(id).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };

  self.add = function(player, func) {
    if(!player.name || angular.isUndefined(player.defaultAmount)) {
      return {
        ok: false,
        message: '모든 값들을 넣어주세요.'
      };
    }
    if(player.defaultAmount < 0) {
      return {
        ok: false,
        message: '초기값은 0보다 작을 수 없습니다.'
      };
    }
    Restangular.all('player/add').post(player).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
    return {
      ok: true
    };
  };

  self.update = function(id, player, func) {
    if(!player.name || angular.isUndefined(player.defaultAmount)) {
      return {
        ok: false,
        message: '모든 값들을 넣어주세요.'
      };
    }
    if(player.defaultAmount < 0) {
      return {
        ok: false,
        message: '초기값은 0보다 작을 수 없습니다.'
      };
    }
    Restangular.all('player/' + id).post(player).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
    return {
      ok: true
    };
  };

  self.remove = function(id, func) {
    Restangular.all('player').remove(id).then(function(jsonResult) {
      if(jsonResult.ok && func) {
        func(jsonResult.data);
      }
    });
  };
});