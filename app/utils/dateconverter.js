module.exports = new DateConverter();

function DateConverter() {
  var self = this;
  self.convert = function(str) {
    if(str == null) {
      return null;
    }
    var n = str.replace(/-/gi, '');
    if(n.length != 8) {
      return null;
    }
    return new Date(parseInt(n.substring(0, 4)), parseInt(n.substring(4, 6)) - 1, parseInt(n.substring(6, 8)));
  };
};