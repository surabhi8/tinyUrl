const md5 = require('md5');

module.exports = {
  up: (queryInterface) => {
    const urls = [];
    for (let i = 0; i < 1000000; i += 1) {
      const longurl = `http//google.com/${i}`;
      const shorturl = `${md5(longurl).substring(0, 6)}`;
      urls.push({
        longurl, shorturl, createdAt: new Date(), updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('urls', urls, {});
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('urls');
  },
};
