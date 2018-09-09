const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('./config/express')(app);
require('./api/routes')(app);


const config = {
  autoIndex: true,
  useCreateIndex: true,
  useNewUrlParser: true
};


app.listen(3004,  () => {
  console.log('App listening on port 3004!');
  mongoose.connect('mongodb://localhost:27017/chat-b', config).then(() => {
    console.log('MongoDB is running on port 27017');
  }).catch(err => {
    console.error(err);
  });
});


