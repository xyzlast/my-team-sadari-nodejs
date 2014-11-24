var mongoose = require('mongoose'), Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  name: String,
  defaultAmount: Number,
  description: String,
  deleted: Boolean
});
mongoose.model('Player', PlayerSchema, 'player');