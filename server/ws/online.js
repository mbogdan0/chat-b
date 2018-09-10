
const {decode} = require('../jwt/decode');
const ONLINE_USERS = new Map();

const addOnline = (socketID, query) => {
  if (query && query.token) { // if token is set - we can decode user's ID
    decode(query.token).then(uid => {
      ONLINE_USERS.set(socketID, uid);
    }).catch(err => { // invalid token or smth
      console.error(err);
      ONLINE_USERS.set(socketID, null);
    });
  } else { // anonymous user
    ONLINE_USERS.set(socketID, null);
  }
};

const delOnline = (socketID) => {
  ONLINE_USERS.delete(socketID);
};



module.exports = {addOnline, delOnline};
