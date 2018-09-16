const OnlineUsers = require('./online-users');
const Message = require('../models/message');
const mongoose = require('mongoose');

module.exports = (socket, data, io) => {
  const sender = OnlineUsers.uidBySockId(socket.id);
  const receiver = OnlineUsers.sockIdByUid(data.to);

  Message.update({
    chatId: data.chatId,
    seenAt: {$exists: false},
    receiver: mongoose.Types.ObjectId(data.myId)
  }, {
    seenAt: new Date()
  }, {
    multi: true
  }, (err, res) => {
    if (err) return console.error(err);


  });
};
