const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config');

const decode = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded.user_id);
    });
  });
};

module.exports = {decode};
