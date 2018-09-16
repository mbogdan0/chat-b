const {botMessage} = require('../helper');

module.exports = async (socket, obj) => {
  const bid = obj.data.contact._id;
  const uid = obj.sender;
  const origMessage = obj.data.msg;

  try {
    const my = await botMessage({message: origMessage, owner: uid, receiver: bid});
    const botMsg = origMessage.split('').reverse().join('');
    const bot = await botMessage({message: botMsg, owner: bid, receiver: uid});

    socket.emit('chat_msg', my);
    setTimeout(() => {
      socket.emit('chat_msg', bot);
    }, 3000);
  } catch (e) {
    console.error(e);
  }
};
