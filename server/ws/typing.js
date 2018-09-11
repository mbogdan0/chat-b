const OnlineUsers = require('./online-users');

module.exports = (socket, data, io) => {

  const sender = OnlineUsers.uidBySockId(socket.id);
  const reciever = OnlineUsers.sockIdByUid(data.to);



  io.to(reciever).emit('receive_typing', {user: sender});
};
