const User = require('../../models/user');
const mongoose = require('mongoose');
const {generateToken} = require('../../jwt/generate');


const signup = (req, res, next) => {
  new User(req.body).save((err, doc) => {
    if (err) return next(err);
    // TODO catch all possible errors

    const uid = doc._id;
    const token = generateToken(uid);

    res.send({...token});
  });

};

module.exports = signup;
