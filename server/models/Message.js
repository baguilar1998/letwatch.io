const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  message:{
    type: String,
    default:String,
    required:true
  }
});

module.exports = mongoose.Model("Message",MessageSchema);
