angular.module('myApp').service('GameValidator', function() {
  var self = this;

  self.validate = function(date, number, cost, gameResults) {
    if(!(date && number && cost)) {
      return {
        ok: false,
        message: '항목이 정상적으로 입력되지 않았습니다.'
      };
    }

    for(var i = 1 ; i <= gameResults.length ; i++) {
      var hasNumber = false;
      angular.forEach(gameResults, function(gameResult) {
        if(!hasNumber) {
          hasNumber = gameResult.number == i;
        }
      });

      if(!hasNumber) {
        return {
          ok: false,
          message: '번호 ' + i + '번이 빠졌습니다.'
        };
      }
    }

    return {
      ok: true
    };
  };

});