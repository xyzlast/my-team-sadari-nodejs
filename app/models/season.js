var mongoose = require('mongoose'), Schema = mongoose.Schema;

var SeasonSchema = new Schema({
  from: Date,
  to: Date,
  deleted: Boolean,
  name: String,
  description: String,
  includeDefaultAmount: Boolean
});

mongoose.model('Season', SeasonSchema, 'season');