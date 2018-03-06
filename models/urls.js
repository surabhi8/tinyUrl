

module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define('urls', {
    longurl: DataTypes.STRING,
    shorturl: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true,
    },
  }, {});
  urls.createObject = (shorturl, longurl) =>
    urls.findOrCreate({ where: { shorturl }, defaults: { longurl } });
  return urls;
};
