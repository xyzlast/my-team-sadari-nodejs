angular.module('myApp').controller('SeasonListCtrl', function($scope, SeasonService) {
  $scope.seasons = [];
  var init = function() {
    SeasonService.list(load);
  };

  var load = function(seasons) {
    $scope.seasons = seasons;
  };
  init();
});