const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PlaylistSchema = new mongoose.Schema({
  roomId:{
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  videos: {
    type:Array,
    default: []
  }
});

module.exports = mongoose.model("Playlist",PlaylistSchema);
