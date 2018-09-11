const OnlineUsers = require('./online-users');
const ContactsBox = require('./contact-box');
const typing = require('./typing');
const chat = require('./chat');

module.exports = io => {
  io.on('connection', socket => {

    OnlineUsers.addOnline(socket.id, socket.handshake.query)
      .then(() => ContactsBox.emitList(io))
      .catch(console.error);

    socket.on('disconnect', () => {
      OnlineUsers.delOnline(socket.id);
      ContactsBox.emitList(io).catch(console.error);
    });

    socket.on('typing', data => typing(socket, data, io));
    socket.on('chat', data => chat(socket, data, io));
  });
};



//socket.broadcast.emit('online-contacts', 'hello friends!') - dis
//socket.emit('online-contacts', 'hello friends!')
