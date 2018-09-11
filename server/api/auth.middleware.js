const composable = require('composable-middleware');
const expressJwt = require('express-jwt');
const {JWT_SECRET} = require('../config/config');
const jwt = require('jsonwebtoken');

const checkIfAuthenticated = expressJwt({
  secret: JWT_SECRET
});

const authUser = (req, res, next) => {
  const tokenBearer = ((req.headers.authorization || '').split('Bearer ') || [])[1];
  if (!tokenBearer) return next('Not logged in');
  jwt.verify(tokenBearer, JWT_SECRET, (err, decoded) => {
    if (err) return next(err);
    const userId = decoded.user_id;
    if (!userId) return next('Not logged in');
    req.user_id = userId; // remember user id
    next();
  });
};

const authMiddlware = composable(checkIfAuthenticated, authUser);

module.exports = authMiddlware;
