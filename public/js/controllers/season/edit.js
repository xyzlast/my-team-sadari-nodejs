angular.module('myApp').controller('SeasonEditCtrl', function($scope, $routeParams, SeasonService) {
  $scope.id = '';
  $scope.item = null;

  var init = function() {
    $scope.id = $routeParams.id;
    SeasonService.findOne($scope.id, load);
  };

  var load = function(season) {
    $scope.item = season;
  };

  $scope.save = function() {
    var result = SeasonService.update($scope.id, $scope.item, function(data) {
      $scope.showGlobalMessage('success', '수정되었습니다.');
      $scope.back();
    });
    if(!result.ok) {
      $scope.showGlobalMessage('danger', result.data);
    }
  };
  init();
});