angular.module('myApp').controller('PlayerListCtrl', function($scope, $location, PlayerService) {
  var init = function() {
    PlayerService.getAll(load);
  };

  var load = function(data) {
    $scope.players = data;
  };

  $scope.players = [];
  $scope.addNewPlayer = function() {
    return $location.path('/player/new');
  };
  $scope.edit = function(id) {
    var params = {
      id: id
    };
    return $location.path('/player/edit').search(params);
  };
  init();
});