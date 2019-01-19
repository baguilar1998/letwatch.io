const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    default: String,
    required: true
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  invitationCode: {
    type: String,
    default: String,
    required: true,
    hasExpired: false,
    unique: true,
    createdAt: {
      type: Date,
      expires: '4h',
      default: Date.now
    }
  },
  password: {
    type: String,
    default: String,
    required: false,
  },
  maxCapacity: {
    type: Number,
    default: Number,
    required: true,
    min:1,
    max:8
  },
  createdAt: {
    type: Date,
    expires: '8h',
    default: Date.now
  }
});

module.exports = mongoose.model('Room', RoomSchema);
