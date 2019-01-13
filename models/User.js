const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  nickname: {
    type:String,
    default:String,
    required: true
  },
  avatarColor: {
    type:String,
    default:String,
    required:true
  }
});

module.exports = mongoose.model('User', UserSchema);
