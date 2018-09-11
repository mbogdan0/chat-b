const OnlineUsers = require('./online-users');
const ContactsBox = require('./contact-box');


module.exports = io => {
  io.on('connection', socket => {

    OnlineUsers.addOnline(socket.id, socket.handshake.query)
      .then(() => ContactsBox.emitList(socket, 'connect'))
      .catch(console.error);

    socket.on('disconnect', () => {
      OnlineUsers.delOnline(socket.id);
      ContactsBox.emitList(socket, 'disconnect').catch(console.error);
    });

    socket.on('typing', data => require('./typing')(socket, data, io));


  });
};



//socket.broadcast.emit('online-contacts', 'hello friends!') - dis
//socket.emit('online-contacts', 'hello friends!')
