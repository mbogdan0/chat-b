const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const {fillBots} = require('./bots/seed');

require('./ws/index')(io);
require('./config/express')(app);
require('./api/routes')(app);


const config = {
  useNewUrlParser: true
};

http.listen(3004,  () => {
  console.log('App listening on port 3004!');
  mongoose.connect('mongodb://localhost:27017/chat-b', config).then(() => {
    console.log('MongoDB is running on port 27017');
    fillBots();
  }).catch(err => {
    console.error(err);
  });
});
