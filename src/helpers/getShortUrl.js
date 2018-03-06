const md5Base64 = require('md5-base64');

const getShortUrl = (longurl, start, end) => {
  const hash = md5Base64(longurl);
  const shorturl = hash.substring(start, end);
  return shorturl;
};
module.exports = getShortUrl;
