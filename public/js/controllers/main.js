angular.module('myApp').controller('MainCtrl', function($scope, $window, $timeout) {
  $scope.globalMessage = '';
  $scope.messageType = '';
  $scope.messageShown = false;

  $scope.showGlobalMessage = function(type, message) {
    $scope.messageType = type;
    $scope.globalMessage = message;
    $scope.messageShown = true;

    $timeout(function() {
      $scope.messageShown = false;
    }, 3000);
  };

  $scope.back = function() {
    $window.history.back();
  };

  $scope.changeMenu = function(id) {
    angular.element('#header-menu li').removeClass('active');
    angular.element('#' + id).addClass('active');
  };
});