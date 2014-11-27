angular.module('myApp').controller('StatisticsPlayersCtrl', function($scope, StatisticsService, SeasonService) {
  $scope.pieChart = null;
  $scope.pieChartData = [];
  $scope.includeDefaultAmount = true;

  $scope.pieChartOptions = {
    legend: {
      position: 'bottom'
    },
    seriesDefaults: {
      labels: {
        template: '#= category # (#= kendo.format("{0:2}%", percentage * 100)#)',
        position: 'center',
        visible: true,
        background: 'transparent'
      }
    },
    seriesColors: ['#92D050', '#FFC000', '#ACACEA', '#FF3300', '#F0B0F0', '#D0A0F0', '#00B0F0'],
    series: [{
      type: 'pie',
      field: 'count',
      categoryField: 'name'
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
    StatisticsService.calculateByPlayers(season.from, season.to, load);
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
    $scope.$watch('includeDefaultAmount', function(newValue, oldValue) {
      if(newValue == oldValue) {
        return;
      }
      buildData();
    });
  };

  var loadSeasons = function(seasons) {
    $scope.seasons = seasons;
    $scope.season = seasons[0]._id;
    $scope.load();
  };

  $scope.rawData;
  var load = function(data) {
    $scope.rawData = angular.copy(data);
    $scope.rawData.sort(function(a, b) {
      if(a.player.name < b.player.name) {
        return -1;
      } else if(a.player.name > b.player.name) {
        return 1;
      } else {
        return 0;
      }
    });
    buildData();
  };

  var buildData = function() {
    var output = [];
    angular.forEach($scope.rawData, function(d) {
      if($scope.includeDefaultAmount) {
        output.push({
          name: d.player.name,
          count: d.count + d.player.defaultAmount
        });
      } else {
        output.push({
          name: d.player.name,
          count: d.count
        });
      }
    });
    output.sort(function(a, b) {
      if(b.count > a.count) {
        return 1;
      } else if(b.count < a.count) {
        return -1;
      } else {
        return 0;
      }
    });
    $scope.pieChartData = output;
  };

  init();
});