const Models = require('../../models');
const Server = require('../../src/solution/server');

beforeAll((done) => {
  Models.urls.truncate().then(() => {
    done();
  });
});

afterAll((done) => {
  Models.urls.truncate().then(() => {
    done();
  });
});

describe('Testing the write api', () => {
  test('Url should get inserted in db', (done) => {
    const options = {
      method: 'GET',
      url: '/write?longurl="http:/google.com/1234"',
    };
    Models.urls.findAll({ where: { longurl: 'http:/google.com/1234' } }).then((result) => {
      Server.inject(options, (response) => {
        expect(response.result.shorturl).toEqual(result.shorturl);
        done();
      });
    });
  });
});
