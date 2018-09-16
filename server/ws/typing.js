const OnlineUsers = require('./online-users');

module.exports = (socket, data, io) => {
  const sender = OnlineUsers.uidBySockId(socket.id);
  const receiver = OnlineUsers.sockIdByUid(data.to);

  if (sender) {
    io.to(receiver).emit('receive_typing', {user: sender});
  }
};
