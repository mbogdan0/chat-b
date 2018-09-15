const echobot = require('./echobot');
const reversebot = require('./reversebot');
const ignorebot = require('./ignorebot');


module.exports = (socket, data) => {

  switch (data.receiver) {
    case 'echobot@example.com':
      echobot(socket, data);
      break;
    case 'reverse@example.com':
      reversebot(socket, data);
      break;
    case 'spambot@example.com':

      break;
    case 'ignorebot@example.com':
      ignorebot(socket, data);
      break;
  }


};
