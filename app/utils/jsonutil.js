module.exports = new JsonUtil();

function JsonUtil() {
  var self = this;
  self.buildJson = function(data) {
    return {
      ok: true,
      data: data
    };
  }
};