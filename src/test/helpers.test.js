
const createShortUrl = require('../helpers/createShortUrl');

describe('Testing the helper function', () => {
  test('createShortUrl should return a shorturl of length 6', (done) => {
    const longurl = 'http:google.com/3456';
    const shorturl = createShortUrl(longurl, 0, 6);
    expect(shorturl.length).toBe(6);
    done();
  });
  test('createShortUrl should return same shorturl for two same longurls', (done) => {
    const longurl1 = 'http:google.com/3456';
    const longurl2 = 'http:google.com/3456';
    const shorturl1 = createShortUrl(longurl1, 0, 6);
    const shorturl2 = createShortUrl(longurl2, 0, 6);
    expect(shorturl1).toBe(shorturl2);
    done();
  });
});

