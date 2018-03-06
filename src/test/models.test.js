const Models = require('../../models');

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

describe('Testing the models function createobject', () => {
  test('CreateObject function should create one entry if the longurl not present in database', (done) => {
    const longurl = 'http:google.com/3456';
    const shorturl = 'abcder';
    Models.urls.createObject(shorturl, longurl).spread((urlResult, created) => {
      expect(created).toBe(true);
      done();
    });
  });
  test('CreateObject function should not create and entry for already existing entry', (done) => {
    const longurl = 'http:google.com/3456';
    const shorturl = 'abcder';
    Models.urls.createObject(shorturl, longurl).spread((urlResult, created) => {
      expect(created).toBe(false);
      done();
    });
  });
});

