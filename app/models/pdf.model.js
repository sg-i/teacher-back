module.exports = (sequelize, Sequelize) => {
  const pdf = sequelize.define('pdf', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    content: {
      type: Sequelize.BLOB('long'),
      allowNull: false,
    },
  });

  return pdf;
};
