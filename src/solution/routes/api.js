const createUrlandInsert = require('../../lib/createUrlandInsert');
const Model = require('../../../models');
const redisClient = require('../../../src/redis/redis');

module.exports = [
  {
    path: '/write',
    method: 'POST',
    handler: (request, response) => {
      const { longurl } = request.payload;
      createUrlandInsert(longurl).then((result) => {
        response({ message: result });
      });
    },
  },
  {
    path: '/read',
    method: 'GET',
    handler(request, reply) {
      const { shorturl } = request.query;
      redisClient.hget('urls', shorturl, (geterr, response) => {
        if (response) {
          reply({ shorturl, longurl: response });
        } else {
          Model.urls.findOne({
            where: { shorturl },
          }).then((url) => {
            console.log('Hello', url);
            if (url) {
              console.log('hello');
              redisClient.hset('urls', shorturl, url.longurl, (err, resp) => {
                if (resp) {
                  console.log('inserted in redis');
                } else {
                  console.log(err);
                }
              });
              reply({ shorturl: url.shorturl, longurl: url.longurl });
            } else {
              reply({ error: `The is no longurl mapped to ${shorturl} shorturl` });
            }
          });
        }
      });
    },
  },
  {
    path: '/ping',
    method: 'GET',
    handler(request, reply) {
      reply('pong');
    },
  },
];
