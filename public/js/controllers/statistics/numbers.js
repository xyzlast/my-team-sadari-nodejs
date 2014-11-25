angular.module('myApp').controller('StatisticsNumbersCtrl', function($scope, StatisticsService, SeasonService) {
  $scope.pieChart = null;
  $scope.pieChartData = [];

  $scope.pieChartOptions = {
    legend: {
      position: 'bottom'
    },
    seriesDefaults: {
      labels: {
        template: '#= category # : #= kendo.format("{0} 회", value)#',
        position: 'center',
        visible: true,
        background: 'transparent'
      }
    },
    seriesColors: ['#92D050', '#FFC000', '#ACACEA', '#FF3300', '#F0B0F0', '#D0A0F0', '#00B0F0'],
    series: [{
      type: 'pie',
      field: 'count',
      categoryField: 'number'
    }],
    tooltip: {
      visible: true,
      format: '{0}'
    },
    filter: {
      field: 'month',
      operator: 'eq',
      value: 5
    }
  };

  $scope.seasons = [];
  $scope.season = null;

  $scope.load = function() {
    var season = null;
    angular.forEach($scope.seasons, function(s) {
      if(s._id == $scope.season) {
        season = s;
      }
    });
    StatisticsService.calculateByNumbers(season.from, season.to, load);
  };

  var init = function() {
    $scope.changeMenu('menu-statistics');
    SeasonService.list(loadSessions);
    $scope.$on('$destroy', function() {
      if($scope.pieChart != null) {
        $scope.pieChart.destroy();
      }
      if($scope.barChart != null) {
        $scope.barChart.destroy();
      }
    });
  };

  var loadSessions = function(seasons) {
    $scope.seasons = seasons;
    $scope.season = seasons[0]._id;
    $scope.load();
  };

  var load = function(output) {
    $scope.pieChartData = [];
    angular.forEach(output, function(o) {
      $scope.pieChartData.push({
        number: o.number.toString() + '번',
        count: o.count
      });
    });
  };

  init();
});