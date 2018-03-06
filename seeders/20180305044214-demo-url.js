const getShortUrl = require('../src/helpers/getShortUrl');

const getUrlArray = () => {
  const urls = {};
  for (let i = 0; i < 1000000; i += 1) {
    const longurl = `http://google.com/${i}`;
    let shorturl = '';
    let head = 0;
    while (true) {
      shorturl = getShortUrl(longurl, head, head + 6);
      if (urls[shorturl] === undefined) {
        urls[shorturl] = { longurl, shorturl };
        break;
      } else {
        head = (head + 1) % 26;
        if (head === 25) {
          head = 0;
          break;
        }
      }
    }
  }
  return Object.values(urls);
};
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('urls', getUrlArray(), {}),
  down: (queryInterface) => {
    queryInterface.bulkDelete('urls', null, {});
  },
};
