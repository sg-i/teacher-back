module.exports = (sequelize, Sequelize) => {
  const Classroom = sequelize.define('classroom', {
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Classroom;
};
