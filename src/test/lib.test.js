const Models = require('../../models');
const createURL = require('../lib/createURL');

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

describe('Testing the lib function', () => {
  test('Lib function should insert one entry into db ', (done) => {
    const longurl = 'http:google.com/3456';
    createURL(longurl).then((response) => {
      Models.urls.findAll({
        where: {
          shorturl: response.shorturl,
        },
      }).then((searchResult) => {
        expect(searchResult.length).toBe(1);
        done();
      });
    });
  });
});

