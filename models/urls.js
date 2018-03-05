

module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define('urls', {
    longurl: DataTypes.STRING,
    shorturl: {
      type: DataTypes.STRING,
    },
  }, {});
  return urls;
};
