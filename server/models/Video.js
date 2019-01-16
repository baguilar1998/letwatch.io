const mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
  playlistId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist',
    required: true
  },
  name: {
    type:String,
    default:String,
    required:true
  },
  description: {
    type: String,
    default:String,
    required:true
  },
  creator: {
    type: String,
    default: String,
    required: true
  }
});

module.exports = mongoose.model("Video",VideoSchema);
