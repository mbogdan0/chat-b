const Message = require('../models/message');
const User = require('../models/user');
const OnlineUsers = require('./online-users');

module.exports = (socket, data, io) => {
  if (!data.chatId) return false;
  const sender = OnlineUsers.uidBySockId(socket.id);
  if (!sender) {
    return false;
  }

  const _limit = +(data.limit || 10);
  const _skip = +(data.offset || 0);

  Message.aggregate([
    {
      $project: {
        message: 1,
        owner: 1,
        receiver: 1,
        time: 1,
        seenAt: 1,
        chatId: 1
      }
    },
    {
      $match: {
        chatId: data.chatId
      }
    },
    {
      $sort: {
        time: -1
      }
    },
    {
      $limit: _skip + _limit
    },
    {
      $skip: _skip
    }
  ]).exec((err, result) => {
    if (err) return console.error(err);
    User.populate(result, {
      path: "owner receiver",
      select: "username"
    }, (err, data) => {
      if (err) return console.error(err); // TODO: pass error to frontend
      data = data.reverse();
      io.emit('receive_chat', data);
    });
  });
};
