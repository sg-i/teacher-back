module.exports = (sequelize, Sequelize) => {
  const Swaps = sequelize.define('swaps', {
    dateForSwap: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    dayOfWeek: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  const Teacher = require('./teacher.model')(sequelize, Sequelize);
  Swaps.belongsTo(Teacher, { as: 'oldTeacher', foreignKey: 'oldPeople' });
  Swaps.belongsTo(Teacher, { as: 'newTeacher', foreignKey: 'newPeople' });
  return Swaps;
};
