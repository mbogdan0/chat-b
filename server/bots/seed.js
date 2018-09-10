const User = require('../models/user');
const OnlineUsers = require('../ws/online');
const BOTS = require('./BOTS');


const fillBots = async () => {
  for (let i = 0; i < BOTS.length; i++) {
    try {
      await new User(BOTS[i]).save();
    } catch (e) { // on duplicate error
      // TODO: handle error in better way
    }
  }
  makeBotsOnline();
};

const makeBotsOnline = () => {
  User.find({isBot: true}).lean().then(bots => {
    bots.forEach(bot => {
      OnlineUsers.addData(bot.email, bot._id);
    });
  }).catch(console.error);
};

module.exports = {fillBots};
