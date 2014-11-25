var mongoose = require('mongoose');
var Season = mongoose.model('Season');
var ObjectId = mongoose.Types.ObjectId;

module.exports.list = function(func) {
  var q = Season.find({ deleted: false }).sort({ to: 'desc' }).exec();
  q.then(function(seasons) {
    var output = [];
    var currentSeason = {
      _id: '0',
      name: 'now',
      from: null,
      to: null,
    };

    if(seasons.length != 0) {
      currentSeason.from = seasons[0].to;
    }
    output.push(currentSeason);
    seasons.forEach(function(season) {
      output.push(season);
    });
    func(output);
  });
};

module.exports.add = function(name, from, to, description, func) {
  var season = new Season({
    name: name,
    from: from,
    to: to,
    description: description,
    deleted: false
  });
  var q = season.save(function(err) {
    if(err) {
      func(null);
    }
    func(season);
  });
};

module.exports.remove = function(id, func) {
  var query = { _id: ObjectId(id) };
  var q = Season.update(query, { deleted: true }).exec();
  q.then(function(count) {
    func('remove complted');
  });
};

module.exports.update = function(id, name, from, to, description, func) {
  var query = { _id: ObjectId(id) };
  var season = {
    name: name,
    from: from,
    to: to,
    description: description
  };
};