angular.module('myApp').controller('PlayerNewCtrl', function($scope, PlayerService) {
  $scope.player = null;
  $scope.numberOptions = {
    format: 'n0'
  };
  $scope.used = 'enabled';

  $scope.save = function() {
    var data = {
      name: $scope.player.name,
      defaultAmount: $scope.player.defaultAmount,
      description: $scope.player.description,
      deleted: $scope.used == 'disabled'
    };

    var result = PlayerService.add(data, function(count) {
      $scope.showGlobalMessage('추가되었습니다.');
      $scope.back();
    });

    if(!result.ok) {
      $scope.showGlobalMessage('danger', result.message);
    }
  };

  var init = function() {
    $scope.player = {
      name: '',
      description: '',
      defaultAmount: 0
    };
    $scope.used = 'enabled';
  };

  init();
});