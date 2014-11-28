module.exports = new SeasonService();

function SeasonService() {
  var mongoose = require('mongoose');
  var Season = mongoose.model('Season');
  var ObjectId = mongoose.Types.ObjectId;
  var self = this;

  self.findOne = function(id, func) {
    var q = Season.findById(ObjectId(id)).exec();
    q.then(function(season) {
      func(season);
    });
  };

  self.list = function(func) {
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
        currentSeason.from = new Date(Date.UTC(2014, 10, 1));
      }
      output.push(currentSeason);
      seasons.forEach(function(season) {
        output.push(season);
      });
      func(output);
    });
  };

  self.add = function(name, from, to, description, func) {
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

  self.remove = function(id, func) {
    var query = { _id: ObjectId(id) };
    Season.remove(query, function(err) {
      func('remove complted');
    });
  };

  self.update = function(id, name, from, to, description, func) {
    var query = { _id: ObjectId(id) };
    var season = {
      name: name,
      from: from,
      to: to,
      description: description,
      deleted: false
    };
    var q = Season.update(query, season).exec();
    q.then(function(count) {
      func('update completed');
    });
  };
};
