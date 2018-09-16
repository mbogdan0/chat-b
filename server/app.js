const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const {fillBots} = require('./bots/seed');


require('./config/express')(app);
require('./api/routes')(app);


const config = {
  useNewUrlParser: true,
  useCreateIndex: true
};

http.listen(3004,  () => {
  console.log('App listening on port 3004!');
  mongoose.connect('mongodb://localhost:27017/chat-b', config).then(async () => {
    console.log('MongoDB is running on port 27017');
    await fillBots();
    require('./ws/index')(io);
  }).catch(err => {
    console.error(err);
  });
});
