var service = require('../../app/services/statisticsservice.js');

describe('calculateByPlayers', function() {
  var out;
  beforeEach(function(done) {
    console.log('calculateByPlayers');
    service.calculateByPlayers(null, null, function(output) {
      out = output;
      done();
    });
  });

  it('check output', function() {
    console.log(out);
    expect(out).not.toBe(null);
    expect(out.length).toBe(7);
  });
});

describe('calculateByNumbers', function() {
  var out;
  beforeEach(function(done) {
    console.log('calculateByNumbers');
    service.calculateByNumbers(null, null, function(output) {
      out = output;
      done();
    });
  });

  it('check output', function() {
    console.log(out);
    expect(out.length).toBe(7);
  });
});

describe('calculateByMoney', function() {
  var out;
  beforeEach(function(done) {
    console.log('calculateByMoney');
    service.calculateByMoney(null, null, function(output) {
      out = output;
      done();
    });
  });

  it('check output', function() {
    console.log(out);
    expect(out.length).toBe(7);
  });
});