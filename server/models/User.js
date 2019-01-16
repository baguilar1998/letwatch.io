const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  nickName: {
    type:String,
    default:String,
    required: true
  },
  avatarColor: {
    type:String,
    default:String,
    required:true
  },
  createdAt: {
    type: Date,
    expires: '8h',
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema, 'users');
