const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
const routes = require('./routes/index.js');

server.connection({
  host: 'localhost',
  port: 9010,
});
server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
}, (err) => {
  if (err) {
    throw err;
  }
});
server.route(routes.api);

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server started');
  });
}
module.exports = server;

