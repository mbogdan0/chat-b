const Message = require('../models/message');
const User = require('../models/user');

const botMessage = (obj) => {
  return new Promise((resolve, reject) => {
    new Message({message: obj.message, owner: obj.owner, receiver: obj.receiver}).save((err, doc) => {
      if (err) return reject(err);
      User.populate(doc, {
        path: "owner receiver",
        select: "username"
      }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  });
};


module.exports = {botMessage};
