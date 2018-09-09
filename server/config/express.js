const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

module.exports = (app) => {
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({limit: '5mb'}));
};

