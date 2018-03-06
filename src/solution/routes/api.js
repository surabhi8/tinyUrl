const createUrlandInsert = require('../../lib/createUrlandInsert');
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

module.exports = [
  {
    path: '/write',
    method: 'GET',
    handler: (request, response) => {
      const { longurl } = request.query;
      createUrlandInsert(longurl).then((result) => {
        response({ message: result });
      });
    },
  },
];
