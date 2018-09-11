const md5 = require('md5');

const chatId = (owner, reciever) => {
  let out = [];
  out.push(owner.toString());
  out.push(reciever.toString());

  out = out.sort().join('');
  return md5(out);
};

module.exports = chatId;
