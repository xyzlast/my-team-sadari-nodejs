var service = require('../../app/services/seasonservice.js');

describe('SeasonService.list', function() {
  var out = null;
  beforeEach(function(done) {
    console.log('SeasonService.list');
    service.list(function(seasons) {
      out = seasons;
      done();
    });
  });

  it('check out value', function() {
    console.log(out);
    expect(out).not.toBe(null);
    expect(out.length).not.toBe(0);
  });
});