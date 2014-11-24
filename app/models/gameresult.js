var mongoose = require('mongoose'), Schema = mongoose.Schema;

var GameResultSchema = new Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
  number: String
});

mongoose.model('GameResult', GameResultSchema, 'gameresult');