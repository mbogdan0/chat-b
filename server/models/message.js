
const {Schema} = require('mongoose');
const mongoose = require('mongoose');
const chatId = require('../act/chat-id');

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
    index: true
  },
  seenAt: {
    type: Date
  },
  chatId: {
    type: String,
    index: true
  }
});


MessageSchema.pre('save', function(next) {
  let message = this;

  message.chatId = chatId(message.owner, message.receiver);
  message.time = new Date();
  next();
});


const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
