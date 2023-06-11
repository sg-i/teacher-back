module.exports = (sequelize, Sequelize) => {
  // Модель для предмета
  const Subject = sequelize.define('subject', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  // Модель для преподавателя
  const Teacher = sequelize.define('teacher', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  // Модель для класса
  const Class = sequelize.define('class', {
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  // Модель для кабинета
  const Classroom = sequelize.define('classroom', {
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

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

  // Связи между моделями
  Lesson.belongsTo(Subject);
  Lesson.belongsTo(Teacher);
  Lesson.belongsTo(Class);
  Lesson.belongsTo(Classroom);

  return {
    Subject,
    Teacher,
    Class,
    Classroom,
    Lesson,
  };
};
