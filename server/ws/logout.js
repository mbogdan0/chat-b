const OnlineUsers = require('./online-users');
const ContactsBox = require('./contact-box');

module.exports = (socket, data, io) => {
    const sender = OnlineUsers.uidBySockId(socket.id);
    OnlineUsers.logoutByUid(sender);
    ContactsBox.emitList(io).catch(console.error);
};
