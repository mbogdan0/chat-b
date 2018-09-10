const {decode} = require('../jwt/decode');

class onlineUsers {
  constructor() {
    this.DATA = new Map();
    console.log('new online users');
  }

  addData(socketID, userID) {
    this.DATA.set(socketID, userID.toString());
    return Promise.resolve();
  }

  delOnline(socketID) {
    this.DATA.delete(socketID);
    return Promise.resolve();
  }

  addOnline(socketID, query) {
    if (query && query.token) { // if token is set - we can get user's ID
      return this.__decodeToken(socketID, query);
    } else {
      return Promise.resolve(true);
      //return this.addData(socketID, null); // as guest
    }
  }

  __decodeToken(socketID, query) {
    return new Promise(resolve => {
      decode(query.token).then(uid => {
        this.addData(socketID, uid);
        resolve(true);
      }).catch(err => { // invalid token or smth
        // console.error(err);
        //this.addData(socketID, null); // as guest
        resolve(true);
      });
    });
  }

  onlineIds() {
    // convert DATA map to array and remove empty values (guests)
    return Array.from(this.DATA.values()).filter(val => val);
  }
}

const OnlineUsers = new onlineUsers(); // singleton

module.exports = OnlineUsers;
