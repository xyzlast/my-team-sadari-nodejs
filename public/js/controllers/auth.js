angular.module('myApp').controller('AuthCtrl', function($scope, Restangular) {
  $scope.authorized = false;
  $scope.user;
  $scope.master;

  var init = function() {
    console.log('init');
    Restangular.all('auth').get('info').then(function(jsonResult) {
      $scope.authorized = jsonResult.ok;
      $scope.user = jsonResult.user;
      $scope.master = jsonResult.master;
    });
  };

  init();
});