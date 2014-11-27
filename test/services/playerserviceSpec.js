var config = require('../../app/config/config.js');
var dbConfig = require('../../app/config/dbConfig.js');
var service = require('../../app/services/playerservice.js');

// describe('playerService Test', function() {
//   beforeEach(function() {
//     expect(!!service).toBe(true);
//   });

//   it('add new Player', function() {
//     var player = service.add('ykyoon', 10, 'hahaha');
//     expect(!!player._id).toBe(true);
//   });
// });

describe('playerService.list', function() {
  var players;
  beforeEach(function(done) {
    service.list(function(resultPlayers) {
      players = resultPlayers;
      done();
    });
  });

  it('list all players', function(done) {
    expect(!!players).toBe(true);
    expect(players.length).toBe(7);
    players.forEach(function(player) {
      expect(player.defaultAmount).not.toBe(0);
    });
    done();
  });
});

describe('playerService.findOne', function() {
  var player = null;
  beforeEach(function(done) {
    service.findOne('546d6b06763ed0372df956f5', function(p) {
      expect(p).not.toBe(null);
      player = p;
      done();
    });
  });

  it('check one player', function() {
    expect(player).not.toBe(null);
    console.log(player);
  });
});

// describe('add init players', function() {
//   var player1 = service.add('서인석', 2, '');
//   expect(player1).not.toBe(null);
//   var player2 = service.add('윤영권', 4, '');
//   expect(player2).not.toBe(null);
//   var player3 = service.add('서강춘', 4, '');
//   expect(player3).not.toBe(null);
//   var player4 = service.add('김지욱', 5, '');
//   expect(player4).not.toBe(null);
//   var player5 = service.add('강민석', 5, '');
//   expect(player5).not.toBe(null);
//   var player6 = service.add('주진영', 7, '');
//   expect(player6).not.toBe(null);
//   var player7 = service.add('김희범', 10, '');
//   expect(player7).not.toBe(null);
// });