const {botMessage} = require('../helper');

module.exports = async (socket, obj) => {
  const bid = obj.data.contact._id;
  const uid = obj.sender;
  const origMessage = obj.data.msg;

  try {
    const my = await botMessage({message: origMessage, owner: uid, receiver: bid});
    socket.emit('chat_msg', my);
  } catch (e) {
    console.error(e);
  }
};

