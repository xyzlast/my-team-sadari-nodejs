var mongoose = require('mongoose');
var Season = mongoose.model('Season');
var ObjectId = mongoose.Types.ObjectId;

module.exports.findOne = function(id, func) {
  var q = Season.findById(ObjectId(id)).exec();
  q.then(function(season) {
    func(season);
  });
};

module.exports.list = function(func) {
  var q = Season.find({ deleted: false }).sort({ to: 'desc' }).exec();
  q.then(function(seasons) {
    var output = [];
    var currentSeason = {
      _id: '0',
      name: 'now',
      from: null,
      to: null,
      description: '지금 진행중인 Season'
    };

    if(seasons.length != 0) {
      var oneDayMiliSeconds = 24 * 60 * 60 * 1000;
      currentSeason.from = new Date(seasons[0].to.getTime() + oneDayMiliSeconds);
    } else {
      currentSeason.from = new Date(2014, 11, 1);
    }
    output.push(currentSeason);
    seasons.forEach(function(season) {
      output.push(season);
    });
    func(output);
  });
};

module.exports.add = function(name, from, to, description, func) {
  var descriptionValue = null;
  if(description) {
    descriptionValue = description;
  }
  var season = new Season({
    name: name,
    from: from,
    to: to,
    description: descriptionValue,
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
  console.log(query);
  Season.remove(query, function(err) {
    console.log(err);
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