const OnlineUsers = require('./online');
const {contactsBox} = require('./contact-box');


module.exports = io => {
  io.on('connection', socket => {
    OnlineUsers.addOnline(socket.id, socket.handshake.query).then(() => contactsBox(socket, 'connect'));



    socket.on('disconnect', () => OnlineUsers.delOnline(socket.id).then(() => contactsBox(socket, 'disconnect')));
  });
};



//socket.broadcast.emit('online-contacts', 'hello friends!') - dis
//socket.emit('online-contacts', 'hello friends!')
