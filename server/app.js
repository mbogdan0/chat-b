const {generateToken} = require("./api/jwt");

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
  console.log('Example app listening on port 3004!');
  mongoose.connect('mongodb://localhost:27017/tt-mean', config).then(() => {
    console.log('MongoDB is OK');

    require('./helper')(); // fill DB
  }).catch(err => {
    console.error(err);
  });
});


