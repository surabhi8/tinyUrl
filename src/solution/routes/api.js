
const Models = require('../../../models');

module.exports = [
  {
    path: '/tinyurl',
    method: 'GET',
    handler(request, reply) {
      const longurl = request.payload;
      Models.urls.findAll(where{longurl});
    },
  },
];
