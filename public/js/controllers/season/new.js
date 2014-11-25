angular.module('myApp').controller('SeasonNewCtrl', function($scope, SeasonService) {
  $scope.item = {};

  $scope.save = function() {
    var result = SeasonService.add($scope.item, function(output) {
      $scope.showGlobalMessage('success', 'Season 생성이 되었습니다.');
      $scope.back();
    });
    if(!result.ok) {
      $scope.showGlobalMessage('danger', result.message);
    }
  };

  var init = function() {
    var now = new Date();
    console.log(now.getTime());
    $scope.item = {
      name: '',
      description: '',
      from: kendo.toString(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      to: kendo.toString(now, 'yyyy-MM-dd')
    };
  };
  init();
});