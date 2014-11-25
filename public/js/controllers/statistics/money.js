angular.module('myApp').controller('StatisticsMoneyCtrl', function($scope, StatisticsService, SeasonService) {
  $scope.pieChart = null;
  $scope.pieChartData = [];
  $scope.rawData = [];
  $scope.pieChartOptions = {
    legend: {
      position: 'bottom'
    },
    seriesDefaults: {
      labels: {
        template: '#= kendo.format("{0}원", value)#',
        position: 'center',
        visible: true,
        background: 'transparent'
      }
    },
    seriesColors: ['#92D050', '#FFC000', '#ACACEA', '#FF3300', '#F0B0F0', '#D0A0F0', '#00B0F0'],
    series: [{
      type: 'bar',
      field: 'totalCost',
      categoryField: 'player'
    }],
    tooltip: {
      visible: true,
      format: '{0}'
    },
    filter: {
      field: 'month',
      operator: 'eq',
      value: 5
    },
    valueAxis: {
      line: {
          visible: false
      },
      minorGridLines: {
          step: 5000
      }
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
    StatisticsService.calculateByMoney(season.from, season.to, load);
  };

  var init = function() {
    $scope.changeMenu('menu-statistics');
    SeasonService.list(loadSeasons);
    $scope.$on('$destroy', function() {
      if($scope.pieChart != null) {
        $scope.pieChart.destroy();
      }
      if($scope.barChart != null) {
        $scope.barChart.destroy();
      }
    });
  };

  var loadSeasons = function(seasons) {
    $scope.seasons = seasons;
    $scope.season = seasons[0]._id;
    $scope.load();
  };

  var load = function(data) {
    $scope.rawData = [];
    angular.forEach(data, function(d) {
      $scope.rawData.push({
        player: d.player.name,
        totalCost: d.totalCost,
        totalCostDisplay: kendo.toString(d.totalCost, 'c0'),
        averageCost: d.averageCost,
        averageCostDisplay: kendo.toString(d.averageCost, 'c0')
      });
    });
    $scope.pieChartData = angular.copy($scope.rawData);
  };

  init();
});