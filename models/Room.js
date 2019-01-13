const mongoose = require('mongoose');

var RoomSchema = new mongoose.model({
  name: {
    type: String,
    default: String,
    required: true
  },
  host: {
    type: String,
    default: String,
    required: true
  },
  // Most likely the invitation code
  password: {
    type: String,
    default: String,
    required: true
  },
  max_capacity: {
    type: Number,
    default: Number,
    required: true,
    min:2,
    max:8
  }
});

module.exports = mongoose.model("Room", RoomSchema);
