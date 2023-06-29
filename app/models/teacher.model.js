module.exports = (sequelize, Sequelize) => {
  const Teacher = sequelize.define('teacher', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Teacher;
};
