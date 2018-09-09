const User = require('../../models/user');
const mongoose = require('mongoose');
const {generateToken} = require('../../jwt/generate');


const signin = (req, res, next) => {
  const body = req.body;
  User.findOne({username: body.username}).then(doc => {
    if (doc) {
      doc.comparePassword(body.password, (err, isMatch) => {
        if (err) return next(err);
        if (!isMatch) {
          next({message: 'Wrong Username or Password'});
        } else {
          const uid = doc._id;
          const token = generateToken(uid);
          res.send({...token});
        }
      });
    } else {
      next({message: 'Wrong Username or Password'});
    }
  }).catch(next);
};


module.exports = signin;
