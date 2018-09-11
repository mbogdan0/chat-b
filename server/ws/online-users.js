const {decode} = require('../jwt/decode');

class onlineUsers {
  constructor() {
    this.data = new Map();
  }

  addData(socketID, userID) {
    const uid = userID.toString();
    this.data.set(socketID, uid);
  }

  delOnline(socketID) {
    this.data.delete(socketID);
  }

  async addOnline(socketID, query) {
    if (query && query.token) { // if token is set - we can get user's ID
      try {
        const uid = await decode(query.token);
        this.addData(socketID, uid);
      } catch (e) {
        console.error(e);
      }
    }
  }

  uidBySockId(sockId) {
    return this.data.get(sockId);
  }

  onlineIds() {
    // convert DATA map to array and remove empty values (guests)
    return Array.from(this.data.values()).filter(val => val);
  }
}




const OnlineUsers = new onlineUsers(); // singleton

setInterval(() => {
  console.log(OnlineUsers.data.size)
}, 500);

module.exports = OnlineUsers;
