const OnlineUsers = require('./online-users');
const ContactsBox = require('./contact-box');
const typing = require('./typing');
const chat = require('./chat');
const logout = require('./logout');
const chatHistory = require('./chat-history');
const makeRead = require('./make-read');

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
    socket.on('make-read', data => makeRead(socket, data, io));
    socket.on('chat', data => chat(socket, data, io));
    socket.on('logout', data => logout(socket, data, io));
    socket.on('chat-history', data => chatHistory(socket, data, io));
  });
  require('../bots/act/spambot')(io);
};
