var dbConfig = require('../app/config/dbConfig.js');
var connectResult = dbConfig.connect();

describe('DBConnect Config Spec', function() {
  it('dbConnect test', function() {
    expect(!!connectResult).toBe(true);
    expect(connectResult.models.length).not.toBe(0);
    connectResult.models.forEach(function(model) {
      console.log(model);
    });
  });
});