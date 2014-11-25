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

// GameSchema.aggregate({
//   {
//     $group: {
//       _id: '$winner',
//       cost: { $sum: 1 }
//     }
//   },
//   function(err, res) {
//     if(err) {
//       console.log(err);
//     }
//     console.log(res);
//   }
// });

mongoose.model('Game', GameSchema, 'game');