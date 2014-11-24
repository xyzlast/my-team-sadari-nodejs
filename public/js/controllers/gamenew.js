angular.module('myApp').controller('GameNewCtrl', function($scope, $routeParams, GameService, PlayerService) {
  $scope.mode = 'add';
  $scope.numberOptions = {
    format: 'n0'
  };
  $scope.players = [];
  $scope.game;

  var init = function() {
    $scope.changeMenu('menu-main');
    $scope.mode = 'add';
    PlayerService.list(loadPlayers)
  };

  var loadPlayers = function(data) {
    var date = $routeParams.date;
    $scope.game = {
      number: 1,
      cost: 7000,
      date: $routeParams.date
    };
    $scope.players = data;
    var number = 1;
    angular.forEach($scope.players, function(player) {
      player.joined = true;
      player.number = number;
      number++;
    });
  };

  $scope.save = function() {
    var gameResults = [];
    angular.forEach($scope.players, function(player) {
      if(player.joined) {
        gameResults.push({
          playerId: player._id,
          number: player.number
        });
      }
    });
    var validateResult = GameService.add($scope.game, gameResults, function(jsonResult) {
      $scope.showGlobalMessage('success', '게임이 저장되었습니다.');
      $scope.back();
    });
    if(!validateResult.ok) {
      $scope.showGlobalMessage('danger', validateResult.message);
    }
  };

  init();
});