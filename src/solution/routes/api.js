const createUrlandInsert = require('../../lib/createUrlandInsert');
const Model = require('../../../models');
const redis = require('redis');

const redisClient = redis.createClient({ host: 'localhost', port: 6379 });

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
            redisClient.hset('urls', shorturl, url.longurl, (err, resp) => {
              if (resp) {
                console.log('inserted in redis');
              } else {
                console.log(err);
              }
            });
            reply({ shorturl: url.shorturl, longurl: url.longurl });
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
