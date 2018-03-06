const md5Base64 = require('md5-base64');

const generateHash = (longurl) => {
  const hash = md5Base64(longurl).replace(/\//g, '_');
  return hash;
};
module.exports = generateHash;
