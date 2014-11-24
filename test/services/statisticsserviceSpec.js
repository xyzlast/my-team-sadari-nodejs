var service = require('../../app/services/statisticsservice.js');

describe('calculateByPlayers', function() {
  var out;
  beforeEach(function(done) {
    console.log('calculateByPlayers');
    service.calculateByPlayers(function(output) {
      out = output;
      done();
    });
  });

  it('check output', function() {
    console.log(out);
  });
});