const generateHash = require('../src/helpers/generateHash');

const increment = 6;
const getUrlArray = () => {
  const urls = {};
  const map = {};
  for (let i = 0; i < 1000000; i += 1) {
    let j = 0;
    const longurl = `http://google.com/${i}`;
    const hash = generateHash(longurl);
    while (map[hash.substring(j, j + increment)] !== undefined) {
      j += increment;
      if (j + increment > hash.length) {
        break;
      }
    }
    map[hash.substring(j, j + increment)] = true;
    const shorturl = hash.substring(j, j + increment);
    urls[shorturl] = { longurl, shorturl };
  }
  return Object.values(urls);
};
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('urls', getUrlArray(), {}),
  down: (queryInterface) => {
    queryInterface.bulkDelete('urls', null, {});
  },
};
