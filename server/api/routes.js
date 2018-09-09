const cors = require('../config/cors');

module.exports = function(app) {
  app.use(cors);


  app.use('/api/user', require('./user'));


  app.use(require('./errors'));
};

