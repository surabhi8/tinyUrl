const Models = require('../../models');
const redisClient = require('../../src/redis/redis');
const Server = require('../../src/solution/server');

beforeAll((done) => {
  redisClient.flushdb();
  Models.urls.create({
    longurl: 'http://google.com/qwqe',
    shorturl: 'grfgfe',
  }).then(() => {
    done();
  });
});

afterAll((done) => {
  redisClient.flushdb();
  Models.urls.truncate().then(() => {
    done();
  });
});

describe('Testing the redis cache functionality', () => {
  test('If the url to read not present in redis it should insert in cache', (done) => {
    const options = {
      method: 'GET',
      url: '/read?shorturl=grfgfe',
    };
    Server.inject(options, (response) => {
      redisClient.hget('urls', 'grfgfe', (geterr, reply) => {
        if (reply) {
          expect(reply).toEqual('http://google.com/qwqe');
          done();
        }
      });
    });
  });
});
describe('Testing the redis cache functionality', () => {
  test('If the url already present in cache it should return it', (done) => {
    const options = {
      method: 'GET',
      url: '/read?shorturl=grfgfe',
    };
    Server.inject(options, (response) => {
      redisClient.hget('urls', 'grfgfe', (geterr, reply) => {
        if (reply) {
          expect(reply).toEqual('http://google.com/qwqe');
          done();
        }
      });
    });
  });
});
