module.exports = (sequelize, Sequelize) => {
  // Модель для урока
  const Lesson = sequelize.define('lesson', {
    lessonNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dayOfWeek: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  const Subject = require('./subject.model')(sequelize, Sequelize);
  const Teacher = require('./teacher.model')(sequelize, Sequelize);
  const Class = require('./class.model')(sequelize, Sequelize);
  const Classroom = require('./classroom.model')(sequelize, Sequelize);

  // Связи между моделями
  Lesson.belongsTo(Subject);
  Lesson.belongsTo(Teacher);
  Lesson.belongsTo(Class);
  Lesson.belongsTo(Classroom);

  return Lesson;
};
