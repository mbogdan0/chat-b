
const {Schema} = require('mongoose');
const mongoose = require('mongoose');


const MessageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  time: {
    type: Date,
    required: true,
    index: true
  }
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
