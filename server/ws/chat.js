const OnlineUsers = require('./online-users');
const botAct = require('../bots/act/index');
const Message = require('../models/message');
const User = require('../models/user');

module.exports = (socket, data, io) => {

  const sender = OnlineUsers.uidBySockId(socket.id);
  const receiver = OnlineUsers.sockIdByUid(data.contact._id);

  if (data.contact.isBot) {
    botAct(io, {sender, receiver, contact: data.contact});
  } else {

    new Message({
      message: data.msg,
      owner: sender,
      receiver: data.contact._id
    }).save((err, doc) => {
      if (err) return console.error(err); // TODO: pass error to frontend
      User.populate(doc, {
        path: "owner receiver",
        select: "username"
      }, (err, data) => {
        if (err) return console.error(err); // TODO: pass error to frontend

        io.to(receiver).emit('receive_chat', data);
        socket.emit('receive_chat', data);
      });
    });
  }
};
