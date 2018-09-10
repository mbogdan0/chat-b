const OnlineUsers = require('./online');
const User = require('../models/user');

const contactsBox = (socket, type) => {

  const ids = OnlineUsers.onlineIds();

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
    //console.log(results);


    results.forEach(item => {
      item.picture = 'https://vignette.wikia.nocookie.net/cityville/images/5/58/Viral_basketballcomplex_basketball_200x200.png/revision/latest?cb=20130613014636';


      item.online = ids.indexOf(item._id.toString()) > -1;

    });



    socket.emit('online-contacts', results);

  }).catch(console.error);




};


module.exports = {contactsBox};
