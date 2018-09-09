const cors = require('../config/cors');

module.exports = function(app) {
  app.use(cors);


  //app.use('/api/countries', require('./countries'));


  app.use(require('./errors'));
};

