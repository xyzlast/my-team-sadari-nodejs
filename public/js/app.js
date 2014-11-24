angular.module('myApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTouch',
  'restangular',
  'kendo.directives'
]).config(function($routeProvider, RestangularProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/game/calendar.html',
      controller: 'GameCalendarCtrl'
    })
    .when('/game/day', {
      templateUrl: '/views/game/list.html',
      controller: 'GamesInDayCtrl'
    })
    .when('/game/edit', {
      templateUrl: '/views/game/edit.html',
      controller: 'GameEditCtrl'
    })
    .when('/game/new', {
      templateUrl: '/views/game/edit.html',
      controller: 'GameNewCtrl'
    })
    .when('/statistics/players', {
      templateUrl: '/views/statistics/players.html',
      controller: 'StatisticsPlayersCtrl'
    })
    .when('/statistics/numbers', {
      templateUrl: '/views/statistics/numbers.html',
      controller: 'StatisticsNumbersCtrl'
    });

  RestangularProvider.setDefaultHttpFields({
    cache: false
  });
  RestangularProvider.setBaseUrl('/api');
  RestangularProvider.setRequestSuffix('.json');
  kendo.culture('ko-KR');
});