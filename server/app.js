const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


require('./ws/index')(io);
require('./config/express')(app);
require('./api/routes')(app);


const config = {
  autoIndex: true,
  useCreateIndex: true,
  useNewUrlParser: true
};


http.listen(3004,  () => {
  console.log('App listening on port 3004!');
  mongoose.connect('mongodb://localhost:27017/chat-b', config).then(() => {
    console.log('MongoDB is running on port 27017');
  }).catch(err => {
    console.error(err);
  });
});
