const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ChatSchema = new mongoose.Schema({
  roomdId:{
    type:Schema.Types.ObjectId,
    ref:'Room',
    required:true
  },
  messages:{
    type:Array,
    default:[]
  }
});

module.exports = mongoose.Model("Chat",ChatSchema);
