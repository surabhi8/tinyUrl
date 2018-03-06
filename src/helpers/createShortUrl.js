const generateHash = require('./generateHash');

const createShortUrl = (longurl, start, end) => {
  const hash = generateHash(longurl);
  const shorturl = hash.substring(start, end);
  return shorturl;
};
module.exports = { createShortUrl };
