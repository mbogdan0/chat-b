const User = require('../../models/user');
const mongoose = require('mongoose');


const profile = (req, res, next) => {
  const objID = mongoose.Types.ObjectId(req.user_id);

  User.findById(objID)
    .select('_id username email')
    .lean().then(profile => {
    res.send(profile);
  }).catch(next);
};


module.exports = profile;
