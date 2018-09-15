const OnlineUsers = require('./online-users');
const User = require('../models/user');
const mongoose = require('mongoose');

class contactBox {
  constructor() {
    this.data = new Map();
    this.cacheAllUsers();
  }

  cacheAllUsers() {
    User.aggregate([
      {
        $project: {
          _id: 1,
          isBot: 1,
          username: 1,
          picture: 1,
          botDescription: 1
        }
      }
    ]).then(results => {
      results.forEach(user => {
        this.data.set(user._id.toString(), user);
      });
    }).catch(console.error);
  }

  addUserToCache(uid) {
    return new Promise((resolve, reject) => {
      User.aggregate([
        {
          $project: {
            _id: 1,
            isBot: 1,
            username: 1,
            picture: 1,
            botDescription: 1
          }
        },
        {
          $match: {
            _id: mongoose.Types.ObjectId(uid.toString())
          }
        }
      ]).then(results => {
        results.forEach(user => {
          this.data.set(user._id.toString(), user);
        });
        resolve(true);
      }).catch(reject);
    });
  }



  async onlineActualList() {
    const listUserIds = OnlineUsers.onlineIds();
    // if new user just has signed up - add to cache
    for (let i = 0; i < listUserIds.length; i++) {
      if (!this.data.has(listUserIds[i].toString())) {
        await this.addUserToCache(listUserIds[i].toString());
      }
    }
    const output = [];
    this.data.forEach((user) => {
      let _uid = user._id.toString();
      output.push({
        ...user,
        online: listUserIds.indexOf(_uid) > -1
      });
    });
    return output;
  }

  async emitList(io) {
    const list = await this.onlineActualList();
    io.emit('online-contacts', list);
  }

}

const ContactBox = new contactBox();
module.exports = ContactBox;
