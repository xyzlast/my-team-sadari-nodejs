angular.module('myApp').controller('PlayerEditCtrl', function($scope, $routeParams, PlayerService) {
  $scope.id = '';
  $scope.player = null;
  $scope.numberOptions = {
    format: 'n0'
  };
  $scope.used;

  $scope.save = function() {
    var data = {
      name: $scope.player.name,
      defaultAmount: $scope.player.defaultAmount,
      description: $scope.player.description,
      deleted: $scope.used == 'disabled'
    };

    var result = PlayerService.update($scope.id, data, function(count) {
      $scope.showGlobalMessage('수정되었습니다.');
      $scope.back();
    });

    if(!result.ok) {
      $scope.showGlobalMessage('danger', result.message);
    }
  };

  var init = function() {
    $scope.id = $routeParams.id;
    PlayerService.findOne($scope.id, load);
  };

  var load = function(p) {
    $scope.player = p;
    $scope.used = p.deleted ? 'disabled' : 'enabled';
  };

  init();
});