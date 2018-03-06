const server = require('../../src/solution/server');
const Model = require('../../models');

describe('Testing the Hapi server that processes the get request of short url given long url', () => {
  test('Should return short url correspoing to long url', (done) => {
    const longurl = { longurl: 'http//google.com/10000' };
    const options = {
      method: 'POST',
      url: '/writeurl',
      payload: { longurl: 'http//google.com/10000' },
    };
    server.inject(options, (response) => {
      Model.urls.findOne({ where: { longurl } }).then((url=>{
        expect(response.result.status_code).toBe(200);
        done();
    });
  });
});
