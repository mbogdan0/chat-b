
const {addOnline, delOnline} = require('../ws/online');

module.exports = io => {

  io.on('connection', (socket) => {
    addOnline(socket.id, socket.handshake.query);

    socket.on('disconnect', () => delOnline(socket.id));
  });
};



