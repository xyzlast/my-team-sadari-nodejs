angular.module('myApp').controller('GamesInDayCtrl', function($scope, $location, $routeParams, GameService) {
  $scope.title = '';
  $scope.games = [];
  $scope.noGame = true;

  var init = function() {
    $scope.changeMenu('menu-main');
    var year = $routeParams.year;
    var month = $routeParams.month;
    var day = $routeParams.day;
    $scope.title = year + '-' + month + '-' + day;
    GameService.getByDay(year, month, day, list);
  };

  var list = function(data) {
    $scope.games = data;
    $scope.noGame = angular.isUndefined(data.length) || data.length == 0
  };

  $scope.edit = function(id) {
    var params = {
      id: id
    };
    return $location.path('/game/edit').search(params);
  };

  $scope.addNewGame = function() {
    var params = {
      date: $scope.title
    };
    return $location.path('/game/new').search(params);
  };

  init();
});