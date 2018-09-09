const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config');


const generateToken = user_id => {
  const expires = 1000 * 60 * 60 * 24 * 3;

  const jwtBearerToken = jwt.sign({user_id}, JWT_SECRET, {
    expiresIn: expires
  });

  return {token: jwtBearerToken, expires};
};

module.exports = {generateToken};
