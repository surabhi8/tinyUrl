const Models = require('../../models');
const Server = require('../../src/solution/server');

beforeAll((done) => {
  Models.urls.create({
    longurl: 'http://google.com/1',
    shorturl: '56789',
  }).then(() => {
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
      method: 'POST',
      url: '/write',
      payload: { longurl: 'http:/google.com/1234' },
    };

    Server.inject(options, (response) => {
      Models.urls.findOne({ where: { longurl: 'http:/google.com/1234' } }).then((result) => {
        console.log(response.result.message.shorturl);
        console.log(result.shorturl);
        expect(response.result.message.shorturl).toEqual(result.shorturl);
        done();
      });
    });
  });
});

describe('Testing the read api', () => {
  test('Url should get inserted in db', (done) => {
    const options = {
      method: 'GET',
      url: '/read?shorturl="56789"',
    };

    Models.urls.findAll({ where: { shorturl: '56789' } }).then((result) => {
      Server.inject(options, (response) => {
        expect(response.result.longurl).toEqual(result.longurl);
        done();
      });
    });
  });
});
