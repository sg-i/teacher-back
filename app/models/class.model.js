module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define('class', {
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Class;
};
