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

describe('Validating database', () => {
  test('Datbase entry for shorturl more than 6 characters ', (done) => {
    const longurl = 'http:google.com/2';
    const shorturl = 'abcderu';
    const createObjectpromise = Models.urls.createObject(shorturl, longurl);
    createObjectpromise.catch(err => expect(err.message).toEqual('value too long for type character varying(6)'));
    done();
  });
});
