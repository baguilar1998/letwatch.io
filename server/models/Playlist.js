const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PlaylistSchema = new mongoose.Schema({
  roomId:{
    type: mongoose.Schema.type.ObjectId,
    ref: 'Room',
    required: true
  },
  videos: [{
    type: Schema.Types.ObjectId,
    ref: 'Video'
  }]
});

module.exports = mongoose.model("Playlist",PLaylistSchema);
