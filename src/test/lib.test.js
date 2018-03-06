const Models = require('../../models');
const createUrlandInsert = require('../lib/createUrlandInsert');
const sinon = require('sinon');
const libfunction = require('../helpers/createShortUrl');

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
    const longurl = 'http:google.com/345611';
    createUrlandInsert(longurl).then((response) => {
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
  test('Lib function should insert after resolving conflicts', (done) => {
    const longurl1 = 'http:google.com/3456';
    const longurl2 = 'http:google.com/898786';
    const stub = sinon.stub(libfunction, 'createShortUrl');
    stub.withArgs(longurl1, 0, 6).returns('876855');
    stub.withArgs(longurl2, 0, 6).returns('876855');
    stub.withArgs(longurl2, 1, 7).returns('987654');
    createUrlandInsert(longurl1).then((response) => {
      expect(response.shorturl).toEqual('876855');
      createUrlandInsert(longurl2).then((result2) => {
        expect(result2.shorturl).toEqual('987654');
        Models.urls.findAll({ where: { shorturl: result2.shorturl } }).then((searchResult) => {
          expect(searchResult.length).toBe(1);
          stub.restore();
          done();
        });
      });
    });
  });
});

