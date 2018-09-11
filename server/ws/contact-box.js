const OnlineUsers = require('./online-users');
const User = require('../models/user');

class contactBox {
  constructor() {
    this.cacheAllUsers();
    this.data = new Map();
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
        this.data.set(user._id, user);
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
            _id: uid
          }
        }
      ]).then(results => {
        results.forEach(user => {
          this.data.set(user._id, user);
        });
        resolve(true);
      }).catch(reject);
    });
  }



  async onlineActualList(uid) {
    const listUserIds = OnlineUsers.onlineIds();

    // if new user just has signed up - add to cache
    for (let i=0; i<listUserIds.length; i++) {
      if (!this.data.has(listUserIds[i])) {
        await this.addUserToCache(listUserIds[i]);
      }
    }
    const output = [];
    this.data.forEach((user) => {
      let _uid = user._id.toString();
      if (1 || _uid !== uid) {
        output.push({
          ...user,
          online: listUserIds.indexOf(_uid) > -1
        });
      }
    });
    return output;
  }

  async emitList(socket, type) {
    const user_id = OnlineUsers.uidBySockId(socket.id);
    const list = await this.onlineActualList(user_id);

   // console.log(user_id, type);

    if (type === 'connect') {
      socket.emit('online-contacts', list);
    } else {
      socket.broadcast.emit('online-contacts', list);
    }



  }

}

const ContactBox = new contactBox();
module.exports = ContactBox;
