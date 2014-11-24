angular.module('myApp').controller('StatisticsPlayersCtrl', function($scope, StatisticsService) {
  $scope.pieChart = null;
  $scope.pieChartData = [];
  $scope.includeDefaultAmount = true;

  $scope.pieChartOptions = {
    legend: {
      position: 'bottom'
    },
    seriesDefaults: {
      labels: {
        template: '#= category # : #= kendo.format("{0}", value)#',
        position: 'outsideEnd',
        visible: true,
        background: 'transparent'
      }
    },
    seriesColors: ['#efd574', '#8d739d', '#e58c9', '#8cc5db', '#9edfcf'],
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
    },
    chartArea: {
      width: 500,
      height: 360
    }
  };

  var init = function() {
    StatisticsService.calculateByPlayers(load);
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

  $scope.rawData;
  var load = function(data) {
    $scope.rawData = angular.copy(data);
    $scope.rawData.sort(function(a, b) {
      return a.player.name > b.player.name;
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
      return a.count < b.count;
    });
    $scope.pieChartData = output;
  };

  console.log('controller init');
  init();
});