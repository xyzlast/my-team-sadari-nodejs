var mongoose = require('mongoose'), Schema = mongoose.Schema;

var GameSchema = new Schema({
  date: Date,
  number: String,
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  cost: Number,
  description: String,
  deleted: Boolean
});

mongoose.model('Game', GameSchema, 'game');
