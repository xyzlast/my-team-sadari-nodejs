angular.module('myApp').controller('SeasonListCtrl', function($scope, $location, $window, SeasonService) {
  $scope.seasons = [];
  var init = function() {
    $scope.changeMenu('menu-season');
    SeasonService.list(load);
  };

  var load = function(seasons) {
    $scope.seasons = seasons;
  };

  $scope.edit = function(seasonId) {
    if(seasonId == '0') {
      $scope.showGlobalMessage('info', '최상위 진행중인 Season은 수정할 수 없습니다.');
      return false;
    }
    var params = {
      id: seasonId
    };
    return $location.path('/season/edit').search(params);
  };

  $scope.remove = function(seasonId) {
    if(seasonId == '0') {
      $scope.showGlobalMessage('info', '최상위 진행중인 Season은 수정할 수 없습니다.');
      return false;
    }
    if($window.confirm('삭제하시겠습니까?')) {
      SeasonService.remove(seasonId, function(data) {
        $scope.showGlobalMessage('info', "Season이 삭제되었습니다.");
        init();
      });
    }
  };

  $scope.addNewSeason = function() {
    return $location.path('/season/new');
  };

  init();
});