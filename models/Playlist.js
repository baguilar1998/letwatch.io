const mongoose = require('mongoose');

var PlaylistSchema = new mongoose.Schema({
  roomId:{
    type: mongoose.Schema.type.ObjectId,
    ref: 'Room',
    required: true
  },
});

module.exports = mongoose.model("Playlist",PLaylistSchema);
