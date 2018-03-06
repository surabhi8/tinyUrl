const models = require('../../../models');
const getShortUrl = require('../../helpers/getShortUrl');
//
// const creatNewRecord = (longurl, start, end) => {
//   const shorturl = getShortUrl(longurl, start, end);
//   Model.urls.findOne({ where: { shorturl } }).then((url) => {
//     if (url === null) {
//       return (Model.urls.findOrCreate({
//         longurl,
//         shorturl,
//       }));
//     }
//     creatNewRecord(longurl, start + 1, start + 7);
//   });
// };
// module.exports = [
//   {
//     path: '/writeurl',
//     method: 'POST',
//     handler(request, reply) {
//       const { longurl } = request.payload;
//       Model.urls.findOne({
//         where: { longurl },
//       }).then((url) => {
//         if (url) {
//           reply({ message: 'url already exists', status_code: 200 });
//         } else {
//           creatNewRecord(longurl, 0, 6).then(() => {
//             reply({ message: 'url inserted', status_code: 201 });
//           });
//         }
//       });
//     },
//   },
//   {
//     path: '/readurl',
//     method: 'POST',
//     handler(request, reply) {
//       const { longurl } = request.payload;
//       Model.urls.findAll({
//         where: { longurl },
//       }).then((url) => {
//         console.log(url.dataValues[0].longurl);
//         reply({ message: 'readurl', status_code: 201 });
//       });
//     },
//   },
// ];
const md5 = require('md5');

const createNewRecord = (longurl, hash, index) => {
  const shorturl = hash.substring(index, index + 6);
  return models.urls.findOne({
    where: {
      shorturl,
    },
  })
    .then((result) => {
      if (result === null) {
        return models.urls.create({ longurl, shorturl });
      }
      return createNewRecord(longurl, hash, index + 6);
    });
};

module.exports = [
  {
    path: '/write',
    method: 'GET',
    handler: (request, response) => {
      const { longurl } = request.query;
      const hash = md5(longurl);
      const shorturl = hash.substring(0, 6);
      models.urls.findOrCreate({ where: { shorturl, longurl } }).spread((urlResult, created) => {
        if (created === true) {
          response({ message: urlResult.shorturl, status_code: 201 });
        } else {
          createNewRecord(longurl, hash, 0).then(() => models.urls.findOne({
            where: {
              longurl,
            },
          }))
            .then((secondResult) => {
              response({ shorturl: secondResult.shorturl });
            });
        }
      });
    },
  },
];
