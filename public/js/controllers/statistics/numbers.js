angular.module('myApp').controller('StatisticsNumbersCtrl', function($scope, StatisticsService) {
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
    },
    chartArea: {
      width: 500,
      height: 360
    }
  };

  var init = function() {
    StatisticsService.calculateByNumbers(load);
    $scope.$on('$destroy', function() {
      if($scope.pieChart != null) {
        $scope.pieChart.destroy();
      }
      if($scope.barChart != null) {
        $scope.barChart.destroy();
      }
    });
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