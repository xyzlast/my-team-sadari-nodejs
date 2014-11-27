angular.module('myApp').controller('GameCalendarCtrl', function($scope, $location, GameService) {

  $scope.calendar = null;
  $scope.calendarData = [];
  $scope.schedulerOptions = {
    footer: {
      command: false
    },
    messasges: {
      today: '오늘'
    },
    header: false,
    height: 480,
    editable: false,
    selectable: true,
    views: ['month'],
    resources: [
      {
        field: 'matchPlayerName',
        dataSource: [
                      { text: '서강춘', value: '서강춘', color: '#92D050' },
                      { text: '윤영권', value: '윤영권', color: '#FFC000' },
                      { text: '김희범', value: '김희범', color: '#ACACEA' },
                      { text: '김지욱', value: '김지욱', color: '#FF3300' },
                      { text: '서인석', value: '서인석', color: '#F0B0F0' },
                      { text: '강민석', value: '강민석', color: '#D0A0F0' },
                      { text: '주진영', value: '주진영', color: '#00B0F0' }
        ]
      }
    ]
  };
  $scope.year = 0;
  $scope.month = 0;

  var init = function() {
    $scope.changeMenu('menu-main');
    list(new Date());
    $scope.$on('$destroy', function() {
      if($scope.calendar) {
        $scope.calendar.destroy();
      }
    });
  };

  var list = function(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    $scope.year = year;
    $scope.month = month;
    GameService.getByMonth(year, month, buildCalendarData);
  };

  var buildCalendarData = function(data) {
    var items = [];
    angular.forEach(data, function(d) {
      var item = {
        id: d.id,
        start: new Date(d.date),
        end: new Date(d.date),
        title: d.winner + '(' + d.number + ')',
        matchPlayerName : d.winner,
        description: ''
      };
      items.push(item);
    });
    $scope.calendarData = items;
  };

  var buildTimes = function(date) {
    var y = date.getFullYear();
    var m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    $scope.startTime = firstDay;
    $scope.endTime = lastDay;
  };

  $scope.calendarOnNavigate = function(e) {
    var year = e.date.getFullYear();
    var month = e.date.getMonth();

    if($scope.year != year || $scope.month != month) {
      list(new Date(year, month));
    }
  };

  $scope.calendarOnChange = function(e) {
    var params = {
      year: e.start.getFullYear(),
      month: e.start.getMonth() + 1,
      day: e.start.getDate()
    };
    $location.path('/game/day').search(params);
  };

  init();
});