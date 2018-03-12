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

// afterAll((done) => {
//   redisClient.flushdb();
//   Models.urls.truncate().then(() => {
//     done();
//   });
// });

describe('Testing the redis cache functionality', () => {
  test('If the url to read not present in redis it should insert in cache', (done) => {
    const options = {
      method: 'GET',
      url: '/read?shorturl=grfgrf',
    };
    Server.inject(options, (response) => {
      redisClient.hget('urls', 'grfgrf', (geterr, reply) => {
        if (reply) {
          expect(reply).toEqual('http://google.com/qwqe');
          done();
        }
      });
    });
  });

  // test('Lib function should insert after resolving conflicts', (done) => {
  //   const longurl1 = 'http:google.com/3456';
  //   const longurl2 = 'http:google.com/898786';
  //   const stub = sinon.stub(libfunction, 'createShortUrl');
  //   stub.withArgs(longurl1, 0, 6).returns('876855');
  //   stub.withArgs(longurl2, 0, 6).returns('876855');
  //   stub.withArgs(longurl2, 1, 7).returns('987654');
  //   createUrlandInsert(longurl1).then((response) => {
  //     expect(response.shorturl).toEqual('876855');
  //     createUrlandInsert(longurl2).then((result2) => {
  //       expect(result2.shorturl).toEqual('987654');
  //       Models.urls.findAll({ where: { shorturl: result2.shorturl } }).then((searchResult) => {
  //         expect(searchResult.length).toBe(1);
  //         stub.restore();
  //         done();
  //       });
  //     });
  //   });
  // });
});

