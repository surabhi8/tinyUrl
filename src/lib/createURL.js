const models = require('../../models');
const generateHash = require('../helpers/generateHash');

const increment = 6;
const createNewRecord = (longurl, hash, index) => {
  const shorturl = hash.substring(index, index + increment);
  return models.urls.createObject(shorturl, longurl).spread((urlResult, created) => {
    if (created === false && urlResult.longurl !== longurl) {
      console.log('CONFLICT OCCURED');
      return createNewRecord(longurl, hash, index + 1);
    }
    return { shorturl, longurl };
  });
};

const createUrlandInsert = (longurl) => {
  const hash = generateHash(longurl);
  const index = 0;
  const newRecordPromise = createNewRecord(longurl, hash, index);
  return newRecordPromise.then(result => result);
};

module.exports = createUrlandInsert;
