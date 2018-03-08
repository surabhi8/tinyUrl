
const libfunction = require('../src/helpers/createShortUrl');

const increment = 6;
module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define('urls', {
    longurl: DataTypes.STRING,
    shorturl: {
      type: DataTypes.STRING(6),
      unique: true,
    },
  }, {});
  urls.createObject = (shorturl, longurl) =>
    urls.findOrCreate({ where: { shorturl }, defaults: { longurl } });
  urls.getUrlArray = () => {
    const urlArray = {};
    for (let i = 0; i < 1000000; i += 1) {
      const longurl = `http://google.com/${i}`;
      let shorturl = '';
      let head = 0;
      while (true) {
        shorturl = libfunction.createShortUrl(longurl, head, head + increment);
        if (urlArray[shorturl] === undefined) {
          urlArray[shorturl] = { longurl, shorturl };
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
    return Object.values(urlArray);
  };
  return urls;
};
