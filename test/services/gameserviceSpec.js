var service = require('../../app/services/gameservice.js');

describe('GameService Test', function() {
  // it('gameservice.add', function() {
  //   var gameResults = [
  //     {
  //       playerId: '546d6b06763ed0372df956f5',
  //       number: '1'
  //     },
  //     {
  //       playerId: '546d6b06763ed0372df956f6',
  //       number: '2'
  //     },
  //     {
  //       playerId: '546d6b06763ed0372df956f7',
  //       number: '3'
  //     },
  //     {
  //       playerId: '546d6b06763ed0372df956f8',
  //       number: '4'
  //     },
  //     {
  //       playerId: '546d6b06763ed0372df956f9',
  //       number: '5'
  //     },
  //     {
  //       playerId: '546d6b06763ed0372df956fa',
  //       number: '6'
  //     },
  //     {
  //       playerId: '546d6b06763ed0372df956fb',
  //       number: '7'
  //     }
  //   ];
  //   var result = service.add(new Date(), '3', 5600, 'test data', gameResults);
  //   expect(result).toBe(true);
  // });

  it('gameservice.remove', function() {
    var result = service.remove('5472bfbb4e79e6102e3a7140');
    expect(result).toBe(true);
  });
});

describe('Game.findOne', function() {
  var game = null;
  beforeEach(function(done) {
    service.findOne('5472bfbb4e79e6102e3a7140', function(gameObj) {
      expect(gameObj).not.toBe(null);
      game = gameObj;
      done();
    });
  });

  it('game select test', function() {
    expect(game).not.toBe(null);
    expect(game.winner).not.toBe(null);
  });
});

describe('GameService.listbyDate', function() {
  var results = null;
  beforeEach(function(done) {
    service.listByDate(2014, 10, 3, function(searchResults) {
      results = searchResults;
      done();
    });
  });

  it('game list test', function() {
    console.log('itemcount : ' + results.length);
    results.forEach(function(result) {
      expect(!!result.game.id).toBe(true);
    });
  });
});

describe('GameService.listByMonth', function() {
  var games = null;
  beforeEach(function(done) {
    service.listByMonth(2014, 10, function(results) {
      games = results;
      done();
    });
  });

  it('game list set', function() {
    expect(games).not.toBe(null);
    games.forEach(function(game) {
      expect(!!game.id).toBe(true);
      expect(!!game.winner).toBe(true);
    });
  });
});

describe('GameService.update', function() {
  var updatedGame = null;
  var gameId;
  beforeEach(function(done) {
    gameId = '5472bfbb4e79e6102e3a7140';
    var gameResults = [
      {
        playerId: '546d6b06763ed0372df956f5',
        number: '1'
      },
      {
        playerId: '546d6b06763ed0372df956f6',
        number: '2'
      }
    ];
    var updateGameData = {
      date: new Date(),
      cost: 100,
      description: 'updated',
      number: '2'
    };
    service.update(gameId, updateGameData, gameResults, function() {
      console.log('update completed');
      service.findOne(gameId, function(game) {
        updatedGame = game;
        done();
      });
    });
  });

  it('updated and checked', function() {
    expect(updatedGame).not.toBe(null);
    expect(updatedGame.game.winner.name).toBe('윤영권');
    expect(updatedGame.game.cost).toBe(100);
  });
});

// describe('GameService init data', function() {

// });