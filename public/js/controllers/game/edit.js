angular.module('myApp').controller('GameEditCtrl', function($scope, $location, GameService, PlayerService, $routeParams) {
  $scope.numberOptions = {
    format: 'n0'
  };
  $scope.players = [];
  $scope.game;
  $scope.mode = '';

  var id;
  var init = function() {
    $scope.changeMenu('menu-main');
    id = $routeParams.id;
    $scope.mode = 'edit';
    GameService.findOne(id, loadGame);
  };

  var loadGame = function(data) {
    $scope.players = data.players;
    $scope.game = data.game;
    angular.forEach($scope.players, function(player) {
      angular.forEach(data.results, function(result) {
        if(result.player._id == player._id) {
          player.joined = true;
          player.number = result.number;
        }
      });
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

    var validateResult = GameService.update(id, $scope.game, gameResults, function(jsonResult) {
      $scope.showGlobalMessage('success', '게임이 저장되었습니다.');
      $scope.back();
    });

    if(!validateResult.ok) {
      $scope.showGlobalMessage('danger', validateResult.message);
    }
  };

  $scope.remove = function() {
    GameService.remove(id, function(data) {
      $scope.showGlobalMessage('info', 'Game이 삭제 되었습니다.');
      $scope.back();
    })
  };

  init();
});