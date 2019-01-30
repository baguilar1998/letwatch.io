const mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
  title: {
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
  },
  imageUrl: {
    type:String,
    default:String,
    required:true
  },
  videoId: {
    type:String,
    default: String,
    required:true
  }
});

module.exports = mongoose.model("Video",VideoSchema);
