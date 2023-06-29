module.exports = (sequelize, Sequelize) => {
  const Subject = sequelize.define('subject', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Subject;
};
