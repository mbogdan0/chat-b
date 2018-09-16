const {botMessage} = require('../helper');
const OnlineUsers = require('../../ws/online-users');
const User = require('../../models/user');

const messages = [
  'Hello', 'Are you there?', 'Be happy', 'How are you?',
  'Do you love me?', 'Are you happy?', 'Hi', 'Have a nice day'
];
const min = 10;
const max = 120;
let botId;

module.exports = (io) => {
  const send = async () => {
    let onlines = OnlineUsers.onlineIds();
        onlines = onlines.filter((v, i, a) => a.indexOf(v) === i);
    for (let i = 0; i < onlines.length; i++) {
      let sockid = OnlineUsers.sockIdByUid(onlines[i]);
      let obj = await botMessage({
        message: randMsg(), owner: botId, receiver: onlines[i]
      });
      io.to(sockid).emit('chat_msg', obj);
    }
    wait();
  };

  const wait = () => {
    let seconds = (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
    setTimeout(send, seconds);
  };

  const randMsg = () => {
    return messages[Math.floor(Math.random() * messages.length )];
  };

  User.findOne({email: 'spambot@example.com'}).select('_id').then(bot => {
    botId = bot._id.toString();
    wait();
  }).catch(console.error);
};


