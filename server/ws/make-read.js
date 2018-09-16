const OnlineUsers = require('./online-users');
const Message = require('../models/message');
const mongoose = require('mongoose');

module.exports = (socket, data, io) => {
  const sender = OnlineUsers.uidBySockId(socket.id);
  const receiver = OnlineUsers.sockIdByUid(data.to);

  Message.updateMany({
    chatId: data.chatId,
    seenAt: {$exists: false},
    receiver: mongoose.Types.ObjectId(data.myId)
  }, {
    seenAt: new Date()
  }, {
    multi: true
  }, (err, res) => {
     if (err) return console.error(err);
     Message.findOne({
       chatId: data.chatId,
       receiver: mongoose.Types.ObjectId(data.myId)
     }).select('owner').lean().then(obj => {
       if (obj) {
         const sock = OnlineUsers.sockIdByUid(obj.owner.toString());
         io.to(sock).emit('read-chat', {chatId: data.chatId});
       }
     }).catch(console.error);
  });
};
